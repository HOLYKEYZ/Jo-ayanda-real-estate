"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  const stats = [
    { value: "10+", label: "Properties Sold" },
    { value: "5+", label: "Years in Business" },
    { value: "50+", label: "Investments Made" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-20 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 w-full py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-900 dark:text-white">NextPhase</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Real Estate Ltd
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Affordable property development and investment. We get you into property ownership
                through straight deals and solid service.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#properties"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
              >
                View Properties
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                Get in Touch
              </a>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right - hero image (visible on all screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50 aspect-[4/3]">
              <Image
                src="/images/newimage.jpg"
                alt="NextPhase Real Estate property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>
            {/* decorative blobs */}
            <div className="absolute -z-10 -top-8 -right-8 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-36 sm:w-56 h-36 sm:h-56 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
