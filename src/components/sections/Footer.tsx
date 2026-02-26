"use client";

import AnimateIn from "../AnimateIn";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setContactSubmitted(true);
  };

  return (
    <section id="footer" className="py-24 px-6 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <AnimateIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-pink-300 mb-8">
            🚀 Early Access
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Ready to Transform{" "}
            <span className="gradient-text">Equipment Selection?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Join the waitlist for early access. Whether you're an engineer, a GC, or a manufacturer — 
            BuildVision is built for you.
          </p>

          {/* Email signup */}
          <div className="max-w-lg mx-auto">
            {!submitted ? (
              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl px-6 py-5 border border-green-500/30 bg-green-500/5 text-center"
              >
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-green-400 font-bold text-lg">You're on the list!</p>
                <p className="text-slate-400 text-sm mt-1">We'll reach out when BuildVision launches for {email}</p>
              </motion.div>
            )}
          </div>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact form */}
          <AnimateIn direction="left">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-bold text-white text-xl mb-6">💬 Get in Touch</h3>
              <p className="text-slate-400 text-sm mb-6">
                Manufacturer looking to get listed? Engineering firm interested in early access? 
                Investor wanting to learn more? Reach out.
              </p>
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                    required
                  />
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-slate-900">I am a...</option>
                    <option value="engineer" className="bg-slate-900">MEP Engineer</option>
                    <option value="gc" className="bg-slate-900">GC / Subcontractor</option>
                    <option value="manufacturer" className="bg-slate-900">Manufacturer / Rep</option>
                    <option value="investor" className="bg-slate-900">Investor</option>
                    <option value="other" className="bg-slate-900">Other</option>
                  </select>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your interest..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-6 border border-green-500/30 bg-green-500/5 text-center"
                >
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-green-400 font-bold">Message received!</p>
                  <p className="text-slate-400 text-sm mt-1">We'll be in touch within 24 hours.</p>
                </motion.div>
              )}
            </div>
          </AnimateIn>

          {/* Key facts */}
          <AnimateIn direction="right">
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white text-lg mb-4">🎯 Why Now?</h3>
                <div className="space-y-3">
                  {[
                    { icon: "🤖", text: "AI is finally good enough to parse complex engineering specifications" },
                    { icon: "📊", text: "AHRI is offering API access for the first time" },
                    { icon: "🏗️", text: "$45B market with zero neutral digital tools" },
                    { icon: "💡", text: "OpenEvidence proved the model works in medicine ($12B valuation)" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-lg">{item.icon}</span>
                      <p className="text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white text-lg mb-4">🤝 Current Partners</h3>
                <div className="flex flex-wrap gap-2">
                  {["Trane", "Carrier", "Daikin", "Multistack", "Price Industries", "Greenheck"].map(m => (
                    <span key={m} className="glass text-sm text-slate-300 rounded-full px-3 py-1 border border-white/10">
                      {m}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-3">* Existing manufacturer relationships — not yet commercial agreements</p>
              </div>

              <div className="gradient-border rounded-2xl p-6">
                <p className="text-white font-bold text-lg mb-2">Contact the Team</p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-white">Ben Lyddane</strong>, COO · BuildVision<br />
                  <a href="mailto:ben@buildvision.io" className="text-blue-400 hover:underline">ben@buildvision.io</a>
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              BV
            </div>
            <span className="text-slate-400 text-sm">BuildVision © 2026 · The Future of Equipment Selection</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#problem" className="hover:text-slate-300 transition-colors">The Problem</a>
            <a href="#how-it-works" className="hover:text-slate-300 transition-colors">How It Works</a>
            <a href="#revenue" className="hover:text-slate-300 transition-colors">Revenue Model</a>
            <a href="#roadmap" className="hover:text-slate-300 transition-colors">Roadmap</a>
          </div>
        </div>
      </div>
    </section>
  );
}
