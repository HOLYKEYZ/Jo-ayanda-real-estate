"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  const stats = [
    { value: "10+", label: "Properties Sold" },
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Investment Properties" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Premium Real Estate Solutions
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-900 dark:text-white">NextPhase</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Real Estate Ltd
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Affordable property development and investment. We get you into property ownership
                through straight deals and solid service.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#properties"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                View Properties
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="text-center p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right - hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <Image
                src="/images/newimage.jpg"
                alt="Modern home model held by hand"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            </div>
            {/* decorative blob */}
            <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-56 h-56 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
