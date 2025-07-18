import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

const PERSONA_PRESETS = {
  qa: {
    systemPrompt: {
      role: 'user',
      content: `You are a helpful assistant specialized in software Quality Assurance (QA). 
      You answer as an expert QA, using clear, structured, and concise language. 
      You can help with manual testing, automation (Playwright, Selenium, Cypress), security testing, best practices, interview prep, and all things QA-related. Always respond as a QA engineer.`
    },
    temperature: 0.1
  },
  general: {
    systemPrompt: {
      role: 'user',
      content: `You are a helpful and friendly AI assistant. Answer questions clearly and accurately, using accessible language.`
    },
    temperature: 0.9
  }
};

// Gemini Model Config
const MODEL_SETTINGS = {
  model: 'gemini-2.5-flash',
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
};

// Initialize Google GenAI client
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  let { messages, persona } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }
  if (!persona || !PERSONA_PRESETS[persona]) {
    persona = 'general';
  }

  if (
    !messages.length ||
    (messages[0].content !== PERSONA_PRESETS[persona].systemPrompt.content)
  ) {
    messages = [PERSONA_PRESETS[persona].systemPrompt, ...messages];
  }

  const contents = messages.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  try {
    const localParamModel = {
      ...MODEL_SETTINGS,
      contents,
      temperature: PERSONA_PRESETS[persona].temperature
    };
    const response = await genAI.models.generateContent(localParamModel);
    res.json({ reply: response.text });
  } catch (error) {
    console.error('Error during chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
