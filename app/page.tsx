"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CloudRainWind,
  Activity,
  Satellite,
  Database,
  Radio,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BarChart3,
  Cpu,
  ShieldAlert,
  CopyCheck,
  Network,
  Tags,
  SlidersHorizontal,
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  CloudFog,
  Wind,
  Gauge,
  FileSpreadsheet,
  MessageSquareQuote,
  Users,
  ChevronDown,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function Home() {
  // Animated counting numbers for Hero
  const [reportsCount, setReportsCount] = useState(0);
  const [accuracyCount, setAccuracyCount] = useState(0);
  const [statesCount, setStatesCount] = useState(0);
  const [nodesCount, setNodesCount] = useState(0);

  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setReportsCount(Math.floor(progress * 12480));
      setAccuracyCount(Number((progress * 98.2).toFixed(1)));
      setStatesCount(Math.floor(progress * 28));
      setNodesCount(Math.floor(progress * 1480));

      if (currentStep >= steps) {
        clearInterval(timer);
        setReportsCount(12480);
        setAccuracyCount(98.2);
        setStatesCount(28);
        setNodesCount(1480);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const howItWorksSteps = [
    {
      step: "01",
      title: "Collect",
      category: "Multi-Source Intake",
      icon: Radio,
      color: "text-sky-600 bg-sky-50 border-sky-200",
      description:
        "High-velocity ingestion across social networks (#IMD hashtags, citizen tweets), open weather APIs, INSAT satellites, and ground AWS telemetry.",
      sources: ["#IMD Twitter/X", "AWS Telemetry", "Citizen Mobile", "INSAT-3DR"],
    },
    {
      step: "02",
      title: "Verify",
      category: "AI Assurance",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      description:
        "Automated NLP fake-news detection, reverse image validation, spatio-temporal duplicate pruning, and statistical credibility scoring.",
      sources: ["Fake News Guard", "Deduplication", "Sensor Proximity", "Trust Score >0.85"],
    },
    {
      step: "03",
      title: "Categorize",
      category: "Hazard Classification",
      icon: Tags,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      description:
        "Automated multi-label classification into distinct weather hazards with instant severity grading for state disaster management authorities.",
      hazards: [
        { label: "Rainfall", icon: CloudRain, color: "text-blue-600 bg-blue-50" },
        { label: "Thunderstorm", icon: CloudLightning, color: "text-amber-600 bg-amber-50" },
        { label: "Flood", icon: Waves, color: "text-cyan-600 bg-cyan-50" },
        { label: "Heatwave", icon: SunMedium, color: "text-red-600 bg-red-50" },
        { label: "Fog", icon: CloudFog, color: "text-slate-600 bg-slate-100" },
        { label: "Dust Storm", icon: Wind, color: "text-amber-700 bg-amber-50" },
        { label: "Strong Wind", icon: Wind, color: "text-teal-600 bg-teal-50" },
      ],
    },
    {
      step: "04",
      title: "Visualize",
      category: "Actionable Intelligence",
      icon: BarChart3,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description:
        "Sub-kilometer GIS heatmaps, real-time alert broadcasts, and early-warning feeds distributed to NDMA, IMD cells, and local administrations.",
      sources: ["GIS Heatmaps", "NDMA API Push", "Citizen Alerts", "District War-Rooms"],
    },
  ];

  const keyFeatures = [
    {
      title: "Real-time Big Data Ingestion",
      icon: Cpu,
      description:
        "Processes thousands of incoming meteorological data points per second with Kafka streaming and sub-second schema normalization.",
      badge: "High Throughput",
    },
    {
      title: "AI Fake News Detection",
      icon: ShieldAlert,
      description:
        "Multimodal machine learning detects recycled cyclone videos, false flooding rumors, and out-of-date media across 12 Indian languages.",
      badge: "Neural Verification",
    },
    {
      title: "Duplicate Removal Engine",
      icon: CopyCheck,
      description:
        "Perceptual hashing and spatial clustering eliminate redundant social posts and group related reports into coherent incident clusters.",
      badge: "Smart Deduplication",
    },
    {
      title: "Multi-Source Aggregation",
      icon: Network,
      description:
        "Unifies fragmented streams from Twitter/X, Doppler weather radars (DWR), automatic weather stations (AWS), and citizen phone reports.",
      badge: "Unified Mesh",
    },
    {
      title: "Event Auto-Categorization",
      icon: Tags,
      description:
        "Classifies weather anomalies into localized rainfall, squalls, flash floods, and heatwaves with automated severity color-coding.",
      badge: "Automated Taxonomies",
    },
    {
      title: "Admin Verification Panel",
      icon: SlidersHorizontal,
      description:
        "Authoritative dashboard for certified IMD duty meteorologists to audit AI confidence scores, inspect ground evidence, and issue alerts.",
      badge: "Operational Oversight",
    },
  ];

  const dataSources = [
    {
      name: "Social Media (#IMD)",
      type: "Citizen Sentiment & NLP",
      icon: MessageSquareQuote,
      badge: "Live Social Stream",
      description:
        "Captures real-time ground reports, photo evidence, and hazard mentions tagged with #IMD, #Cyclone, and regional meteorological terms.",
      coverage: "Pan-India 24x7",
    },
    {
      name: "Automatic Weather Stations (AWS)",
      type: "In-Situ Precision Telemetry",
      icon: Gauge,
      badge: "Ground Truth Sensors",
      description:
        "Direct telemetry from 1,480+ calibrated IMD surface stations delivering pressure, temperature, wind speed, and rain gauge accumulations.",
      coverage: "All 28 States & UTs",
    },
    {
      name: "INSAT Satellites (3D & 3DR)",
      type: "Geostationary Earth Observation",
      icon: Satellite,
      badge: "Orbital Multi-Spectral",
      description:
        "Half-hourly cloud top temperatures, visible albedo, and water vapor channels tracking tropical squalls and monsoon depressions.",
      coverage: "Indian Ocean & Subcontinent",
    },
    {
      name: "Open Government Data (OGD)",
      type: "Inter-Agency Public Datasets",
      icon: FileSpreadsheet,
      badge: "National Data Grid",
      description:
        "Cross-verification with Central Water Commission (CWC) river basins, state reservoirs, and national disaster vulnerability registries.",
      coverage: "River Basins & Reservoirs",
    },
    {
      name: "Citizen Reports",
      type: "Crowdsourced Ground Observation",
      icon: Users,
      badge: "Community Observers",
      description:
        "Direct mobile uploads from farmers, volunteer weather watchers, and civil defense personnel with GPS coordinates and timestamps.",
      coverage: "Hyperlocal Districts",
    },
  ];

  const previewTableData = [
    {
      event: "Heavy Rainfall Alert",
      location: "Mumbai Suburban, MH",
      icon: CloudRain,
      source: "Twitter/X + AWS (#MumbaiRains)",
      confidence: "99.1%",
      severity: "Red Warning",
      status: "Verified",
      time: "2 mins ago",
    },
    {
      event: "Severe Thunderstorm & Squall",
      location: "Siliguri, West Bengal",
      icon: CloudLightning,
      source: "Doppler DWR + Citizen Report",
      confidence: "97.4%",
      severity: "Orange Alert",
      status: "Verified",
      time: "6 mins ago",
    },
    {
      event: "Urban Waterlogging",
      location: "Chennai Central, TN",
      icon: Waves,
      source: "Citizen Photos + ARG Gauge",
      confidence: "95.8%",
      severity: "Yellow Watch",
      status: "Verified",
      time: "11 mins ago",
    },
    {
      event: "Heatwave Advisory",
      location: "Nagpur, Maharashtra",
      icon: SunMedium,
      source: "IMD Ground Station #4312",
      confidence: "99.8%",
      severity: "Orange Alert",
      status: "Verified",
      time: "15 mins ago",
    },
    {
      event: "High Gusts & Dust Wave",
      location: "Bikaner, Rajasthan",
      icon: Wind,
      source: "Social Post + Satellite Scan",
      confidence: "91.2%",
      severity: "Yellow Watch",
      status: "Under Review",
      time: "19 mins ago",
    },
  ];

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071324] via-[#0c1f3c] to-[#0a182d] text-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-[#1b2d4b]">
        {/* Subtle Radar Background Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        {/* Radar Concentric Rings in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-blue-500/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-sky-400/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-blue-400/15 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Ministry Identification Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12243d] border border-blue-500/30 text-sky-300 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ministry of Earth Sciences (MoES) • India Meteorological Department (IMD)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight sm:leading-tight text-white">
              National Weather Big Data{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Analytics Platform
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
              Empowering India's meteorological resilience with real-time automated ingestion,
              AI-driven verification, and decision-grade visualization of weather observations synthesized
              across social media, public APIs, INSAT satellites, and citizen ground reports.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3 w-full sm:w-auto">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white gap-2 font-semibold px-7 py-2.5 shadow-lg shadow-blue-900/40 border border-blue-400/30"
                >
                  <BarChart3 className="w-4 h-4 text-sky-200" />
                  <span>View Live Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto border-[#22395d] bg-[#0c1c33]/70 text-slate-200 hover:bg-[#152a4a] hover:text-white font-medium px-6 py-2.5 gap-2 backdrop-blur-sm"
              >
                <span>Learn How It Works</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Button>
            </div>
          </div>

          {/* Animated/Counting Stats Row */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#0e1d35]/85 border border-[#1b3155] shadow-md backdrop-blur-sm flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">Reports Collected</p>
                <p className="text-3xl font-bold tracking-tight text-white font-heading">
                  {reportsCount.toLocaleString()}+
                </p>
                <p className="text-[11px] text-sky-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Real-time 24h intake
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-sky-950/80 border border-sky-800/40 text-sky-400 flex items-center justify-center">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0e1d35]/85 border border-[#1b3155] shadow-md backdrop-blur-sm flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">Verification Accuracy</p>
                <p className="text-3xl font-bold tracking-tight text-emerald-400 font-heading">
                  {accuracyCount}%
                </p>
                <p className="text-[11px] text-slate-400">AI cross-validation</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0e1d35]/85 border border-[#1b3155] shadow-md backdrop-blur-sm flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">States Covered</p>
                <p className="text-3xl font-bold tracking-tight text-white font-heading">
                  {statesCount} States
                </p>
                <p className="text-[11px] text-slate-400">+ 8 Union Territories</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/40 text-indigo-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0e1d35]/85 border border-[#1b3155] shadow-md backdrop-blur-sm flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">Active Ingestion Nodes</p>
                <p className="text-3xl font-bold tracking-tight text-white font-heading">
                  {nodesCount.toLocaleString()}+
                </p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> AWS & Radar arrays
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 text-blue-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50/70 font-semibold px-3 py-1">
              4-Stage Intelligence Pipeline
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a192f] tracking-tight font-heading">
              How WeatherDataX Operates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From raw unstructured social chatter and ground sensor signals to validated,
              disaster-grade intelligence delivered in real-time.
            </p>
          </div>

          {/* 4-Step Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorksSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="relative flex flex-col justify-between border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 font-mono tracking-widest">
                        STEP {item.step}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 block">
                        {item.category}
                      </span>
                      <CardTitle className="text-xl font-bold text-slate-900 mt-0.5">
                        {item.title}
                      </CardTitle>
                    </div>

                    <CardDescription className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Tags or Category Icons */}
                    {item.sources && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.sources.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10.5px] font-medium bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 shadow-2xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.hazards && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.hazards.map((h, hIdx) => {
                          const HazardIcon = h.icon;
                          return (
                            <span
                              key={hIdx}
                              className={`inline-flex items-center gap-1 text-[10.5px] font-medium px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs ${h.color}`}
                            >
                              <HazardIcon className="w-3 h-3" />
                              <span>{h.label}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES GRID */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50/70 font-semibold px-3 py-1">
              Core Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a192f] tracking-tight font-heading">
              Engineered for National Scale
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Six foundational pillars powering India's next-generation meteorological big data platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                        <FeatureIcon className="w-5 h-5" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10.5px] font-medium bg-slate-100 text-slate-700 border-slate-200"
                      >
                        {feature.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </CardTitle>

                    <CardDescription className="text-xs text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DATA SOURCES SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50/70 font-semibold px-3 py-1">
              Multi-Modal Ingestion Mesh
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a192f] tracking-tight font-heading">
              Diverse & Authoritative Data Sources
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Synthesizing crowd ground-truth with institutional satellite and surface instrumentation networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSources.map((source, idx) => {
              const SourceIcon = source.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-blue-100/60 text-blue-700 flex items-center justify-center">
                        <SourceIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {source.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">{source.name}</h3>
                      <p className="text-xs text-blue-600 font-medium">{source.type}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {source.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between text-[11.5px] text-slate-500">
                    <span>Coverage Range</span>
                    <strong className="text-slate-700">{source.coverage}</strong>
                  </div>
                </div>
              );
            })}

            {/* Sixth Card: Unified Data Integration Hub */}
            <div className="p-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Open Interoperable Data Standards
                  </h3>
                  <p className="text-xs text-blue-700 font-medium">NDSAP & WMO Compliance</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compliant with National Data Sharing and Accessibility Policy (NDSAP)
                  and World Meteorological Organization standards for cross-border research and hazard alerting.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-blue-200/60 flex items-center justify-between text-[11.5px] text-blue-800 font-medium">
                <span>National Grid Readiness</span>
                <strong>Level 4 Tier</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE PREVIEW / DASHBOARD TEASER SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 font-semibold px-3 py-1">
              Live Console Teaser
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a192f] tracking-tight font-heading">
              Real-Time National Weather Grid
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Preview the continuous stream of ingested, cross-verified observations from India's meteorological network.
            </p>
          </div>

          {/* Interactive Mockup Container */}
          <div className="rounded-2xl border border-slate-300 bg-white shadow-xl overflow-hidden">
            {/* Mockup Header Strip */}
            <div className="bg-[#0a192f] text-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1b345b]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-700 mx-1" />
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>National Ingestion Console — Live Feed</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Stream Active • 3s refresh
                </span>
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-7 gap-1 px-3"
                  >
                    <span>Full Screen</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar inside Mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-50 border-b border-slate-200 p-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Total Stream Events</span>
                <strong className="text-slate-900 text-base">142 Ingested / hr</strong>
              </div>
              <div>
                <span className="text-slate-500 block">AI Verified</span>
                <strong className="text-emerald-700 text-base">138 Approved (97.2%)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Flagged / Pruned</span>
                <strong className="text-amber-700 text-base">4 Duplicates</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Active Critical Alerts</span>
                <strong className="text-red-600 text-base">2 Warning Zones</strong>
              </div>
            </div>

            {/* Mini Incidents Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-100/70">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700 text-xs">Event Type</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs">Location / Region</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs">Corroborating Sources</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs">AI Confidence</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs">Severity Level</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-xs text-right">Recency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewTableData.map((row, idx) => {
                    const EventIcon = row.icon;
                    return (
                      <TableRow key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <TableCell className="font-medium text-slate-900 text-xs py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                              <EventIcon className="w-3.5 h-3.5" />
                            </div>
                            <span>{row.event}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-slate-700">{row.location}</TableCell>
                        <TableCell className="text-xs text-slate-600 font-mono text-[11px]">
                          {row.source}
                        </TableCell>
                        <TableCell className="text-xs font-semibold text-slate-800">
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {row.confidence}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs">
                          {row.severity.includes("Red") && (
                            <Badge className="bg-red-50 text-red-700 border-red-200 text-[10.5px]">
                              {row.severity}
                            </Badge>
                          )}
                          {row.severity.includes("Orange") && (
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10.5px]">
                              {row.severity}
                            </Badge>
                          )}
                          {row.severity.includes("Yellow") && (
                            <Badge className="bg-yellow-50 text-yellow-800 border-yellow-200 text-[10.5px]">
                              {row.severity}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs">
                          {row.status === "Verified" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-medium text-[11px]">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Reviewing
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500 text-right font-mono text-[11px]">
                          {row.time}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Bottom Card Footer with CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">
                Displaying 5 of 142 live weather events captured across 28 states.
              </span>
              <Link href="/dashboard">
                <Button
                  size="default"
                  className="bg-[#0a192f] hover:bg-[#162f55] text-white gap-2 font-medium px-5 shadow-xs"
                >
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                  <span>View Full Interactive Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER (Before Footer) */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#071324] via-[#0c1f3c] to-[#071324] text-white border-t border-[#1b345b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#0e213d] to-[#09172c] border border-blue-500/20 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-sky-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Weather Intelligence Mesh</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Join the National Weather Intelligence Network
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Whether you represent a State Disaster Management Authority (SDMA), a meteorological research
              institution, or an active civic observer, WeatherDataX delivers verified real-time weather analytics
              for early hazard response.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white gap-2 font-semibold px-8 shadow-lg shadow-blue-900/50"
                >
                  <BarChart3 className="w-4 h-4 text-sky-200" />
                  <span>Explore Live Dashboard</span>
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 bg-transparent text-slate-200 hover:bg-white/10 hover:text-white font-medium px-8"
                >
                  <span>Connect With MoES Cell</span>
                </Button>
              </Link>
            </div>

            {/* Compliance footnote */}
            <div className="pt-6 border-t border-blue-500/15 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Open Government Data (OGD) Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                24x7 Multi-Hazard Operations Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                End-to-End Encrypted Feeds
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
