"use client";

import AnimateIn from "../AnimateIn";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: "🏛️",
    title: "AHRI Certified Data",
    desc: "Licensed, comprehensive performance data for every HVAC product in North America. No competitor has this for an AI platform.",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    gradient: "from-blue-500/10",
    tag: "Unique Data Moat",
  },
  {
    icon: "📐",
    title: "ASHRAE Standards",
    desc: "Code compliance baked into every recommendation. Engineers trust ASHRAE. We make it AI-accessible.",
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    gradient: "from-purple-500/10",
    tag: "Trust & Authority",
  },
  {
    icon: "🔍",
    title: "Atlas Content Engine",
    desc: "Years of manufacturer catalog indexing. Rich product knowledge that takes years to build and is nearly impossible to replicate.",
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    gradient: "from-pink-500/10",
    tag: "Execution Advantage",
  },
];

const networkEffects = [
  {
    arrow: "Engineers →",
    effect: "Selection data",
    result: "Better recommendations",
    color: "text-blue-400",
  },
  {
    arrow: "Manufacturers →",
    effect: "Product data",
    result: "Better comparisons",
    color: "text-green-400",
  },
  {
    arrow: "Data →",
    effect: "AI improvement",
    result: "More engineers join",
    color: "text-purple-400",
  },
];

export default function CompetitiveMoat() {
  return (
    <section id="moat" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            🏰 Competitive Moat
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Three Pillars Nobody{" "}
            <span className="gradient-text">Can Copy</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Our defensibility comes from data licensing, industry trust, and network effects — not just technology.
          </p>
        </AnimateIn>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, i) => (
            <AnimateIn key={pillar.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`glass rounded-2xl p-8 border ${pillar.borderColor} text-center`}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${pillar.gradient} to-transparent border ${pillar.borderColor} flex items-center justify-center text-3xl mb-6`}>
                  {pillar.icon}
                </div>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 glass border ${pillar.borderColor} ${pillar.color} mb-4 inline-block`}>
                  {pillar.tag}
                </span>
                <h3 className="font-bold text-white text-xl mb-4">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Network effects */}
        <AnimateIn delay={0.4}>
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="font-bold text-white text-xl text-center mb-8">
              ♻️ Network Effects — The Flywheel
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {networkEffects.map((effect, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <p className={`text-lg font-bold ${effect.color} mb-2`}>{effect.arrow}</p>
                  <div className="text-3xl mb-2">↓</div>
                  <div className="glass rounded-xl px-4 py-3 border border-white/10">
                    <p className="text-white text-sm font-semibold">{effect.effect}</p>
                    <p className="text-slate-400 text-xs mt-1">→ {effect.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flywheel diagram */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-5 border border-blue-500/20 bg-blue-500/5">
                <p className="text-blue-300 font-semibold text-sm mb-2">Engineer Flywheel</p>
                <p className="text-slate-400 text-sm">
                  More engineers → more selection data → better AI recommendations → more engineers trust us → more engineers join
                </p>
              </div>
              <div className="glass rounded-xl p-5 border border-green-500/20 bg-green-500/5">
                <p className="text-green-300 font-semibold text-sm mb-2">Manufacturer Flywheel</p>
                <p className="text-slate-400 text-sm">
                  More manufacturers paying → more product data → better comparisons for engineers → more engineers → more manufacturers pay
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Defensibility score */}
        <AnimateIn delay={0.5} className="mt-8">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold text-white mb-4 text-center">Why We're Defensible Against Each Threat</h3>
            <div className="space-y-3">
              {[
                { threat: "OpenAI builds HVAC AI", defense: "No AHRI license. No manufacturer relationships. No industry trust.", icon: "🛡️" },
                { threat: "Trane builds 'neutral' tool", defense: "Engineers won't trust it. Can't be neutral when you sell products.", icon: "🚫" },
                { threat: "Startup copies us", defense: "AHRI license takes 6+ months. Content engine took years. Network effect is compounding.", icon: "⏱️" },
                { threat: "ASHRAE builds own tool", defense: "We license from them. They benefit. This is a partnership, not a threat.", icon: "🤝" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass rounded-xl p-4 border border-white/5">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-red-300 text-sm font-semibold">{item.threat}</p>
                    <p className="text-slate-400 text-sm">→ {item.defense}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
