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

// ─── Flow Chart Data ──────────────────────────────────────────────────────────

// No features array needed — replaced with flow chart

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

      {/* ── How It Works — Flow Chart ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="section-divider mb-16" />

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Every piece of equipment data flows through one platform. Engineers get the best answers. Manufacturers get the best customers.</p>
        </div>

        {/* ── INTAKE ROW ── */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">Intake</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: '💬', label: 'Equipment Queries', sub: '"I need a 200-ton chiller for a hospital"' },
              { icon: '📐', label: 'Construction Plans', sub: 'Upload drawings, get equipment recs' },
              { icon: '📧', label: 'Email Forwarding', sub: 'Forward rep emails → auto-extract specs' },
              { icon: '📋', label: 'Code Questions', sub: 'ASHRAE, IECC, smoke control, ventilation' },
              { icon: '🔍', label: 'Product Search', sub: 'Compare specs across manufacturers' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-4 text-center hover:border-blue-400/30 transition-colors">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                <p className="text-xs text-slate-500 leading-snug">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center py-4">
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-gradient-to-b from-blue-400/50 to-blue-400/20" />
            <svg width="16" height="10" viewBox="0 0 16 10" className="text-blue-400/50"><path d="M8 10L0 0h16L8 10z" fill="currentColor"/></svg>
          </div>
        </div>

        {/* ── BUILDVISION CORE ── */}
        <div className="mb-3">
          <div className="relative gradient-border rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.06), rgba(167,139,250,0.04))' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500 text-white">
              BuildVision Atlas
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="text-center p-3">
                <div className="text-2xl mb-2">🧠</div>
                <p className="text-sm font-semibold text-white">AI Processing</p>
                <p className="text-xs text-slate-400 mt-1">RAG across 28K+ docs from 73 manufacturers. Every answer cites its source.</p>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm font-semibold text-white">Data Extraction</p>
                <p className="text-xs text-slate-400 mt-1">Specs, capacities, efficiency ratings, model numbers — structured from submittals &amp; catalogs.</p>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl mb-2">🏗️</div>
                <p className="text-sm font-semibold text-white">Intent Matching</p>
                <p className="text-xs text-slate-400 mt-1">Understands project context. Matches requirements to products. Routes interest to the right manufacturer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow splits left and right */}
        <div className="flex justify-center py-4">
          <div className="flex items-end gap-16 sm:gap-32">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-green-400/50 to-green-400/20" />
              <svg width="16" height="10" viewBox="0 0 16 10" className="text-green-400/50"><path d="M8 10L0 0h16L8 10z" fill="currentColor"/></svg>
              <span className="text-[10px] text-green-400/70 font-semibold uppercase tracking-wider mt-1">Free</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-amber-400/50 to-amber-400/20" />
              <svg width="16" height="10" viewBox="0 0 16 10" className="text-amber-400/50"><path d="M8 10L0 0h16L8 10z" fill="currentColor"/></svg>
              <span className="text-[10px] text-amber-400/70 font-semibold uppercase tracking-wider mt-1">Revenue</span>
            </div>
          </div>
        </div>

        {/* ── OUTPUT ROW — Two sides ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Engineers & Contractors (FREE) */}
          <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.15)' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-400/30">Free</span>
              <h3 className="text-lg font-bold text-white">Engineers &amp; Contractors</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Equipment answers', detail: 'Sourced from real manufacturer data' },
                { label: 'Code compliance', detail: 'ASHRAE, IECC, building codes' },
                { label: 'Spec comparisons', detail: 'Side-by-side across manufacturers' },
                { label: 'Rep contacts', detail: 'Who covers your territory' },
                { label: 'Plan analysis', detail: 'Upload drawings → equipment list' },
                { label: 'Email integration', detail: 'Forward rep quotes → auto-organize' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-white font-medium">{item.label}</span>
                    <span className="text-sm text-slate-500"> — {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-green-400/50 mt-4 pt-3 border-t border-green-400/10">~90,000 MEP engineers in the US. Become the tool they can&apos;t work without.</p>
          </div>

          {/* Right: Manufacturers & Reps (PAID) */}
          <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-400/30">Paid</span>
              <h3 className="text-lg font-bold text-white">Manufacturers &amp; Reps</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Qualified leads', detail: 'Engineers actively specifying your equipment' },
                { label: 'Visibility', detail: 'Your products surface when engineers search' },
                { label: 'Market intelligence', detail: 'What engineers ask about, what they compare' },
                { label: 'Content placement', detail: 'Your specs, case studies, and submittals featured' },
                { label: 'Territory mapping', detail: 'Route leads to the right local rep' },
                { label: 'Competitive insight', detail: 'Know when you&apos;re being compared — and to whom' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-white font-medium">{item.label}</span>
                    <span className="text-sm text-slate-500"> — {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-400/50 mt-4 pt-3 border-t border-amber-400/10">Modeled on OpenEvidence: free for practitioners, funded by the industry. $70–$150+ CPM at scale.</p>
          </div>
        </div>

        {/* ── Revenue arrow back up ── */}
        <div className="flex justify-center py-6">
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <span className="text-amber-400 text-lg">💰</span>
            <div>
              <p className="text-sm font-semibold text-white">Revenue Model</p>
              <p className="text-xs text-slate-400">Manufacturers pay for visibility &amp; leads → BuildVision stays free for engineers → more engineers → more value for manufacturers</p>
            </div>
            <span className="text-green-400 text-lg">♻️</span>
          </div>
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
