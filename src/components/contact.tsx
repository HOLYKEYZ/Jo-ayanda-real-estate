"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Building, MessageCircle } from "lucide-react";
import { companyInfo } from "@/data/properties";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${companyInfo.email}?subject=${encodeURIComponent(
      formData.inquiryType || "General Inquiry"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Contact us today to explore our exclusive listings and make your
              property dream a reality!
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Phone Numbers</h3>
                <div className="flex flex-col gap-1 text-slate-600 dark:text-slate-400">
                  {companyInfo.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Email</h3>
                <a href={`mailto:${companyInfo.email}`} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all">
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Head Office</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {companyInfo.headOffice}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Branch Office</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {companyInfo.branchOffice}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={companyInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold transition-colors shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <Input id="name" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="bg-slate-50 dark:bg-slate-950/50 h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input id="email" name="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} className="bg-slate-50 dark:bg-slate-950/50 h-12" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+234 800 000 0000" value={formData.phone} onChange={handleChange} className="bg-slate-50 dark:bg-slate-950/50 h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="inquiryType" className="text-sm font-medium text-slate-700 dark:text-slate-300">Inquiry Type</label>
                  <select 
                    id="inquiryType" 
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="flex h-12 w-full rounded-md border border-input bg-slate-50 dark:bg-slate-950/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="Property Viewing">Property Viewing</option>
                    <option value="Property Purchase">Property Purchase</option>
                    <option value="Property Rental">Property Rental</option>
                    <option value="Investment Advice">Investment Advice</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <Textarea id="message" name="message" required placeholder="How can we help you?" rows={5} value={formData.message} onChange={handleChange} className="bg-slate-50 dark:bg-slate-950/50 resize-none" />
              </div>

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-md font-bold">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
