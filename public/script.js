const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const resetChatBtn = document.getElementById('resetChatBtn');
const personaSelect = document.getElementById('personaSelect');
let loadingElement = null;
let chatHistory = [];

resetChatBtn.addEventListener('click', () => {
  chatHistory = [];
  chatMessages.innerHTML = '';
  chatInput.focus();
});

function markdownToHtml(text) {
  return marked.parse(text);
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  if (sender === 'model') {
    msgDiv.innerHTML = markdownToHtml(text);
  } else {
    msgDiv.textContent = text;
  }
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoading() {
  loadingElement = document.createElement('div');
  loadingElement.className = 'message model';
  loadingElement.innerHTML = `
    <span class="loading">
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
    </span>
  `;
  chatMessages.appendChild(loadingElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoading() {
  if (loadingElement) {
    loadingElement.remove();
    loadingElement = null;
  }
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  addMessage(userInput, 'user');
  chatInput.value = '';
  chatHistory.push({ role: 'user', content: userInput });
  addLoading();

  const backendUrl = 'http://localhost:3001/api/chat';
  try {
    const selectedPersona = personaSelect.value;

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory, persona: selectedPersona })
    });
    removeLoading();
    if (!res.ok) {
      addMessage('Sorry, something went wrong.', 'model');
      return;
    }
    const data = await res.json();
    addMessage(data.reply || data.message || '-', 'model');
    chatHistory.push({ role: 'model', content: data.reply || data.message || '-' });
    // Trimming jika history terlalu panjang (opsional)
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(chatHistory.length - 20);
    }
  } catch (err) {
    removeLoading();
    addMessage('Network error.', 'model');
  }
});
