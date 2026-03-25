"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { galleryItems } from "@/data/properties";
import { MapPin, Building, Settings2 } from "lucide-react";

export function PropertyGallery() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Property Gallery
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              A quick look at more of our exclusive properties and commercial listings.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                        {idx === 0 && <Building className="w-3.5 h-3.5" />}
                        {idx === 1 && <Settings2 className="w-3.5 h-3.5" />}
                        {idx === 2 && <MapPin className="w-3.5 h-3.5" />}
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
