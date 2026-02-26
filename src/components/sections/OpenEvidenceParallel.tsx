"use client";

import AnimateIn from "../AnimateIn";
import CountUp from "../CountUp";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = [
  {
    key: "medicine",
    label: "💊 Medicine",
    title: "OpenEvidence: $12B Company",
    color: "blue",
    items: [
      { icon: "👩‍⚕️", label: "Doctors", desc: "Need unbiased drug information" },
      { icon: "🤖", label: "OpenEvidence AI", desc: "Neutral clinical data platform" },
      { icon: "📰", label: "NEJM & Journals", desc: "Authoritative data sources" },
      { icon: "💊", label: "Pharma pays", desc: "For access to prescribers" },
    ],
    result: "$150M+ ARR and growing",
    resultColor: "text-blue-400",
    valuation: "$12B valuation",
    insight: "Pharma companies pay $70–$1,000+ CPM to reach doctors at the point of prescribing.",
  },
  {
    key: "construction",
    label: "🏗️ Construction",
    title: "BuildVision: Massive Opportunity",
    color: "purple",
    items: [
      { icon: "👷", label: "MEP Engineers", desc: "Need unbiased equipment data" },
      { icon: "🤖", label: "BuildVision AI", desc: "Neutral equipment selection" },
      { icon: "📐", label: "AHRI & ASHRAE", desc: "Certified standards & data" },
      { icon: "🏭", label: "Manufacturers pay", desc: "For access to engineers" },
    ],
    result: "$45B market, $0 neutral tools today",
    resultColor: "text-green-400",
    valuation: "Massive white space",
    insight: "Manufacturers pay to reach engineers at the exact moment of equipment specification.",
  },
];

const stats = [
  { prefix: "$", value: 150, suffix: "M", label: "OpenEvidence ARR", color: "text-blue-400" },
  { prefix: "$", value: 45, suffix: "B", label: "US HVAC Market", color: "gradient-text" },
  { prefix: "", value: 90, suffix: "K+", label: "MEP Engineers", color: "text-purple-400" },
  { prefix: "", value: 300, suffix: "+", label: "AHRI Members", color: "text-pink-400" },
];

export default function OpenEvidenceParallel() {
  const [active, setActive] = useState("medicine");
  const activeTab = tabs.find(t => t.key === active)!;

  return (
    <section id="parallel" className="py-24 px-6 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
            💡 The Parallel
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            OpenEvidence Did It for{" "}
            <span className="text-blue-400">Medicine</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A neutral AI platform where pharma pays to reach doctors. 
            We're building the exact same model for construction.
          </p>
        </AnimateIn>

        {/* Tab toggle */}
        <AnimateIn delay={0.2} className="flex justify-center mb-10">
          <div className="glass rounded-xl p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active === tab.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Tab content */}
        <AnimateIn delay={0.1}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeTab.title}</h3>
              <p className={`text-lg ${activeTab.resultColor} font-semibold`}>{activeTab.result}</p>
            </div>

            {/* Flow */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              {activeTab.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-3xl mb-2 mx-auto border border-white/10">
                      {item.icon}
                    </div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-slate-400 text-xs max-w-24">{item.desc}</p>
                  </div>
                  {i < activeTab.items.length - 1 && (
                    <div className="text-slate-600 text-xl font-light hidden sm:block">+</div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-4">
                <div className="text-slate-400 text-xl">=</div>
                <div className="glass rounded-2xl px-6 py-4 border border-white/20 text-center">
                  <p className="text-white font-bold text-lg">{activeTab.valuation}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-white/5 max-w-2xl mx-auto text-center">
              <p className="text-slate-300 text-sm italic">"{activeTab.insight}"</p>
            </div>
          </motion.div>
        </AnimateIn>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 text-center glass-hover cursor-default">
                <div className={`text-4xl font-extrabold mb-2 ${stat.color}`}>
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
