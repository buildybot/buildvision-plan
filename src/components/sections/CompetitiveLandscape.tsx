"use client";

import AnimateIn from "../AnimateIn";
import { motion } from "framer-motion";

const competitors = [
  {
    name: "Trane Trace 3D+",
    category: "Manufacturer Tool",
    funding: "Trane Technologies ($21B revenue)",
    whatTheyDo: "HVAC load calc & selection tool",
    weakness: "Only shows Trane products — biased by design",
    whyWin: "We're neutral across all 300+ manufacturers",
    threat: "low",
    icon: "🏭",
  },
  {
    name: "Carrier HAP",
    category: "Manufacturer Tool",
    funding: "Carrier ($22B revenue)",
    whatTheyDo: "Hourly analysis program for HVAC",
    weakness: "Single-manufacturer, legacy software from 1980s",
    whyWin: "Same as Trane — manufacturer bias kills trust",
    threat: "low",
    icon: "🏭",
  },
  {
    name: "Leo AI",
    category: "AI Startup",
    funding: "$9.7M raised",
    whatTheyDo: "General mechanical engineering AI assistant",
    weakness: "No AHRI data license, not HVAC-specific",
    whyWin: "HVAC-specific + AHRI certified data = depth they can't match",
    threat: "medium",
    icon: "🤖",
  },
  {
    name: "AECOM Internal AI",
    category: "Internal Tool",
    funding: "$390M raised (AECOM)",
    whatTheyDo: "Internal tool for AECOM engineers only",
    weakness: "Closed platform — not available to the industry",
    whyWin: "We're a platform for ALL engineering firms, not one company",
    threat: "low",
    icon: "🏢",
  },
  {
    name: "BrainBox AI",
    category: "Building Ops AI",
    funding: "$50M+ raised",
    whatTheyDo: "AI optimization for building operations (post-install)",
    weakness: "Post-install optimization, not equipment selection",
    whyWin: "We own pre-install. Completely different part of the value chain.",
    threat: "low",
    icon: "🧠",
  },
  {
    name: "Trimble/Autodesk",
    category: "Design Software",
    funding: "Multi-billion public companies",
    whatTheyDo: "BIM and design software for engineers",
    weakness: "No equipment selection or manufacturer comparison",
    whyWin: "We can integrate WITH them as an API — not compete directly",
    threat: "medium",
    icon: "✏️",
  },
];

const threatColors = {
  low: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", label: "Low Threat" },
  medium: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", label: "Medium Threat" },
  high: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", label: "High Threat" },
};

export default function CompetitiveLandscape() {
  return (
    <section id="competitive" className="py-24 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
            ⚔️ Competitive Landscape
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            The Competition Is{" "}
            <span className="gradient-text">Not the Problem</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Nobody is building what we're building. The closest competitors have fundamental structural weaknesses we don't share.
          </p>
        </AnimateIn>

        {/* Desktop table */}
        <AnimateIn>
          <div className="glass rounded-2xl overflow-hidden border border-white/10 hidden md:block mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/2">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Competitor</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">What They Do</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Their Weakness</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Why We Win</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Threat Level</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, i) => {
                  const threat = threatColors[comp.threat as keyof typeof threatColors];
                  return (
                    <motion.tr
                      key={comp.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{comp.icon}</span>
                          <div>
                            <p className="text-white text-sm font-semibold">{comp.name}</p>
                            <p className="text-slate-500 text-xs">{comp.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm max-w-xs">{comp.whatTheyDo}</td>
                      <td className="px-6 py-4 text-red-400 text-sm max-w-xs">{comp.weakness}</td>
                      <td className="px-6 py-4 text-green-400 text-sm max-w-xs font-medium">{comp.whyWin}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs rounded-full px-3 py-1 ${threat.bg} ${threat.border} border ${threat.text}`}>
                          {threat.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 mb-12">
            {competitors.map((comp, i) => {
              const threat = threatColors[comp.threat as keyof typeof threatColors];
              return (
                <div key={comp.name} className="glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{comp.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{comp.name}</p>
                        <p className="text-slate-500 text-xs">{comp.category}</p>
                      </div>
                    </div>
                    <span className={`text-xs rounded-full px-2.5 py-1 ${threat.bg} ${threat.border} border ${threat.text}`}>
                      {threat.label}
                    </span>
                  </div>
                  <p className="text-red-400 text-sm mb-1">❌ {comp.weakness}</p>
                  <p className="text-green-400 text-sm">✅ {comp.whyWin}</p>
                </div>
              );
            })}
          </div>
        </AnimateIn>

        {/* Summary */}
        <AnimateIn delay={0.3} className="text-center">
          <div className="glass rounded-2xl px-8 py-6 border border-white/10 max-w-3xl mx-auto">
            <p className="text-xl font-bold text-white mb-3">
              No one is building the{" "}
              <span className="gradient-text">neutral HVAC intelligence platform</span>
            </p>
            <p className="text-slate-400">
              Every competitor either has manufacturer bias, lacks AHRI data, serves only one company, 
              or operates post-install. BuildVision's white space is real — and it's massive.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
