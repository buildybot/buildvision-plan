"use client";

import AnimateIn from "../AnimateIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const streams = [
  {
    id: "advertising",
    icon: "📢",
    title: "Manufacturer Advertising",
    subtitle: "$50–200+ CPM",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    gradient: "from-blue-500/10 to-sky-500/5",
    badge: "Primary Revenue",
    details: [
      "Sponsored placement in AI recommendations",
      "Enhanced product listings (specs, case studies, videos)",
      "Category sponsorship (e.g., Trane owns all chiller searches)",
      "Self-serve ad platform — like Google Ads for HVAC",
    ],
    comparison: {
      them: "OpenEvidence: $70–$1,000+ CPM from pharma",
      us: "BuildVision: $50–$200+ CPM from manufacturers",
    },
    why: "Manufacturers pay to reach engineers at the exact moment of specification — the highest-value moment in the sales cycle.",
  },
  {
    id: "leads",
    icon: "🎯",
    title: "Lead Generation",
    subtitle: "$50–200 per qualified lead",
    color: "text-green-400",
    borderColor: "border-green-500/30",
    gradient: "from-green-500/10 to-emerald-500/5",
    badge: "High Margin",
    details: [
      '"Request a Quote" routing to correct territory rep',
      "Engineer contact info + project details + specs",
      "Only charged when engineer shows high intent",
      "Rep receives full project context instantly",
    ],
    comparison: {
      them: "Trade show lead: $200–500+ (cold, no context)",
      us: "BuildVision lead: $50–200 (hot, actively specifying)",
    },
    why: "Engineer is ACTIVELY selecting equipment right now. This is not a marketing lead — it's a sales-ready opportunity.",
  },
  {
    id: "subscriptions",
    icon: "💼",
    title: "Pro Subscriptions",
    subtitle: "Engineering Firm Teams",
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    gradient: "from-purple-500/10 to-pink-500/5",
    badge: "Recurring Revenue",
    details: [
      "Free tier with manufacturer ads",
      "Pro tier: ad-free experience",
      "Team collaboration & project management",
      "API access for BIM/CAD integration",
      "Custom equipment libraries",
    ],
    comparison: {
      them: "Autodesk Revit: $2,545/yr per seat",
      us: "BuildVision Pro: $X/yr — TBD, market-priced",
    },
    why: "Engineering firms already pay for software. An ad-free, integrated BuildVision pro tool is a natural upgrade path.",
  },
  {
    id: "intelligence",
    icon: "📊",
    title: "Market Intelligence",
    subtitle: "$25K–100K/yr per manufacturer",
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    gradient: "from-pink-500/10 to-rose-500/5",
    badge: "High-Value Data",
    details: [
      '"Chiller searches up 40% in Southeast this quarter"',
      '"Engineers chose Carrier over Trane 60% in hospitals"',
      "Trend analysis for product development teams",
      "Competitive positioning reports",
      "Anonymized and aggregated — privacy-compliant",
    ],
    comparison: {
      them: "Bloomberg Terminal: $25K+/yr for financial data",
      us: "BuildVision Intel: $25K–100K/yr for HVAC market data",
    },
    why: "No manufacturer today can see real-time engineer selection data. BuildVision has it — and they'll pay for it.",
  },
];

export default function RevenueModel() {
  const [expanded, setExpanded] = useState<string | null>("advertising");

  return (
    <section id="revenue" className="py-24 px-6 bg-gradient-to-b from-transparent via-green-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-green-300 mb-6">
            💰 Revenue Model
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Four Revenue Streams.{" "}
            <span className="gradient-green">One Platform.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Diversified, defensible, and all powered by the same network effect.
          </p>
        </AnimateIn>

        <div className="flex flex-col gap-4">
          {streams.map((stream, i) => (
            <AnimateIn key={stream.id} delay={i * 0.1}>
              <motion.div
                className={`glass rounded-2xl border ${stream.borderColor} overflow-hidden cursor-pointer`}
                onClick={() => setExpanded(expanded === stream.id ? null : stream.id)}
              >
                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-5 bg-gradient-to-r ${stream.gradient}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{stream.icon}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-white text-lg">{stream.title}</h3>
                        <span className={`text-xs glass rounded-full px-2.5 py-0.5 ${stream.color} border ${stream.borderColor}`}>
                          {stream.badge}
                        </span>
                      </div>
                      <p className={`text-sm font-semibold ${stream.color}`}>{stream.subtitle}</p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: expanded === stream.id ? 180 : 0 }}
                    className="text-slate-400 text-xl"
                  >
                    ↓
                  </motion.span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expanded === stream.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-4 grid md:grid-cols-3 gap-6">
                        {/* Features */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">What We Sell</p>
                          <ul className="space-y-2">
                            {stream.details.map((d, di) => (
                              <li key={di} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${stream.color.replace('text-', 'bg-')}`} />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Comparison */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">Market Comparison</p>
                          <div className="space-y-3">
                            <div className="glass rounded-xl p-3 border border-white/5">
                              <p className="text-xs text-slate-400">🆚 {stream.comparison.them}</p>
                            </div>
                            <div className="glass rounded-xl p-3 border border-green-500/20 bg-green-500/5">
                              <p className="text-xs text-slate-300">✅ {stream.comparison.us}</p>
                            </div>
                          </div>
                        </div>

                        {/* Why they pay */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">Why Manufacturers Pay</p>
                          <div className="glass rounded-xl p-4 border border-white/5 h-full">
                            <p className="text-sm text-slate-300 italic">"{stream.why}"</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Revenue potential */}
        <AnimateIn delay={0.4} className="mt-12">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white text-center mb-8">Path to $150M ARR (OpenEvidence Benchmark)</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { stream: "Advertising", scenario: "1000 campaigns/mo × $5K avg", value: "$5M/mo", color: "text-blue-400" },
                { stream: "Lead Gen", scenario: "50K leads/yr × $100 avg", value: "$5M/yr", color: "text-green-400" },
                { stream: "Subscriptions", scenario: "5K pro seats × $100/mo", value: "$6M/yr", color: "text-purple-400" },
                { stream: "Intelligence", scenario: "200 manufacturers × $50K/yr", value: "$10M/yr", color: "text-pink-400" },
              ].map((item) => (
                <div key={item.stream} className="text-center">
                  <p className={`text-2xl font-bold ${item.color} mb-1`}>{item.value}</p>
                  <p className="text-white text-sm font-semibold mb-1">{item.stream}</p>
                  <p className="text-slate-500 text-xs">{item.scenario}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
