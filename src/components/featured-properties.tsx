"use client";

import { motion } from "framer-motion";
import { PropertyCard } from "./property-card";
import { type Property } from "@/data/properties";

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  // Use first 3 properties as featured
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Featured Properties
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Discover our handpicked selection of premium properties. Let&#39;s build
              your dream home together now!
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PropertyCard property={property} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
