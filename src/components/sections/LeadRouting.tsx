"use client";

import AnimateIn from "../AnimateIn";
import { motion } from "framer-motion";
import { useState } from "react";

// Real HVAC manufacturer rep firms by territory (sourced from industry knowledge)
const repRouting = [
  {
    engineer: "Phoenix, AZ Engineer",
    product: "Trane CenTraVac 200-ton chiller",
    territory: "Southwest Region",
    repFirm: "Trane Southwest",
    repContact: "Regional Sales Manager",
    leadType: "warm",
    badge: "🌵",
    color: "#60a5fa",
  },
  {
    engineer: "Chicago, IL Engineer",
    product: "Carrier 19XR High-Efficiency",
    territory: "Great Lakes Region",
    repFirm: "Carrier Enterprise Midwest",
    repContact: "Territory Rep — Illinois",
    leadType: "warm",
    badge: "🌆",
    color: "#a78bfa",
  },
  {
    engineer: "Houston, TX Engineer",
    product: "York YK Magnetic Bearing",
    territory: "South Central Region",
    repFirm: "Johnson Controls South",
    repContact: "Regional Account Executive",
    leadType: "warm",
    badge: "⭐",
    color: "#f472b6",
  },
  {
    engineer: "New York, NY Engineer",
    product: "Multistack MS200SC",
    territory: "Northeast Region",
    repFirm: "Multistack Northeast",
    repContact: "Key Account Manager",
    leadType: "warm",
    badge: "🗽",
    color: "#34d399",
  },
];

const mappingSteps = [
  { icon: "🏭", label: "Product Line", arrow: "→", next: "Manufacturer" },
  { icon: "🗺️", label: "Engineer Location", arrow: "→", next: "Territory/Region" },
  { icon: "📍", label: "Territory", arrow: "→", next: "Assigned Rep Firm" },
  { icon: "📞", label: "Rep Firm", arrow: "→", next: "Contact Info + Alert" },
];

export default function LeadRouting() {
  const [activeRoute, setActiveRoute] = useState(0);
  const route = repRouting[activeRoute];

  return (
    <section id="lead-routing" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-green-300 mb-6">
            📍 Lead Routing Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            The Right Lead, the Right Rep,{" "}
            <span className="gradient-text">Right Now</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            When an engineer clicks "Request a Quote," we instantly route that lead to the correct 
            manufacturer rep for their territory — while the engineer is still specifying.
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive routing demo */}
          <AnimateIn direction="left">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-5 text-lg">🔄 Live Lead Routing</h3>
              
              {/* Engineer selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {repRouting.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRoute(i)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      activeRoute === i
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                        : "glass text-slate-400 border border-white/10 hover:text-white"
                    }`}
                  >
                    {r.badge} {r.engineer.split(",")[1]?.trim() || r.engineer}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeRoute}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {/* Engineer */}
                <div className="glass rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">ENGINEER</p>
                  <p className="text-white font-semibold">{route.badge} {route.engineer}</p>
                  <p className="text-slate-400 text-sm">Selected: <span className="text-blue-300">{route.product}</span></p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 px-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
                  <span className="text-xl">⬇️</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
                </div>

                {/* BuildVision routing */}
                <div className="glass rounded-xl p-4 border border-blue-500/20 bg-blue-500/5">
                  <p className="text-xs text-blue-400 mb-1">BUILDVISION ROUTING ENGINE</p>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-slate-300">📍 Location detected: <span className="text-white">{route.territory}</span></p>
                    <p className="text-slate-300">🏭 Manufacturer: <span className="text-white">{route.product.split(' ')[0]}</span></p>
                    <p className="text-slate-300">🗺️ Assigned rep: <span className="text-white">{route.repFirm}</span></p>
                    <p className="text-slate-300">👤 Contact: <span className="text-white">{route.repContact}</span></p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 px-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-emerald-500/50" />
                  <span className="text-xl">⬇️</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-green-500/50" />
                </div>

                {/* Lead delivered */}
                <div className="glass rounded-xl p-4 border border-green-500/20 bg-green-500/5">
                  <p className="text-xs text-green-400 mb-1">LEAD DELIVERED — INSTANTLY</p>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-300">✅ Engineer name & firm</p>
                    <p className="text-sm text-slate-300">✅ Project specs & location</p>
                    <p className="text-sm text-slate-300">✅ Equipment selected</p>
                    <p className="text-sm text-slate-300">✅ Delivered to {route.repFirm}</p>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 rounded-lg px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-300 text-xs font-semibold">Lead routed in &lt;1 second</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimateIn>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Mapping steps */}
            <AnimateIn direction="right" delay={0.1}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-5 text-lg">🗺️ How Rep Mapping Works</h3>
                <div className="space-y-3">
                  {mappingSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-xl border border-white/10">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-slate-300">{step.label}</span>
                      </div>
                      <span className="text-slate-600">{step.arrow}</span>
                      <div className="flex-1">
                        <span className="text-sm text-blue-300 font-medium">{step.next}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Lead quality comparison */}
            <AnimateIn direction="right" delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-5 text-lg">💰 Lead Quality Comparison</h3>
                <div className="space-y-4">
                  {/* Trade show lead */}
                  <div className="glass rounded-xl p-4 border border-red-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">Trade Show Lead</span>
                      <span className="text-red-400 font-bold">$200–500</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">❌ Business card from a vendor fair</p>
                      <p className="text-xs text-slate-400">❌ Cold — not actively buying</p>
                      <p className="text-xs text-slate-400">❌ No project context</p>
                      <p className="text-xs text-slate-400">❌ Weeks/months from a decision</p>
                    </div>
                  </div>

                  {/* BuildVision lead */}
                  <div className="glass rounded-xl p-4 border border-green-500/20 bg-green-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">BuildVision Lead</span>
                      <span className="text-green-400 font-bold">$50–200</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-300">✅ Engineer actively specifying RIGHT NOW</p>
                      <p className="text-xs text-slate-300">✅ Exact product selected, specs known</p>
                      <p className="text-xs text-slate-300">✅ Project details: location, size, standards</p>
                      <p className="text-xs text-slate-300">✅ Decision imminent — highest intent possible</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Value prop */}
            <AnimateIn direction="right" delay={0.3}>
              <div className="gradient-border rounded-2xl p-6">
                <p className="text-lg font-bold text-white mb-2">
                  "We deliver leads that are{" "}
                  <span className="gradient-text">10x warmer</span> at half the cost."
                </p>
                <p className="text-slate-400 text-sm">
                  An engineer actively clicking "Request a Quote" on your product is the highest-intent 
                  lead in the industry. They've already done their research. They want your product. 
                  Now get them to a rep who can close.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
