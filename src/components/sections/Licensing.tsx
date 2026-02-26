"use client";

import AnimateIn from "../AnimateIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const licenses = [
  {
    id: "ahri",
    icon: "🏛️",
    title: "AHRI Data License",
    status: "Application Ready",
    statusColor: "text-yellow-400",
    statusBg: "bg-yellow-500/10 border-yellow-500/20",
    summary: "Certified performance data for every HVAC product in North America",
    color: "border-blue-500/30",
    details: [
      { label: "What", value: "Certified performance data for every HVAC product in North America" },
      { label: "How", value: "AHRI Data Subscription Program → API access" },
      { label: "Cost", value: "~$5–20K/yr per package (Unitary, Cooling, Heating)" },
      { label: "Terms", value: "Annual license, data refresh, attribution required" },
      { label: "Status", value: "Application ready to submit" },
    ],
    insight: "AHRI data is the foundation. No competitor has licensed it for an AI platform. This is our unfair advantage.",
  },
  {
    id: "ashrae",
    icon: "📐",
    title: "ASHRAE Standards License",
    status: "In Discussions",
    statusColor: "text-purple-400",
    statusBg: "bg-purple-500/10 border-purple-500/20",
    summary: "Code compliance checking for 90.1, 62.1, Standard 55",
    color: "border-purple-500/30",
    details: [
      { label: "What", value: "Code compliance checking (90.1, 62.1, Standard 55)" },
      { label: "How", value: "Content licensing agreement with ASHRAE" },
      { label: "Cost", value: "Negotiable — likely $10–50K/yr" },
      { label: "Model", value: "Like OpenEvidence/NEJM — ASHRAE cited in every recommendation" },
      { label: "Value to ASHRAE", value: "New digital revenue + keeps standards central to AI workflows" },
    ],
    insight: "ASHRAE wins because every BuildVision recommendation cites their standards. We make ASHRAE the center of AI-driven construction.",
  },
  {
    id: "manufacturers",
    icon: "🏭",
    title: "Manufacturer Advertising Contracts",
    status: "Seeding Now",
    statusColor: "text-green-400",
    statusBg: "bg-green-500/10 border-green-500/20",
    summary: "Tiered contracts from free listings to $1M/yr enterprise partnerships",
    color: "border-green-500/30",
    details: [
      { label: "Basic (Free)", value: "AHRI data + public catalog listing (we index anyway)" },
      { label: "Enhanced ($25–50K/yr)", value: "Full performance curves, application guides, manufacturer data feed" },
      { label: "Premium ($100–250K/yr)", value: "Enhanced + sponsored placement + lead generation" },
      { label: "Enterprise ($250K–1M/yr)", value: "Premium + API integration + co-branded tool + exclusivity options" },
      { label: "Contract Terms", value: "Annual, quarterly performance reviews, self-serve ad platform" },
    ],
    insight: "We already have relationships with Trane, Carrier, Daikin, Multistack, Price Industries, Greenheck. This is our seed network.",
  },
];

const tiers = [
  { name: "Basic", price: "Free", color: "text-slate-300", features: ["AHRI listing", "Public catalog data"] },
  { name: "Enhanced", price: "$25–50K/yr", color: "text-blue-400", features: ["Performance curves", "App guides", "Data feed"] },
  { name: "Premium", price: "$100–250K/yr", color: "text-purple-400", features: ["Sponsored placement", "Lead gen", "+ Enhanced"] },
  { name: "Enterprise", price: "$250K–1M/yr", color: "text-pink-400", features: ["API integration", "Co-branded tool", "Exclusivity"] },
];

export default function Licensing() {
  const [active, setActive] = useState<string | null>("ahri");

  return (
    <section id="licensing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            📋 Licensing Structure
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Built on{" "}
            <span className="gradient-text">Licensed Data</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Three critical partnerships that make BuildVision defensible and trusted.
          </p>
        </AnimateIn>

        {/* License cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {licenses.map((license, i) => (
            <AnimateIn key={license.id} delay={i * 0.1}>
              <motion.div
                onClick={() => setActive(active === license.id ? null : license.id)}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-6 border cursor-pointer transition-all duration-200 ${license.color} ${active === license.id ? 'ring-1 ring-white/20' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{license.icon}</span>
                  <span className={`text-xs rounded-full px-2.5 py-1 border ${license.statusBg} ${license.statusColor}`}>
                    {license.status}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{license.title}</h3>
                <p className="text-slate-400 text-sm">{license.summary}</p>
                <p className="text-blue-400 text-xs mt-3">Click to expand details →</p>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Expanded detail */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {licenses.filter(l => l.id === active).map(license => (
                <AnimateIn key={license.id}>
                  <div className={`glass rounded-2xl p-8 border ${license.color} mb-12`}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-white text-xl mb-5 flex items-center gap-3">
                          {license.icon} {license.title}
                        </h3>
                        <div className="space-y-3">
                          {license.details.map((detail, i) => (
                            <div key={i} className="flex gap-4">
                              <span className="text-slate-500 text-sm font-semibold min-w-28">{detail.label}:</span>
                              <span className="text-slate-300 text-sm flex-1">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="glass rounded-xl p-6 border border-white/10 h-full flex flex-col justify-center">
                          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">Strategic Insight</p>
                          <p className="text-slate-300 text-base italic leading-relaxed">"{license.insight}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manufacturer tiers */}
        <AnimateIn delay={0.3}>
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="font-bold text-white text-xl mb-6 text-center">Manufacturer Contract Tiers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center border border-white/5 hover:border-white/15 transition-colors"
                >
                  <p className="text-white font-bold mb-1">{tier.name}</p>
                  <p className={`text-sm font-semibold ${tier.color} mb-3`}>{tier.price}</p>
                  <ul className="space-y-1">
                    {tier.features.map(f => (
                      <li key={f} className="text-xs text-slate-400">{f}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
