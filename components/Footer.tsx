"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloudRainWind,
  Activity,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Database,
  Satellite,
  Globe2,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const currentYear = 2026;

  // Dedicated dashboard or login pages do not render the global public footer
  if (pathname === "/login" || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#081325] text-slate-300 border-t border-[#162744]">
      {/* 1. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & MoES / IMD Designation (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo Emblem */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white shadow-md ring-1 ring-blue-500/30">
                <CloudRainWind className="w-5 h-5 text-sky-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-heading">
                  WeatherData<span className="text-sky-400">X</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  National Weather Big Data Analytics Platform
                </span>
              </div>
            </div>

            {/* Official Ministry Attribution */}
            <div className="p-3 rounded-lg bg-[#0e1d35] border border-[#1b3155] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ministry of Earth Sciences (MoES)</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-300">
                In technical collaboration with India Meteorological Department (IMD)
                and National Centre for Medium Range Weather Forecasting (NCMRWF).
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              India's central big data platform collecting, verifying, and visualizing
              high-frequency weather observations from social media feeds, ground sensors,
              meteorological radar arrays, and citizen weather reports.
            </p>

            {/* Live Operational Feeds Badge */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102340] border border-[#1e3b68] text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Data Ingestion: <strong className="text-emerald-400">Operational</strong></span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102340] border border-[#1e3b68] text-[11px] text-slate-300">
                <Activity className="w-3 h-3 text-sky-400" />
                <span>Verification AI: <strong className="text-sky-300">99.4% Precision</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-[#1a2f50] pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>About Platform</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>Analytics Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#radar"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>Doppler Radar Live</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#citizen-reports"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  <span>Citizen Weather Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Data Feeds & Governance (Spans 3 columns) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-[#1a2f50] pb-2">
              National Ingestion Sources
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-slate-400">
                <Database className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>IMD AWS Network & Automated Rain Gauges</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Satellite className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>INSAT-3D & 3DR Geostationary Satellites</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Radio className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>Social Media Ingestion & Multilingual NLP</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Globe2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>Open Government Data (OGD) Portal India</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Crowdsourced Ground-Truth Verification</span>
              </li>
            </ul>
          </div>

          {/* Column 4: MoES / IMD Official Contact Info (Spans 3 columns) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-[#1a2f50] pb-2">
              Official Contact & Operations
            </h3>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Ministry of Earth Sciences</strong>
                  <span>Prithvi Bhavan, Opp. India Habitat Centre, Lodhi Road, New Delhi - 110003</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-200 font-medium">Emergency Weather Toll-Free</span>
                  <span className="text-sky-300 font-semibold">1800-180-1717</span>
                  <span className="block text-[11px] text-slate-500">24x7 Severe Hazard Desk</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-200 font-medium">Official Inquiries & API Access</span>
                  <a
                    href="mailto:weatherdatax@imd.gov.in"
                    className="text-sky-300 hover:underline"
                  >
                    weatherdatax@imd.gov.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Footer / Copyright & Compliance Bar */}
      <div className="border-t border-[#13233c] bg-[#050d1a] py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="text-slate-300 font-medium">
              © {currentYear} Ministry of Earth Sciences (MoES) & India Meteorological Department (IMD), Government of India.
            </p>
            <p className="text-[11px] text-slate-500">
              National Weather Big Data Analytics Platform • Hosted on National Informatics Centre (NIC) Cloud Infrastructure.
            </p>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
            <a href="#privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#terms" className="hover:text-slate-200 transition-colors">
              Terms of Use
            </a>
            <span className="text-slate-700">•</span>
            <a href="#data-policy" className="hover:text-slate-200 transition-colors">
              NDSAP Data Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#security" className="hover:text-slate-200 transition-colors">
              Security Guidelines
            </a>
            <span className="text-slate-700">•</span>
            <a href="#accessibility" className="hover:text-slate-200 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
