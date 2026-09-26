"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloudRainWind,
  Shield,
  Activity,
  Menu,
  X,
  Lock,
  ChevronRight,
  ExternalLink,
  Layers,
  Radio,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll state for subtle elevation change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact", href: "/contact" },
  ];

  // Dedicated split-screen login and dashboard pages handle their own navigation
  if (pathname === "/login" || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* 1. Official Government Header Strip */}
      <header className="w-full bg-[#0a192f] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-[#172a45]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Ministry & Govt Designation */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 font-medium tracking-wide text-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              भारत सरकार | Government of India
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">
              Ministry of Earth Sciences (MoES) & IMD
            </span>
          </div>

          {/* Right: National Weather Data Grid Status */}
          <div className="flex items-center gap-4 text-[11px] ml-auto">
            <div className="hidden lg:flex items-center gap-2 text-slate-300">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>National Ingestion Feed:</span>
              <span className="font-semibold text-emerald-400">1,480+ Nodes Online</span>
            </div>
            <div className="text-slate-400">
              Toll Free 24x7: <span className="text-sky-300 font-medium">1800-180-1717</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Navigation Bar (Sticky with subtle shadow & blur) */}
      <nav
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? "shadow-md border-b border-slate-200/90 py-2.5"
            : "border-b border-slate-200/70 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo / Brand Header */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform active:scale-95"
            >
              {/* Weather Data Emblem */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c2340] to-[#1d4ed8] text-white shadow-sm ring-1 ring-blue-900/20 group-hover:shadow-md transition-all">
                <CloudRainWind className="w-5 h-5 text-sky-200 absolute -top-1 -right-1 opacity-80" />
                <Activity className="w-5 h-5 text-white relative z-10" />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-[#0a192f] font-heading">
                    WeatherData<span className="text-blue-600">X</span>
                  </span>
                  <Badge
                    variant="outline"
                    className="hidden sm:inline-flex text-[10px] uppercase font-semibold px-1.5 py-0 border-blue-200 text-blue-800 bg-blue-50/70"
                  >
                    MoES • IMD
                  </Badge>
                </div>
                <span className="text-[10.5px] font-medium text-slate-500 tracking-tight leading-tight hidden sm:block">
                  National Weather Big Data Analytics Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-700 bg-blue-50/80 font-semibold shadow-2xs"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons on Far Right */}
            {/* Action Buttons on Far Right */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="default"
                  size="default"
                  className="bg-[#0a192f] hover:bg-[#162f55] text-white gap-2 font-medium shadow-xs border border-[#1b345b] px-4 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Admin Login</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-800" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-800" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer (Slide Down) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Mobile Department Branding */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 mb-2">
              <div className="text-xs font-semibold text-[#0a192f]">
                Ministry of Earth Sciences (MoES)
              </div>
              <div className="text-[11px] text-slate-500">
                National Weather Big Data Analytics Platform
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                1,480+ Ground & Radar Ingestion Nodes Active
              </div>
            </div>

            {/* Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-700 bg-blue-50 font-semibold"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Admin Login Trigger */}
            <div className="pt-2 border-t border-slate-100">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="default"
                  size="default"
                  className="w-full bg-[#0a192f] hover:bg-[#162f55] text-white justify-center gap-2 py-2.5 shadow-xs cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Admin Login</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
export default Navbar;
