import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, CornerDownLeft } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'Why did Oracle acquire Cerner for $28B?',
  "How did Salesforce's SaaS model outmaneuver Oracle?",
  'Compare gross margins between the two companies.',
  "What's Oracle's cloud transition story?",
];

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-3 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function ChatModal({ activeTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  async function sendMessage(text) {
    const userText = text ?? input.trim();
    if (!userText || isStreaming) return;

    const userMsg = { role: 'user', content: userText };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsStreaming(true);

    // Add empty assistant placeholder
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          activeTab,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: updated[updated.length - 1].content + parsed.text,
                };
                return updated;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Check that the server is running and your API key is set.',
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const showSuggestions = messages.length === 0;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all z-50 cursor-pointer"
        style={{ width: 52, height: 52 }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed bottom-22 right-6 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          style={{ height: 560, bottom: 72 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div>
              <p className="text-sm font-semibold text-slate-800">Ask about the case</p>
              <p className="text-xs text-slate-400">
                Viewing: {activeTab === 'financials' ? 'Financials' :
                          activeTab === 'market-share' ? 'Market Share' :
                          activeTab === 'product-strategy' ? 'Product Strategy' :
                          'Business Model'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {showSuggestions && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 text-center pt-2">Suggested questions</p>
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="w-full text-left text-xs bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg px-3 py-2 text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  {msg.content === '' && msg.role === 'assistant' ? (
                    <TypingIndicator />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 px-3 py-3">
            <div className="flex items-end gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about the case…"
                rows={1}
                disabled={isStreaming}
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none outline-none max-h-28 min-h-0"
                style={{ lineHeight: '1.4' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isStreaming}
                className="flex-shrink-0 text-blue-600 hover:text-blue-700 disabled:text-slate-300 transition-colors cursor-pointer disabled:cursor-default"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-300 text-center mt-1.5 flex items-center justify-center gap-1">
              <CornerDownLeft size={10} /> Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}
