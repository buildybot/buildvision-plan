"use client";

import { motion } from "framer-motion";

function EngineeringOrb() {
  return (
    <div className="relative w-full max-w-lg mx-auto h-64 md:h-80 flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      </div>
      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#60a5fa" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#grid)" />
      </svg>
      {/* Central hub */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 rounded-full border-2 border-blue-400/40 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2 border-purple-400/40 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            BV
          </div>
        </motion.div>
        {/* Orbit dots */}
        {["top-0", "right-0", "bottom-0", "left-0"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 rounded-full bg-blue-400`} style={{ margin: "-4px" }} />
        ))}
      </motion.div>

      {/* Floating manufacturer logos */}
      {[
        { label: "Trane", x: "-120px", y: "-60px", color: "#60a5fa" },
        { label: "Carrier", x: "100px", y: "-70px", color: "#a78bfa" },
        { label: "York", x: "110px", y: "50px", color: "#f472b6" },
        { label: "Multistack", x: "-130px", y: "60px", color: "#34d399" },
      ].map((m, i) => (
        <motion.div
          key={m.label}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute glass rounded-lg px-3 py-1.5 text-xs font-semibold"
          style={{ transform: `translate(${m.x}, ${m.y})`, color: m.color, borderColor: `${m.color}30` }}
        >
          {m.label}
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        {[
          { x1: "50%", y1: "50%", x2: "20%", y2: "30%", color: "#60a5fa" },
          { x1: "50%", y1: "50%", x2: "78%", y2: "28%", color: "#a78bfa" },
          { x1: "50%", y1: "50%", x2: "80%", y2: "68%", color: "#f472b6" },
          { x1: "50%", y1: "50%", x2: "18%", y2: "68%", color: "#34d399" },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke={line.color}
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-blue-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          The OpenEvidence of Construction
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          The Future of{" "}
          <span className="gradient-text">Equipment Selection</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12"
        >
          AI-powered · manufacturer-neutral · standards-backed
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-opacity pulse-glow"
          >
            See How It Works
          </a>
          <a
            href="#problem"
            className="px-8 py-4 rounded-xl glass text-slate-300 font-semibold text-lg hover:text-white transition-colors"
          >
            The Problem →
          </a>
        </motion.div>

        {/* Engineering visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <EngineeringOrb />
        </motion.div>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "$45B", label: "HVAC Market" },
            { value: "90K+", label: "MEP Engineers" },
            { value: "300+", label: "AHRI Members" },
            { value: "$0", label: "Neutral AI Tools Today" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
