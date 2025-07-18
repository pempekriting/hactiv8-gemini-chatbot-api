# Hactiv8 Gemini Chatbot API

A modern, full-stack AI chatbot application built with Node.js and Google's Gemini AI. This project features a clean web interface with multiple AI personas and real-time chat functionality.

## 🚀 Features

- **Multiple AI Personas**: Choose between QA Assistant and General AI modes
- **Real-time Chat**: Interactive chat interface with message history
- **Markdown Support**: Rich text formatting in AI responses
- **Responsive Design**: Clean, modern UI that works on all devices
- **Reset Functionality**: Clear chat history with one click
- **Loading Indicators**: Visual feedback during AI processing
- **Error Handling**: Robust error handling for network issues

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Gemini AI** - AI language model
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **Vanilla JavaScript** - Client-side logic
- **HTML5** - Structure and markup
- **CSS3** - Modern styling with animations
- **Marked.js** - Markdown parsing and rendering

## 📁 Project Structure

```
hactiv8-gemini-chatbot-api/
├── backend/
│   └── index.js              # Express server and API routes
├── public/
│   ├── index.html           # Main HTML file
│   ├── script.js            # Frontend JavaScript
│   └── style.css            # Styling and animations
├── package.json             # Dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hactiv8-gemini-chatbot-api.git
   cd hactiv8-gemini-chatbot-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8000
   ```

4. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

## 🚀 Usage

### Development
```bash
# Start the backend server
npm run server

# The server will run on http://localhost:8000
# Open public/index.html in your browser or serve it via a local server
```

### Production
For production deployment, consider using:
- **PM2** for process management
- **Nginx** as a reverse proxy
- **SSL certificates** for HTTPS

## 🎯 API Endpoints

### POST `/api/chat`
Send a message to the AI chatbot.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "persona": "general"
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well, thank you for asking. How can I help you today?"
}
```

**Parameters:**
- `messages` (array, required): Chat history with role and content
- `persona` (string, optional): AI persona (`qa` or `general`)

## 🤖 AI Personas

### QA Assistant
- **Purpose**: Specialized in Quality Assurance and testing
- **Temperature**: 0.1 (more focused and deterministic)
- **Expertise**: Manual testing, automation (Playwright, Selenium, Cypress), security testing

### General AI
- **Purpose**: General-purpose helpful assistant
- **Temperature**: 0.9 (more creative and varied responses)
- **Expertise**: Wide range of topics with friendly, accessible language

## 🎨 Frontend Features

### Chat Interface
- Clean, modern design with smooth animations
- Message bubbles with user/AI distinction
- Markdown rendering for rich text responses
- Scrollable chat history

### Loading States
- Animated loading dots during AI processing
- Responsive feedback for user actions

### Controls
- Persona selector dropdown
- Reset chat button
- Auto-focus on input field

## 🔒 Security Considerations

- API key stored in environment variables
- CORS enabled for cross-origin requests
- Input validation and error handling
- Rate limiting recommended for production

## 📝 Configuration

### Model Settings
```javascript
const MODEL_SETTINGS = {
  model: 'gemini-2.5-flash',
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
};
```

### Persona Configuration
Easily customize AI behavior by modifying the `PERSONA_PRESETS` object in `backend/index.js`.

## 🛠️ Development

### Adding New Personas
1. Add a new preset to `PERSONA_PRESETS` in `backend/index.js`
2. Update the persona selector in `public/index.html`
3. Test the new persona functionality

### Customizing Styling
Modify `public/style.css` to change:
- Color scheme
- Typography
- Layout and spacing
- Animations and transitions

## 📊 Performance

- **Chat History Limit**: Automatically trims to last 20 messages
- **Response Time**: Typically 2-5 seconds depending on query complexity
- **Memory Usage**: Minimal footprint with stateless design

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Verify your Gemini API key is correct
   - Check that the `.env` file is properly configured

2. **Network Errors**
   - Ensure the backend server is running
   - Check CORS configuration for cross-origin requests

3. **Frontend Not Loading**
   - Verify the backend URL in `script.js` matches your server
   - Check browser console for JavaScript errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the powerful language model
- [Marked.js](https://marked.js.org/) for markdown parsing
- [Express.js](https://expressjs.com/) for the robust web framework

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Happy Chatting! 🤖💬**
