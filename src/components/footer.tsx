import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/data/properties";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 lg:py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/NextPhase Real Estate 1.png"
                alt="NextPhase Real Estate"
                width={200}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {companyInfo.tagline}
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-400 transition-colors hover:bg-blue-600 hover:text-white">fb</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-400 transition-colors hover:bg-emerald-600 hover:text-white">ig</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-400 transition-colors hover:bg-blue-400 hover:text-white">tw</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-400 transition-colors hover:bg-indigo-600 hover:text-white">in</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Properties', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Property Sales',
                'Property Rentals',
                'Investment Advisory',
                'Property Management',
                'Estate Development'
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="text-slate-400 text-sm">
                <strong className="block text-white mb-1">Head Office:</strong>
                {companyInfo.headOffice}
              </li>
              <li className="text-slate-400 text-sm">
                <strong className="block text-white mb-1">Branch Office:</strong>
                {companyInfo.branchOffice}
              </li>
              <li className="text-slate-400 text-sm pt-2">
                <a href={`mailto:${companyInfo.email}`} className="hover:text-amber-400 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="text-slate-400 text-sm">
                <a href={`tel:${companyInfo.phones[0].replace(/\s/g, '')}`} className="hover:text-blue-400 transition-colors block">
                  {companyInfo.phones[0]}
                </a>
                <a href={`tel:${companyInfo.phones[1].replace(/\s/g, '')}`} className="hover:text-blue-400 transition-colors block">
                  {companyInfo.phones[1]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} {companyInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
