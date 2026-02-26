"use client";

import AnimateIn from "../AnimateIn";
import { motion } from "framer-motion";
import { useState } from "react";

const phases = [
  {
    phase: "Phase 1",
    timing: "Now",
    title: "Foundation",
    icon: "🏗️",
    color: "text-blue-400",
    borderColor: "border-blue-500/40",
    bg: "bg-blue-500/10",
    status: "active",
    statusLabel: "In Progress",
    items: [
      "License AHRI certified data (application ready)",
      "Build free AI selection tool (MVP)",
      "Seed with existing manufacturer relationships",
      "Trane, Carrier, Daikin, Multistack, Price Industries, Greenheck",
      "Deploy Atlas Content Engine catalog data",
    ],
    metric: "Goal: AHRI license signed, MVP live",
  },
  {
    phase: "Phase 2",
    timing: "Q2 2026",
    title: "Engineer Adoption",
    icon: "📈",
    color: "text-purple-400",
    borderColor: "border-purple-500/40",
    bg: "bg-purple-500/10",
    status: "upcoming",
    statusLabel: "Next Up",
    items: [
      "Launch at ASHRAE Annual Conference",
      "Engineering firm partnerships (5–10 firms)",
      "Free CEU credit integration for engineers",
      "ASHRAE standards licensing agreement",
      "Marketing: AEE, ACCA, SMACNA channels",
    ],
    metric: "Goal: 1,000 active engineers",
  },
  {
    phase: "Phase 3",
    timing: "Q3 2026",
    title: "Manufacturer Monetization",
    icon: "💰",
    color: "text-green-400",
    borderColor: "border-green-500/40",
    bg: "bg-green-500/10",
    status: "planned",
    statusLabel: "Planned",
    items: [
      "Launch self-serve manufacturer ad platform",
      "Activate lead routing for 10+ manufacturers",
      "Introduce Enhanced and Premium tiers",
      "First $1M ARR milestone",
      "Hire sales team for manufacturer outreach",
    ],
    metric: "Goal: $1M ARR, 10 paying manufacturers",
  },
  {
    phase: "Phase 4",
    timing: "Q4 2026+",
    title: "Scale",
    icon: "🚀",
    color: "text-pink-400",
    borderColor: "border-pink-500/40",
    bg: "bg-pink-500/10",
    status: "future",
    statusLabel: "Future",
    items: [
      "Market intelligence product launch",
      "International expansion (Canada, EU)",
      "Adjacent verticals: plumbing, electrical, fire protection",
      "API platform for BIM/CAD integration",
      "Series A fundraise",
    ],
    metric: "Goal: $10M ARR, international presence",
  },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section id="roadmap" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-green-300 mb-6">
            🗓️ Go-To-Market Roadmap
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Four Phases to{" "}
            <span className="gradient-text">Market Leadership</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We're already in Phase 1. The path to $150M ARR runs through four clear milestones.
          </p>
        </AnimateIn>

        {/* Timeline desktop */}
        <div className="hidden md:block mb-12">
          <div className="relative">
            {/* Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 via-green-500/50 to-pink-500/50" />
            
            <div className="grid grid-cols-4 gap-4">
              {phases.map((phase, i) => (
                <AnimateIn key={phase.phase} delay={i * 0.12}>
                  <motion.div
                    onClick={() => setActivePhase(i)}
                    whileHover={{ y: -4 }}
                    className="cursor-pointer"
                  >
                    {/* Timeline dot */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl ${phase.bg} border ${phase.borderColor} flex items-center justify-center text-2xl ${activePhase === i ? 'ring-2 ring-white/30' : ''} transition-all`}>
                        {phase.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-semibold ${phase.color} mb-1`}>{phase.phase} · {phase.timing}</p>
                      <p className="text-white font-bold">{phase.title}</p>
                      <p className={`text-xs mt-1 px-2 py-0.5 rounded-full glass border ${phase.borderColor} ${phase.color} inline-block`}>
                        {phase.statusLabel}
                      </p>
                    </div>
                  </motion.div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>

        {/* Phase detail */}
        <AnimateIn delay={0.2}>
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`glass rounded-2xl p-8 border ${phases[activePhase].borderColor} mb-8`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{phases[activePhase].icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{phases[activePhase].phase}: {phases[activePhase].title}</h3>
                    <p className={`${phases[activePhase].color} text-sm font-semibold`}>{phases[activePhase].timing}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {phases[activePhase].items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phases[activePhase].color.replace('text-', 'bg-')}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <div className={`glass rounded-xl p-6 border ${phases[activePhase].borderColor} ${phases[activePhase].bg}`}>
                  <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">Phase Goal</p>
                  <p className={`text-lg font-bold ${phases[activePhase].color}`}>{phases[activePhase].metric}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimateIn>

        {/* Mobile phase selector */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
          {phases.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${
                activePhase === i
                  ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold`
                  : "glass text-slate-400 border border-white/10"
              }`}
            >
              {phase.phase}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
