"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { type Property } from "@/data/properties";
import { PropertyCard } from "./property-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function PropertyListings({ initialProperties }: { initialProperties: Property[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const handleSearch = () => {
    const filtered = initialProperties.filter((property) => {
      // search term
      const searchMatch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // type
      const typeMatch = propertyType === "" || property.type === propertyType;
      
      // status
      const statusMatch = propertyStatus === "" || property.status === propertyStatus;
      
      // price
      let priceMatch = true;
      if (priceRange) {
        // Simple numeric extraction for basic filtering
        const priceNum = parseInt(property.price.replace(/[^\d]/g, ""));
        if (!isNaN(priceNum)) {
          if (priceRange === "0-50") priceMatch = priceNum < 50000;
          if (priceRange === "50-100") priceMatch = priceNum >= 50000 && priceNum <= 100000;
          if (priceRange === "100-200") priceMatch = priceNum > 100000 && priceNum <= 200000;
          if (priceRange === "200+") priceMatch = priceNum > 200000;
        } else if (property.price.toLowerCase().includes("contact")) {
            // Include contact for price in all ranges or specific ones? Let's just include them if no specific range matches, or exclude them.
            priceMatch = true;
        }
      }

      return searchMatch && typeMatch && statusMatch && priceMatch;
    });

    setProperties(filtered);
  };

  return (
    <section id="properties" className="py-24 bg-slate-50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              All Properties
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Browse everything we have on offer. Use the filters to narrow things down.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search location, keywords..." 
              className="pl-10 h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <select 
              className="flex h-12 w-full rounded-md border border-input bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
            <select 
              className="flex h-12 w-full rounded-md border border-input bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              value={propertyStatus}
              onChange={(e) => setPropertyStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="lease">For Lease</option>
            </select>
            <select 
              className="flex h-12 w-full rounded-md border border-input bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-50">Under ₦50M</option>
              <option value="50-100">₦50M - ₦100M</option>
              <option value="100-200">₦100M - ₦200M</option>
              <option value="200+">Above ₦200M</option>
            </select>
            <Button onClick={handleSearch} className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Search
            </Button>
          </div>
        </div>

        {/* Grid */}
        {properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
              >
                <PropertyCard property={property} className="h-full" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No properties found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search criteria and filters.</p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearchTerm("");
                setPropertyType("");
                setPropertyStatus("");
                setPriceRange("");
                setProperties(initialProperties);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
