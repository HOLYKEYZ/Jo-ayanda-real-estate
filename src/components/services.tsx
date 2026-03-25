"use client";

import { motion } from "framer-motion";
import { Home, Key, TrendingUp, Settings } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Property Sales",
      description: "From residential homes to commercial properties, we handle all aspects of property sales including market analysis, pricing strategy, marketing, and negotiation.",
      features: ["Residential Properties", "Commercial Real Estate", "Land Sales", "Investment Properties"],
      icon: <Home className="h-6 w-6 text-white" />,
      color: "from-blue-600 to-blue-400"
    },
    {
      title: "Property Rentals",
      description: "Comprehensive rental services for both landlords and tenants, ensuring smooth transactions and long-term satisfaction.",
      features: ["Tenant Screening", "Lease Management", "Property Marketing", "Rent Collection"],
      icon: <Key className="h-6 w-6 text-white" />,
      color: "from-emerald-600 to-emerald-400"
    },
    {
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments, market trends, and portfolio diversification strategies.",
      features: ["Market Analysis", "Investment Strategy", "Risk Assessment", "Portfolio Planning"],
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "from-amber-500 to-amber-300"
    },
    {
      title: "Property Management",
      description: "Professional property management services to maximize your investment returns and minimize your stress.",
      features: ["Tenant Relations", "Maintenance Coordination", "Financial Reporting", "Legal Compliance"],
      icon: <Settings className="h-6 w-6 text-white" />,
      color: "from-indigo-600 to-indigo-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Comprehensive real estate solutions tailored to your needs. From
              first-time buyers to seasoned investors, we&#39;ve got you covered!
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
            >
              <div className="flex gap-6">
                <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg transform group-hover:-rotate-12 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
