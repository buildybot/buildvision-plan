'use client';

import { useState, useRef, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Source {
  index: number;
  title: string;
  manufacturer: string;
  url: string;
  pageNumber?: number;
  snippet?: string;
}

interface ApiResponse {
  ok: boolean;
  answer: string;
  sources: Source[];
  manufacturersReferenced: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  manufacturers?: string[];
}

// ─── Preset Questions ─────────────────────────────────────────────────────────

const PRESETS = [
  'I need a 200-ton chiller for a hospital',
  'Compare Greenheck vs Nortek air handling units',
  'What are the code requirements for smoke control?',
  'Which VRF systems support heat recovery?',
];

// ─── Render Answer with Citation Links ────────────────────────────────────────

function AnswerText({ text, sources }: { text: string; sources: Source[] }) {
  // Replace [N] with clickable links
  const parts = text.split(/(\[\d+\])/g);
  return (
    <span>
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (match) {
          const idx = parseInt(match[1], 10);
          const source = sources.find((s) => s.index === idx);
          if (source?.url) {
            return (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 hover:bg-blue-500/40 hover:border-blue-400/70 transition-colors cursor-pointer mx-0.5 align-super"
                title={`${source.manufacturer} — ${source.title}`}
              >
                {idx}
              </a>
            );
          }
        }
        // Render **bold** text
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {boldParts.map((bp, j) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return <strong key={j} className="font-semibold text-white">{bp.slice(2, -2)}</strong>;
              }
              return bp;
            })}
          </span>
        );
      })}
    </span>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400"
            style={{
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-slate-400">Searching 28,000+ documents…</span>
    </div>
  );
}

// ─── Platform Features ────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🔍',
    title: 'Equipment Selection',
    desc: 'AI-powered search across every major manufacturer. Compare specs, efficiency ratings, and pricing in seconds.',
  },
  {
    icon: '📐',
    title: 'Plan Upload',
    desc: 'Upload construction drawings. Get equipment recommendations matched to your project requirements.',
  },
  {
    icon: '📬',
    title: 'Email Integration',
    desc: 'Forward rep emails. Auto-extract specs, pricing, and quotes — no manual data entry.',
  },
  {
    icon: '📋',
    title: 'Code Compliance',
    desc: 'ASHRAE standards, building codes, smoke control requirements — instant, sourced answers.',
  },
  {
    icon: '📦',
    title: 'Manufacturer Data',
    desc: 'Full catalogs, submittals, and specs from 73 manufacturers. Always current, always searchable.',
  },
  {
    icon: '📞',
    title: 'Rep Intelligence',
    desc: 'Know which reps cover your territory. Who to call, what they carry, how to reach them.',
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setLoading(true);

    try {
      const res = await fetch('https://buildvision-atlas.vercel.app/api/embed/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'embed_buildvision_plan_2026', message: q }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data: ApiResponse = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          sources: data.sources ?? [],
          manufacturers: data.manufacturersReferenced ?? [],
        },
      ]);
    } catch (err) {
      setError('Unable to reach Atlas. Please try again.');
      setMessages((prev) => prev.slice(0, -1)); // remove user message on error
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-blue-300 border border-blue-400/20 bg-blue-400/5 mb-8">
          MEP Platform
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-5">
          BuildVision
        </h1>
        <p className="text-xl sm:text-2xl text-slate-400 max-w-xl">
          The one place every MEP professional needs.
        </p>
      </section>

      {/* ── Live Demo ──────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-4xl mx-auto w-full">
        <div className="glass rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(96,165,250,0.07)' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Atlas — BuildVision AI</span>
          </div>

          {/* Chat area */}
          <div className="min-h-[320px] max-h-[540px] overflow-y-auto px-5 py-5 flex flex-col gap-4">
            {!hasMessages && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <p className="text-slate-400 text-sm mb-6">Ask anything about MEP equipment, codes, or manufacturers.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {PRESETS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-sm rounded-lg glass glass-hover text-slate-300 hover:text-white transition-all text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasMessages && (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'chat-bubble-user text-slate-100'
                          : 'chat-bubble-ai text-slate-200'
                      }`}
                    >
                      {msg.role === 'assistant' && msg.sources ? (
                        <>
                          <AnswerText text={msg.content} sources={msg.sources} />

                          {/* Sources */}
                          {msg.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/5">
                              <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Sources</p>
                              <div className="flex flex-col gap-1.5">
                                {msg.sources.map((src) => (
                                  <a
                                    key={src.index}
                                    href={src.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2 group"
                                  >
                                    <span className="flex-shrink-0 w-4 h-4 mt-0.5 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold group-hover:bg-blue-500/40 transition-colors">
                                      {src.index}
                                    </span>
                                    <span className="text-xs text-slate-400 group-hover:text-blue-300 transition-colors leading-snug">
                                      <span className="font-medium text-slate-300">{src.manufacturer}</span>
                                      {src.title ? ` — ${src.title}` : ''}
                                      {src.pageNumber ? ` (p.${src.pageNumber})` : ''}
                                    </span>
                                  </a>
                                ))}
                              </div>

                              {/* Manufacturers referenced */}
                              {msg.manufacturers && msg.manufacturers.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {msg.manufacturers.map((m) => (
                                    <span
                                      key={m}
                                      className="px-2 py-0.5 rounded-full text-[11px] bg-slate-700/50 text-slate-400 border border-white/5"
                                    >
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-ai rounded-xl px-4 py-3">
                      <Spinner />
                    </div>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="text-center text-sm text-red-400 py-2">{error}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset chips (shown after conversation starts) */}
          {hasMessages && (
            <div className="px-5 py-3 border-t border-white/5 flex flex-wrap gap-2">
              {PRESETS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="px-2.5 py-1 text-xs rounded-lg glass glass-hover text-slate-400 hover:text-white transition-all disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-white/5 flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about equipment, specs, or codes…"
              disabled={loading}
              className="flex-1 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-400/40 focus:bg-white/6 transition-all disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              Send
            </button>
          </div>
        </div>

        {/* Stats note */}
        <p className="text-center text-sm text-slate-500 mt-5">
          28,000+ manufacturer documents · 73 manufacturers · Real answers from real data
        </p>
      </section>

      {/* ── Platform ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto w-full">
        <div className="section-divider mb-16" />

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Platform</h2>
          <p className="text-slate-400">Built for the full MEP workflow — not just one piece of it.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass rounded-xl p-5">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-1.5">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            Free for engineers and contractors.{' '}
            <span className="text-slate-300">Manufacturers pay for visibility, leads, and market intelligence.</span>
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span className="font-semibold text-slate-300">BuildVision</span>
          <span>Contact: <a href="mailto:ben@buildvision.io" className="text-slate-400 hover:text-white transition-colors">ben@buildvision.io</a></span>
          <span>© {new Date().getFullYear()} BuildVision</span>
        </div>
      </footer>
    </>
  );
}
