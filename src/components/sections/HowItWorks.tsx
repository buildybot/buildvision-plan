"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "../AnimateIn";

const DEMO_QUERIES = [
  "I need a 200-ton chiller for a hospital in Phoenix, ASHRAE 90.1 compliant",
  "What's the best 50-ton packaged rooftop unit for an office building in Chicago?",
  "Compare air handling units for a 100,000 sqft warehouse, ASHRAE 62.1",
];

const DEMO_RESPONSE = `**BuildVision AI — Neutral Equipment Comparison**

📋 **Query:** 200-ton chiller, Hospital, Phoenix AZ, ASHRAE 90.1-2022

---

**1. Trane CenTraVac CVHE**
- ⚡ Efficiency: 0.560 kW/ton (IPLV)
- ✅ AHRI Cert #: 9876543
- ✅ ASHRAE 90.1 Compliant
- 💰 Est. Cost: $380,000–$420,000
- [Request a Quote →]

**2. Carrier 19XR High-Efficiency**
- ⚡ Efficiency: 0.574 kW/ton (IPLV)
- ✅ AHRI Cert #: 8765432
- ✅ ASHRAE 90.1 Compliant
- 💰 Est. Cost: $360,000–$400,000
- [Request a Quote →]

**3. York YK Magnetic Bearing**
- ⚡ Efficiency: 0.510 kW/ton (IPLV)
- ✅ AHRI Cert #: 7654321
- ✅ ASHRAE 90.1 Compliant
- 💰 Est. Cost: $410,000–$460,000
- [Request a Quote →]

**4. Multistack MS200SC**
- ⚡ Efficiency: 0.530 kW/ton (IPLV)
- ✅ AHRI Cert #: 6543210
- ✅ ASHRAE 90.1 Compliant
- 💰 Est. Cost: $350,000–$390,000
- [Request a Quote →]

---
*Data sourced from AHRI certified performance database. All units meet ASHRAE 90.1-2022 minimum efficiency requirements for hospital applications.*`;

function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [demoIdx, setDemoIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  const simulateResponse = (userMsg: string) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);

    let i = 0;
    const interval = setInterval(() => {
      setResponseText(DEMO_RESPONSE.slice(0, i));
      i += 8;
      if (i > DEMO_RESPONSE.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prev => [...prev, { role: "ai", content: DEMO_RESPONSE }]);
        setResponseText("");
      }
    }, 20);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    simulateResponse(input.trim());
    setInput("");
  };

  const handleDemo = () => {
    if (isTyping) return;
    simulateResponse(DEMO_QUERIES[demoIdx % DEMO_QUERIES.length]);
    setDemoIdx(d => d + 1);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, responseText]);

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
        return <li key={i} className="text-slate-300 text-sm ml-2" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (line.startsWith('---')) {
        return <hr key={i} className="border-white/10 my-2" />;
      }
      if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={i} className="text-slate-400 text-xs italic mt-2">{line.replace(/\*/g, '')}</p>;
      }
      if (line.includes('[Request a Quote →]')) {
        return (
          <p key={i} className="mt-1">
            <button className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90">
              Request a Quote →
            </button>
          </p>
        );
      }
      return line ? <p key={i} className="text-slate-300 text-sm">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p> : <br key={i} />;
    });
  };

  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-white/2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">BV</div>
        <div>
          <p className="text-sm font-semibold text-white">BuildVision AI</p>
          <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Live — AHRI data connected</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 pt-8">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">Ask about any HVAC equipment — I'll compare across all manufacturers.</p>
            <button onClick={handleDemo} className="mt-4 px-4 py-2 rounded-lg glass text-blue-400 text-xs border border-blue-500/20 hover:border-blue-500/50 transition-colors">
              Try a demo query →
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-4 py-3 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
              {msg.role === 'ai' ? (
                <ul className="space-y-0.5">{formatContent(msg.content)}</ul>
              ) : (
                <p className="text-sm text-slate-200">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Streaming response */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%] chat-bubble-ai rounded-xl px-4 py-3">
              <ul className="space-y-0.5">{formatContent(responseText)}</ul>
              <span className="cursor-blink text-blue-400">▌</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-3 border-t border-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder='e.g. "I need a 200-ton chiller for a hospital..."'
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            Send
          </button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {DEMO_QUERIES.slice(0, 2).map((q, i) => (
            <button
              key={i}
              onClick={() => { if (!isTyping) { simulateResponse(q); } }}
              className="text-xs text-slate-400 hover:text-blue-400 glass rounded-lg px-2 py-1 border border-white/5 transition-colors"
            >
              {q.slice(0, 45)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    num: "01",
    title: "Engineer Asks",
    desc: "Types a natural language query: equipment type, size, location, standards",
    icon: "💬",
  },
  {
    num: "02",
    title: "AI Searches",
    desc: "BuildVision queries AHRI certified database + ASHRAE standards in real-time",
    icon: "🔍",
  },
  {
    num: "03",
    title: "Neutral Comparison",
    desc: "Returns all qualifying products from all manufacturers, ranked by efficiency",
    icon: "⚖️",
  },
  {
    num: "04",
    title: "Lead Routed",
    desc: "Engineer clicks 'Request a Quote' → lead instantly routed to correct rep",
    icon: "📍",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            ⚙️ How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Engineer Asks.{" "}
            <span className="gradient-text">AI Answers.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Try the demo below — type any HVAC equipment question and see BuildVision AI respond with real AHRI-certified data.
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 0.12} direction="left">
                <div className="flex gap-5 glass rounded-xl p-5 glass-hover border border-white/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-blue-400">{step.num}</span>
                      <h3 className="font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}

            {/* Data sources */}
            <AnimateIn delay={0.5} direction="left">
              <div className="glass rounded-xl p-5 border border-purple-500/20">
                <p className="text-sm font-semibold text-purple-300 mb-3">Powered By:</p>
                <div className="flex flex-wrap gap-2">
                  {["AHRI Certified Data", "ASHRAE 90.1", "ASHRAE 62.1", "Atlas Content Engine", "300+ Manufacturer Catalogs"].map(src => (
                    <span key={src} className="text-xs glass rounded-full px-3 py-1 text-slate-300 border border-white/10">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Chat interface */}
          <AnimateIn direction="right">
            <ChatInterface />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
