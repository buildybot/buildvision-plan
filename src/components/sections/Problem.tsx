"use client";

import { motion } from "framer-motion";
import AnimateIn from "../AnimateIn";
import { useState } from "react";

function TodayFlow() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { icon: "👷", label: "Engineer opens Trane Trace", bad: true },
        { icon: "🔒", label: "Only Trane products shown", bad: true },
        { icon: "📊", label: "Biased selection made", bad: true },
        { icon: "💸", label: "Manufacturer lock-in", bad: true },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-3 glass rounded-lg px-4 py-3 border border-red-500/20"
        >
          <span className="text-xl">{step.icon}</span>
          <span className="text-slate-300 text-sm flex-1">{step.label}</span>
          <span className="text-red-400 text-xs">✗</span>
        </motion.div>
      ))}
    </div>
  );
}

function TomorrowFlow() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { icon: "👷", label: "Engineer asks BuildVision AI", bad: false },
        { icon: "🌐", label: "All 300+ manufacturers compared", bad: false },
        { icon: "📐", label: "ASHRAE 90.1 compliance verified", bad: false },
        { icon: "🏆", label: "Best equipment for the project", bad: false },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-3 glass rounded-lg px-4 py-3 border border-green-500/20"
        >
          <span className="text-xl">{step.icon}</span>
          <span className="text-slate-300 text-sm flex-1">{step.label}</span>
          <span className="text-green-400 text-xs">✓</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Problem() {
  const [view, setView] = useState<"both" | "today" | "tomorrow">("both");

  return (
    <section id="problem" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-red-400 mb-6">
            ⚠️ The Problem
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Today's Tools Are{" "}
            <span className="text-red-400">Rigged</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Every major selection tool is built by a manufacturer — for that manufacturer. 
            Engineers don't have a neutral choice.
          </p>
        </AnimateIn>

        {/* Toggle buttons */}
        <AnimateIn delay={0.2} className="flex justify-center mb-12">
          <div className="glass rounded-xl p-1 flex gap-1">
            {[
              { key: "both", label: "Side by Side" },
              { key: "today", label: "Today" },
              { key: "tomorrow", label: "Tomorrow" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setView(btn.key as typeof view)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  view === btn.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Today */}
          {(view === "both" || view === "today") && (
            <AnimateIn direction="left">
              <div className="glass rounded-2xl p-8 border border-red-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">😤</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Today</h3>
                    <p className="text-red-400 text-sm">Biased. Siloed. Manufacturer-controlled.</p>
                  </div>
                </div>
                <TodayFlow />
                <div className="mt-6 glass rounded-xl p-4 border border-red-500/20">
                  <p className="text-sm text-slate-400">
                    <span className="text-red-400 font-semibold">The result:</span> Engineers make selections without seeing the full market. 
                    Manufacturers win by controlling the tool, not by having the best product.
                  </p>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Tomorrow */}
          {(view === "both" || view === "tomorrow") && (
            <AnimateIn direction="right">
              <div className="glass rounded-2xl p-8 border border-green-500/10 gradient-border">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Tomorrow</h3>
                    <p className="text-green-400 text-sm">Neutral. Comprehensive. Engineer-first.</p>
                  </div>
                </div>
                <TomorrowFlow />
                <div className="mt-6 glass rounded-xl p-4 border border-green-500/20">
                  <p className="text-sm text-slate-400">
                    <span className="text-green-400 font-semibold">The result:</span> Engineers select the best equipment for the project — 
                    backed by AHRI data and ASHRAE standards. Manufacturers compete on merit.
                  </p>
                </div>
              </div>
            </AnimateIn>
          )}
        </div>

        {/* Highlight stat */}
        <AnimateIn delay={0.3} className="mt-12 text-center">
          <div className="inline-block glass rounded-2xl px-8 py-6 border border-white/10">
            <p className="text-2xl font-bold text-white">
              <span className="gradient-text">$0</span> neutral AI tools exist today
            </p>
            <p className="text-slate-400 mt-2">for the $45B US commercial HVAC equipment market</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
