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
  'What does ASHRAE 90.1 require for economizers?',
  'Who reps Multistack in the DC metro area?',
  'ASHRAE 15 refrigerant safety requirements for machine rooms',
  'Which VRF systems support heat recovery?',
  'Standard 62.1 ventilation rates for a school gymnasium',
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
      <span className="text-sm text-slate-400">Searching manufacturer documents…</span>
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
        <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl">
          AI-powered equipment selection for the MEP industry. Free for engineers. Funded by manufacturers.
        </p>
      </section>

      {/* ── Partner Ticker ───────────────────────────────────────────────── */}
      <div className="overflow-hidden py-6 border-y border-white/5 mb-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 text-center mb-4">Potential Partners &amp; Data Sources</p>
        <div className="relative">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center gap-12 sm:gap-16 px-8">
                {[
                  { name: 'ASHRAE', sub: 'Standards & Handbooks' },
                  { name: 'AHRI', sub: 'Certified Performance Data' },
                  { name: 'IEEE', sub: 'Electrical Standards' },
                  { name: 'NFPA', sub: 'Fire & Life Safety Codes' },
                  { name: 'SMACNA', sub: 'Sheet Metal & HVAC Standards' },
                  { name: 'USGBC', sub: 'LEED & Sustainability' },
                  { name: 'ICC', sub: 'International Building Codes' },
                  { name: 'NEMA', sub: 'Electrical Equipment Standards' },
                ].map((org) => (
                  <div key={`${copy}-${org.name}`} className="flex flex-col items-center flex-shrink-0">
                    <span className="text-lg sm:text-xl font-bold tracking-wide text-slate-300">{org.name}</span>
                    <span className="text-[10px] text-slate-600">{org.sub}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── The Problem ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-12 max-w-3xl mx-auto w-full">
        <div className="glass rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Today, MEP engineers spend hours digging through manufacturer PDFs, calling reps for specs, cross-referencing codes manually, and emailing back and forth for quotes. There is no single source of truth for equipment selection.
          </p>
          <p className="text-sm sm:text-base text-white font-semibold mt-3">BuildVision changes that.</p>
        </div>
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
          Thousands of manufacturer documents · Real answers from real data
        </p>
      </section>

      {/* ── Unified Flow — How It Works + Revenue ──────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="section-divider mb-16" />

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Every piece of equipment data flows through one platform. Engineers get the best answers. Manufacturers get the best customers.</p>
        </div>

        {/* ── DATA SOURCES ── */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">Data Sources</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <p className="text-sm font-bold text-purple-300 mb-1">AHRI</p>
              <p className="text-xs text-slate-500">Certified performance data. IPLV, EER, capacity ratings.</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-400/20">Data License</span>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <p className="text-sm font-bold text-purple-300 mb-1">ASHRAE</p>
              <p className="text-xs text-slate-500">Standards 90.1, 62.1, 15, 34, 55. Handbooks. Guidelines.</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-400/20">Content License</span>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <p className="text-sm font-bold text-purple-300 mb-1">Manufacturer Data</p>
              <p className="text-xs text-slate-500">Submittals, catalogs, specs, case studies. Every major manufacturer.</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-400/20">Direct Integration</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gradient-to-b from-purple-400/40 to-blue-400/30" />
            <svg width="14" height="9" viewBox="0 0 14 9" className="text-blue-400/40"><path d="M7 9L0 0h14L7 9z" fill="currentColor"/></svg>
          </div>
        </div>

        {/* ── INTAKE ROW ── */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">Intake</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: '💬', label: 'Equipment Queries', sub: '"I need a 200-ton chiller for a hospital"' },
              { icon: '📐', label: 'Construction Plans', sub: 'Upload drawings, get equipment recs' },
              { icon: '📧', label: 'Email Forwarding', sub: 'Forward rep emails → auto-extract specs' },
              { icon: '📋', label: 'Code Questions', sub: 'ASHRAE, IECC, smoke control, ventilation' },
              { icon: '🔍', label: 'Product Search', sub: 'Compare specs across manufacturers' },
              { icon: '📝', label: 'Selection Requests', sub: 'Submit requirements, get matched equipment' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-4 text-center hover:border-blue-400/30 transition-colors">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                <p className="text-xs text-slate-500 leading-snug">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-3">
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gradient-to-b from-blue-400/40 to-blue-400/20" />
            <svg width="14" height="9" viewBox="0 0 14 9" className="text-blue-400/40"><path d="M7 9L0 0h14L7 9z" fill="currentColor"/></svg>
          </div>
        </div>

        {/* ── BUILDVISION CORE ── */}
        <div className="mb-3">
          <div className="relative gradient-border rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.06), rgba(167,139,250,0.04))' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500 text-white">BuildVision Atlas</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <div className="text-center p-3">
                <div className="text-2xl mb-2">🧠</div>
                <p className="text-sm font-semibold text-white">AI Processing</p>
                <p className="text-xs text-slate-400 mt-1">RAG across thousands of docs. Every answer cites its source.</p>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm font-semibold text-white">Data Extraction</p>
                <p className="text-xs text-slate-400 mt-1">Specs, capacities, efficiency ratings — structured from submittals.</p>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl mb-2">🖥️</div>
                <p className="text-sm font-semibold text-white">Selection Software</p>
                <p className="text-xs text-slate-400 mt-1">Trace, CAPS, Greenheck CAPs, manufacturer selection tools. Unified.</p>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl mb-2">🏗️</div>
                <p className="text-sm font-semibold text-white">Intent Matching</p>
                <p className="text-xs text-slate-400 mt-1">Matches requirements to products. Routes interest to manufacturers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow splits */}
        <div className="flex justify-center py-4">
          <div className="flex items-end gap-16 sm:gap-32">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-green-400/50 to-green-400/20" />
              <svg width="14" height="9" viewBox="0 0 14 9" className="text-green-400/50"><path d="M7 9L0 0h14L7 9z" fill="currentColor"/></svg>
              <span className="text-[10px] text-green-400/70 font-semibold uppercase tracking-wider mt-1">Free</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-amber-400/50 to-amber-400/20" />
              <svg width="14" height="9" viewBox="0 0 14 9" className="text-amber-400/50"><path d="M7 9L0 0h14L7 9z" fill="currentColor"/></svg>
              <span className="text-[10px] text-amber-400/70 font-semibold uppercase tracking-wider mt-1">Revenue</span>
            </div>
          </div>
        </div>

        {/* ── OUTPUT — Free / Paid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
                  <div><span className="text-sm text-white font-medium">{item.label}</span><span className="text-sm text-slate-500"> — {item.detail}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-400/30">Paid</span>
              <h3 className="text-lg font-bold text-white">Manufacturers &amp; Reps</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Qualified leads', detail: 'Engineers actively specifying your equipment' },
                { label: 'Visibility', detail: 'Products surface when engineers search' },
                { label: 'Market intelligence', detail: 'What engineers ask about, what they compare' },
                { label: 'Content placement', detail: 'Specs, case studies, submittals featured' },
                { label: 'Territory mapping', detail: 'Route leads to the right local rep' },
                { label: 'Competitive insight', detail: 'Know when you&apos;re being compared — and to whom' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0" />
                  <div><span className="text-sm text-white font-medium">{item.label}</span><span className="text-sm text-slate-500"> — {item.detail}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Verification Gate ── */}
        <div className="mb-8 rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.12)' }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="text-3xl flex-shrink-0">🔐</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Verified User Model</h3>
              <p className="text-sm text-slate-400 leading-relaxed">The same model that made OpenEvidence a $12B company. Unverified users get limited access. Verified MEP professionals get unlimited, free access — creating the most valuable audience in construction.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-500 text-lg">👤</span>
                <p className="text-sm font-semibold text-slate-300">Unverified</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Limited questions per week. Enough to see the value.</p>
              <div className="mt-3 px-3 py-2 rounded-lg text-xs text-slate-500 italic" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                &ldquo;You&apos;ve reached the weekly limit. Verify your PE license or employer to unlock unlimited access — it&apos;s free.&rdquo;
              </div>
            </div>
            <div className="glass rounded-xl p-4" style={{ borderColor: 'rgba(52,211,153,0.25)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400 text-lg">✅</span>
                <p className="text-sm font-semibold text-green-300">Verified MEP Professional</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Unlimited access. Verified via PE license, employer domain, or professional credentials.</p>
            </div>
            <div className="glass rounded-xl p-4" style={{ borderColor: 'rgba(251,191,36,0.25)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 text-lg">⭐</span>
                <p className="text-sm font-semibold text-amber-300">Manufacturer / Rep</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Paid tier. Analytics dashboard, lead routing, visibility controls, competitive intelligence.</p>
            </div>
          </div>
        </div>

        {/* ── Manufacturer Dashboard Mock ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5 text-center">What Manufacturers See</p>
          <div className="glass rounded-2xl p-6 sm:p-8" style={{ boxShadow: '0 0 40px rgba(251,191,36,0.05)' }}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-bold text-white">Manufacturer Dashboard</span>
              <span className="text-xs text-slate-500">— Trane (Example)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { value: '1,247', label: 'Queries This Month', color: 'text-blue-300' },
                { value: 'Centrifugal Chillers', label: 'Top Search Category', color: 'text-green-300' },
                { value: 'Carrier', label: 'Top Competing Brand', color: 'text-red-300' },
                { value: '34', label: 'Active Projects Mentioning Trane', color: 'text-purple-300' },
                { value: '12', label: 'Leads Routed to Reps', color: 'text-amber-300' },
                { value: 'Northeast', label: 'Highest Demand Territory', color: 'text-cyan-300' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className={`text-lg sm:text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Revenue Streams ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5 text-center">Revenue Streams</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl p-5" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400">📣</span>
                <p className="text-sm font-bold text-amber-300">Visibility &amp; Placement</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">Products surface in relevant queries. Not ads — contextual results backed by real data.</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Model</span><span className="text-amber-300 font-medium">CPM / Per-query</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Comparable</span><span className="text-amber-300 font-medium">$70–$150+ CPM</span></div>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400">🎯</span>
                <p className="text-sm font-bold text-amber-300">Lead Routing</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">Active specification intent routed to the manufacturer&apos;s local rep. Highest-value lead in construction.</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Model</span><span className="text-amber-300 font-medium">Per-lead / subscription</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Routing</span><span className="text-amber-300 font-medium">Territory-matched</span></div>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400">📊</span>
                <p className="text-sm font-bold text-amber-300">Market Intelligence</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">What engineers search for, which products get compared, demand signals by region.</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Model</span><span className="text-amber-300 font-medium">SaaS / annual</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Buyer</span><span className="text-amber-300 font-medium">Product &amp; sales teams</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Flywheel ── */}
        <div className="mb-8 rounded-2xl p-6 sm:p-8 text-center" style={{ background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">The Flywheel</p>
          <p className="text-[10px] uppercase tracking-widest text-green-400/50 font-semibold mb-2">Engineers &amp; Designers</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm mb-5">
            <span className="glass rounded-lg px-3 py-2 text-green-300 font-medium text-xs sm:text-sm">More verified engineers</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-blue-300 font-medium text-xs sm:text-sm">More query signal</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-amber-300 font-medium text-xs sm:text-sm">More mfr revenue</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-purple-300 font-medium text-xs sm:text-sm">Better data</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-green-300 font-medium text-xs sm:text-sm">More engineers</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-cyan-400/50 font-semibold mb-2">GCs &amp; Subcontractors</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm">
            <span className="glass rounded-lg px-3 py-2 text-cyan-300 font-medium text-xs sm:text-sm">GCs use BV for procurement</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-blue-300 font-medium text-xs sm:text-sm">Project equipment data</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-amber-300 font-medium text-xs sm:text-sm">Real demand signal</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-purple-300 font-medium text-xs sm:text-sm">Better pricing</span>
            <svg className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12l4-4H4l4 4z"/></svg>
            <span className="glass rounded-lg px-3 py-2 text-cyan-300 font-medium text-xs sm:text-sm">More GCs adopt BV</span>
          </div>
        </div>

        {/* ── OE Comparable ── */}
        <div className="glass rounded-xl px-6 py-4 text-center mb-0">
          <p className="text-xs text-slate-400"><span className="font-semibold text-slate-300">Comparable:</span> OpenEvidence — same model applied to healthcare. $150M+ ARR. $12B valuation. 90%+ margins. 757K verified US physicians.</p>
        </div>
      </section>

      {/* ── Example Companies ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="section-divider mb-16" />

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Who Works With BuildVision</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Every persona in the MEP ecosystem benefits from a single platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Manufacturer */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-400/30">Manufacturer</span>
            <h3 className="text-xl font-bold text-white mt-3 mb-1">Greenheck</h3>
            <p className="text-xs text-slate-500 mb-3">$4B+ revenue · Fans, AHUs, dampers, kitchen ventilation</p>
            <p className="text-sm text-slate-400 leading-relaxed">Greenheck produces thousands of product configurations across dozens of categories. BuildVision indexes every submittal and catalog, so when an engineer asks &ldquo;What Greenheck fan handles 10,000 CFM at 2&quot; SP?&rdquo; they get an instant, cited answer — and Greenheck gets a qualified lead routed to their local rep.</p>
            <p className="text-xs text-amber-400/60 mt-3 font-medium">Pays for: Visibility, lead routing, competitive intelligence</p>
          </div>

          {/* Engineering Firm */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.15)' }}>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-400/30">Engineering Firm</span>
            <h3 className="text-xl font-bold text-white mt-3 mb-1">Buro Happold</h3>
            <p className="text-xs text-slate-500 mb-3">Global MEP engineering · 2,500+ employees · Complex projects</p>
            <p className="text-sm text-slate-400 leading-relaxed">Buro Happold engineers work on hospitals, data centers, and high-rises — each requiring equipment selection across dozens of manufacturers. Instead of digging through PDFs and calling reps, they ask BuildVision. Code compliance, manufacturer specs, and rep contacts — all in one place, verified against ASHRAE standards.</p>
            <p className="text-xs text-green-400/60 mt-3 font-medium">Uses for free: Equipment selection, code compliance, spec comparison</p>
          </div>

          {/* Standards Body */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)' }}>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-400/30">Standards Body</span>
            <h3 className="text-xl font-bold text-white mt-3 mb-1">AHRI</h3>
            <p className="text-xs text-slate-500 mb-3">Air-Conditioning, Heating, and Refrigeration Institute · 300+ member companies</p>
            <p className="text-sm text-slate-400 leading-relaxed">AHRI certifies equipment performance data — IPLV, EER, capacity ratings — that engineers rely on for every specification. BuildVision licenses this data and makes it instantly searchable alongside manufacturer submittals. AHRI gains a new distribution channel for their certified data, reaching engineers at the point of decision.</p>
            <p className="text-xs text-purple-400/60 mt-3 font-medium">Partners via: Data licensing, extended reach to engineers</p>
          </div>

          {/* GC */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">General Contractor</span>
            <h3 className="text-xl font-bold text-white mt-3 mb-1">Structure Tone</h3>
            <p className="text-xs text-slate-500 mb-3">$6B+ revenue · Commercial interiors &amp; base building · Northeast US</p>
            <p className="text-sm text-slate-400 leading-relaxed">Structure Tone manages MEP procurement across hundreds of projects. BuildVision gives their project managers real-time equipment comparisons, automated spec verification, and direct access to manufacturer reps — eliminating weeks of back-and-forth emails and phone calls during the bid process.</p>
            <p className="text-xs text-cyan-400/60 mt-3 font-medium">Uses for free: Procurement, spec verification, rep discovery</p>
          </div>

          {/* MEP Sub */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">MEP Subcontractor</span>
            <h3 className="text-xl font-bold text-white mt-3 mb-1">Donnelly Mechanical</h3>
            <p className="text-xs text-slate-500 mb-3">$500M+ revenue · NYC&apos;s largest mechanical contractor</p>
            <p className="text-sm text-slate-400 leading-relaxed">Donnelly installs the equipment that engineers specify. BuildVision helps them verify specs match what was designed, find alternative equipment when supply chain issues hit, and communicate directly with manufacturer reps — all from one platform instead of scattered emails and outdated catalogs.</p>
            <p className="text-xs text-cyan-400/60 mt-3 font-medium">Uses for free: Spec verification, alternatives, rep contacts</p>
          </div>
        </div>
      </section>

      {/* ── Contacts ──────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="section-divider mb-16" />

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Target Contacts</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Key people across every organization we should be talking to.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Manufacturers */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">Manufacturers</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white font-medium">Jon Creisher</p>
                <p className="text-xs text-slate-500">Director, Strategic Partnerships — Greenheck</p>
                <p className="text-xs text-blue-400">jon.creisher@greenheck.com</p>
              </div>
            </div>
          </div>

          {/* Engineering */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-bold text-green-300 uppercase tracking-wider mb-4">Engineering Firms</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white font-medium">Rod Manson</p>
                <p className="text-xs text-slate-500">Director — Buro Happold</p>
                <p className="text-xs text-blue-400">rod.manson@burohappold.com</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">May Winfield</p>
                <p className="text-xs text-slate-500">Global Director, Commercial &amp; Digital Risks — Buro Happold</p>
                <p className="text-xs text-blue-400">may.winfield@burohappold.com</p>
              </div>
            </div>
          </div>

          {/* GCs & Subs */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4">GCs &amp; Subcontractors</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white font-medium">Loren Beas</p>
                <p className="text-xs text-slate-500">Director of Business Development — Structure Tone</p>
                <p className="text-xs text-blue-400">loren.beas@structuretone.com</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Marty Cunningham</p>
                <p className="text-xs text-slate-500">EVP, Business Development — Donnelly Mechanical</p>
                <p className="text-xs text-blue-400">mcunningham@donnellymech.com</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Tiziano Sartori</p>
                <p className="text-xs text-slate-500">Chief Operating Officer — Donnelly Mechanical</p>
                <p className="text-xs text-blue-400">tsartori@donnellymech.com</p>
              </div>
            </div>
          </div>

          {/* Standards & Licensing */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-4">Standards &amp; Licensing</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white font-medium">Jim Pauley</p>
                <p className="text-xs text-slate-500">President &amp; CEO — NFPA</p>
                <p className="text-xs text-blue-400">jpauley@nfpa.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Christian Dubay</p>
                <p className="text-xs text-slate-500">VP &amp; Chief Engineer — NFPA</p>
                <p className="text-xs text-blue-400">cdubay@nfpa.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Sophia Muirhead</p>
                <p className="text-xs text-slate-500">Executive Director &amp; COO — IEEE</p>
                <p className="text-xs text-blue-400">s.muirhead@ieee.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Travis Voss</p>
                <p className="text-xs text-slate-500">Director, Innovative Technology — SMACNA</p>
                <p className="text-xs text-blue-400">tvoss@smacna.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Susannah Forde</p>
                <p className="text-xs text-slate-500">Executive Director, Marketing — SMACNA</p>
                <p className="text-xs text-blue-400">sforde@smacna.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Hilari Varnadore</p>
                <p className="text-xs text-slate-500">VP, Sustainable Cities — USGBC</p>
                <p className="text-xs text-blue-400">hvarnadore@usgbc.org</p>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Mark Fasel</p>
                <p className="text-xs text-slate-500">Director, PMG Technical Resources — ICC</p>
                <p className="text-xs text-blue-400">mfasel@iccsafe.org</p>
              </div>
            </div>
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
