"use client";

import AnimateIn from "../AnimateIn";
import { motion } from "framer-motion";

const personas = [
  {
    icon: "📐",
    title: "Engineering Firms",
    price: "FREE",
    priceColor: "text-green-400",
    tagline: "Why free? Because manufacturers pay to reach you.",
    taglineColor: "border-green-500/20 bg-green-500/5",
    features: [
      "AI equipment selection & comparison",
      "ASHRAE code compliance checking",
      "Equipment schedule generation",
      "Submittal document search",
      "AHRI certified data access",
    ],
    color: "border-green-500/20",
    gradient: "from-green-500/10 to-emerald-500/10",
    cta: "Start for Free",
    ctaColor: "from-green-500 to-emerald-600",
  },
  {
    icon: "🏗️",
    title: "GCs & Subcontractors",
    price: "FREE",
    priceColor: "text-blue-400",
    tagline: "Why free? Better equipment decisions = better buildings.",
    taglineColor: "border-blue-500/20 bg-blue-500/5",
    features: [
      "Equipment alternatives finder",
      "Value engineering comparisons",
      "Spec compliance verification",
      "Budget estimation tools",
      "Product availability & lead times",
    ],
    color: "border-blue-500/20",
    gradient: "from-blue-500/10 to-sky-500/10",
    cta: "Start for Free",
    ctaColor: "from-blue-500 to-sky-600",
  },
  {
    icon: "🏭",
    title: "Manufacturer Reps",
    price: "PAID",
    priceColor: "text-purple-400",
    tagline: "Know when engineers are selecting your products — before your competitors do.",
    taglineColor: "border-purple-500/20 bg-purple-500/5",
    features: [
      "Territory engineer activity dashboard",
      "Real-time alerts when products compared",
      "Lead capture from 'Request a Quote'",
      "Competitive intelligence reports",
      "Enhanced product listings in AI results",
    ],
    color: "border-purple-500/20",
    gradient: "from-purple-500/10 to-pink-500/10",
    cta: "Get a Demo",
    ctaColor: "from-purple-500 to-pink-600",
    badge: "💰 Revenue Driver",
  },
];

export default function FreeTools() {
  return (
    <section id="free-tools" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-green-300 mb-6">
            🎁 Free for the Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Free for Engineers.{" "}
            <span className="gradient-text">Paid by Manufacturers.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Like Google Search — free for users, monetized by those who want to reach them. 
            Engineers get the best tool in the industry at no cost.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, i) => (
            <AnimateIn key={persona.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`glass rounded-2xl overflow-hidden border ${persona.color} flex flex-col h-full`}
              >
                {/* Card header */}
                <div className={`p-6 bg-gradient-to-br ${persona.gradient}`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{persona.icon}</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-2xl font-extrabold ${persona.priceColor}`}>{persona.price}</span>
                      {persona.badge && (
                        <span className="text-xs glass rounded-full px-2 py-0.5 text-yellow-300 border border-yellow-500/20">{persona.badge}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{persona.title}</h3>
                </div>

                {/* Features */}
                <div className="p-6 flex-1">
                  <ul className="space-y-3">
                    {persona.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          persona.price === "FREE" ? "bg-green-400" : "bg-purple-400"
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tagline */}
                <div className={`mx-6 mb-4 rounded-xl p-3 border text-xs italic text-slate-400 ${persona.taglineColor}`}>
                  "{persona.tagline}"
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${persona.ctaColor} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}>
                    {persona.cta}
                  </button>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom callout */}
        <AnimateIn delay={0.4} className="mt-12 text-center">
          <div className="glass rounded-2xl px-8 py-8 border border-white/10 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-green-400 mb-2">90K+</p>
                <p className="text-slate-400 text-sm">MEP engineers to reach for free</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text mb-2">$0</p>
                <p className="text-slate-400 text-sm">Cost for engineers to access</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400 mb-2">$200+</p>
                <p className="text-slate-400 text-sm">CPM that manufacturers pay</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
