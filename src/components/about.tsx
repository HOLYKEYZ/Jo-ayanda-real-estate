"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/data/properties";
import { Target, Eye, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              About NEXTPHASE
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              At NextPhase limited, we believe everyone deserves a place they can proudly call their own. 
              We are not just a real estate company—we are your partner on the path to becoming a landlord, 
              building wealth through property ownership. With a strong foundation built on trust, 
              professionalism, and innovation, we continue to open doors of opportunity for individuals, 
              families, and investors. <span className="font-medium text-slate-800 dark:text-slate-300">(CAC reg.no: {companyInfo.cacRegNo})</span>
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Our Mission
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {companyInfo.mission}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                Our Vision
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {companyInfo.vision}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                Why Choose Us
              </h3>
              <ul className="space-y-3">
                {companyInfo.whyChooseUs.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 lg:text-lg">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mt-0.5">
                      ✓
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white relative z-10">
              Our Team
            </h3>

            <div className="space-y-10 relative z-10">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">
                  CEO & Lead Realtor
                </h4>
                <div className="mx-auto max-w-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {companyInfo.team.ceo}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">
                  Principal Partners
                </h4>
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  {companyInfo.team.partners.map((partner) => (
                    <div 
                      key={partner}
                      className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {partner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
