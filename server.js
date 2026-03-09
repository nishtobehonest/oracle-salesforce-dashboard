import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { buildSystemPrompt } from './src/utils/caseContext.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? true : 'http://localhost:5174' }));
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages, activeTab } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [...history, { role: 'user', parts: [{ text: lastMessage }] }],
      config: { systemInstruction: buildSystemPrompt(activeTab) },
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

// Serve built Vite frontend in production
const distPath = join(__dirname, 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/*', (req, res) => res.sendFile(join(distPath, 'index.html')));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'YES ✓' : 'NO ✗ — check .env file');
});
