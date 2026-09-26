"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Activity,
  Radio,
  Smartphone,
  Satellite,
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  Wind,
  CloudFog,
  Clock,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  Filter,
  Layers,
  ArrowUpRight,
  ExternalLink,
  PlusCircle,
  Wifi,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface FeedItem {
  id: string;
  timestamp: string; // e.g. "8s ago"
  secondsAgo: number;
  source: "Twitter/X" | "Citizen App" | "AWS Sensors" | "Satellite" | "Doppler DWR";
  eventType: "Rainfall" | "Thunderstorm" | "Flood" | "Heatwave" | "Fog" | "Dust Storm" | "Strong Wind";
  city: string;
  state: string;
  snippet: string;
  trustScore: number;
  status: "verified" | "pending" | "flagged";
  isNew?: boolean;
  telemetryRef?: string;
  reporterHandle?: string;
}

const initialFeedData: FeedItem[] = [
  {
    id: "FD-1092",
    timestamp: "8s ago",
    secondsAgo: 8,
    source: "Citizen App",
    eventType: "Flood",
    city: "Mumbai Suburban",
    state: "Maharashtra",
    snippet: "Milan Subway underpass water level surging past 3.5ft. Approaching traffic halted at SV Road junction.",
    trustScore: 92,
    status: "verified",
    telemetryRef: "Santacruz AWS #43003 (64.2mm/hr)",
    reporterHandle: "@rohank_mum",
  },
  {
    id: "FD-1091",
    timestamp: "24s ago",
    secondsAgo: 24,
    source: "Doppler DWR",
    eventType: "Thunderstorm",
    city: "Siliguri",
    state: "West Bengal",
    snippet: "Doppler Bagdogra detected squall cell with hail core aloft (56 dBZ). Forward velocity 62 km/h SE.",
    trustScore: 97,
    status: "verified",
    telemetryRef: "DWR Bagdogra Elevation 0.5° Scan",
    reporterHandle: "IMD Doppler Network",
  },
  {
    id: "FD-1090",
    timestamp: "45s ago",
    secondsAgo: 45,
    source: "Twitter/X",
    eventType: "Flood",
    city: "Bengaluru Urban",
    state: "Karnataka",
    snippet: "Bellandur EcoSpace service road inundated. Multiple cabs stuck in knee-deep water outside Gate 2.",
    trustScore: 68,
    status: "pending",
    telemetryRef: "HAL AWS #4320 (31.5mm/45m)",
    reporterHandle: "@priya_blr_tech",
  },
  {
    id: "FD-1089",
    timestamp: "1m ago",
    secondsAgo: 60,
    source: "AWS Sensors",
    eventType: "Fog",
    city: "Delhi NCR",
    state: "Delhi NCR",
    snippet: "Safdarjung surface sensor reports runway visibility drop to 400m. Relative humidity at 94%.",
    trustScore: 98,
    status: "verified",
    telemetryRef: "Safdarjung Automated Transmissometer",
    reporterHandle: "Airport Met Station",
  },
  {
    id: "FD-1088",
    timestamp: "1m 30s ago",
    secondsAgo: 90,
    source: "Twitter/X",
    eventType: "Dust Storm",
    city: "Bikaner",
    state: "Rajasthan",
    snippet: "Apocalyptic black dust storm claims on NH-11 bypass. AI Flagged: 2021 recycled video footage.",
    trustScore: 24,
    status: "flagged",
    telemetryRef: "Bikaner AWS: Clear sky, 0.0mm",
    reporterHandle: "@storm_india_viral",
  },
  {
    id: "FD-1087",
    timestamp: "2m ago",
    secondsAgo: 120,
    source: "Citizen App",
    eventType: "Strong Wind",
    city: "Chennai",
    state: "Tamil Nadu",
    snippet: "Marina Loop Road sea water surge over stone berms. Strong onshore easterly gale gusts at 54 km/h.",
    trustScore: 84,
    status: "verified",
    telemetryRef: "Chennai Port Tide Gauge +1.18m",
    reporterHandle: "@saravanan_fisheries",
  },
  {
    id: "FD-1086",
    timestamp: "2m 45s ago",
    secondsAgo: 165,
    source: "Satellite",
    eventType: "Rainfall",
    city: "Kolkata",
    state: "West Bengal",
    snippet: "INSAT-3DR thermal infrared imagery tracks convective cloud cluster over Hooghly basin.",
    trustScore: 96,
    status: "verified",
    telemetryRef: "INSAT-3DR Channel 4 (TIR-1)",
    reporterHandle: "ISRO Satellite Earth Station",
  },
  {
    id: "FD-1085",
    timestamp: "3m ago",
    secondsAgo: 180,
    source: "Citizen App",
    eventType: "Rainfall",
    city: "Guwahati",
    state: "Assam",
    snippet: "Incessant heavy monsoon showers since dawn. Brahmaputra ghat steps submerged at Uzan Bazar.",
    trustScore: 82,
    status: "pending",
    telemetryRef: "Borjhar Airport AWS (72mm/3hr)",
    reporterHandle: "@bhaskar_ghy",
  },
  {
    id: "FD-1084",
    timestamp: "3m 30s ago",
    secondsAgo: 210,
    source: "AWS Sensors",
    eventType: "Heatwave",
    city: "Nagpur",
    state: "Maharashtra",
    snippet: "Sonegaon surface station #4312 logged 43.8°C ambient air temperature. Orange alert threshold crossed.",
    trustScore: 99,
    status: "verified",
    telemetryRef: "Nagpur Sonegaon AWS #4312",
    reporterHandle: "Regional Met Center Nagpur",
  },
  {
    id: "FD-1083",
    timestamp: "4m ago",
    secondsAgo: 240,
    source: "Citizen App",
    eventType: "Flood",
    city: "Hyderabad",
    state: "Telangana",
    snippet: "Gachibowli flyover underpass stormwater culvert backing up. Water depth reaching 22cm on road.",
    trustScore: 56,
    status: "pending",
    telemetryRef: "GHMC Smart City Node #14",
    reporterHandle: "@hyderabad_civic",
  },
  {
    id: "FD-1082",
    timestamp: "4m 45s ago",
    secondsAgo: 285,
    source: "Twitter/X",
    eventType: "Strong Wind",
    city: "Ahmedabad",
    state: "Gujarat",
    snippet: "Viral post claiming tornado on SP Ring Road. AI Flagged: 2022 Oklahoma tornado clip reposted.",
    trustScore: 19,
    status: "flagged",
    telemetryRef: "DWR Ahmedabad 0 dBZ (Clear)",
    reporterHandle: "@breaking_gujarat",
  },
  {
    id: "FD-1081",
    timestamp: "5m ago",
    secondsAgo: 300,
    source: "Citizen App",
    eventType: "Strong Wind",
    city: "Puri",
    state: "Odisha",
    snippet: "Deep depression coastal gale at 65 km/h along Golden Beach. Red flags hoisted across promenade.",
    trustScore: 94,
    status: "verified",
    telemetryRef: "Puri Coastal AWS #42981",
    reporterHandle: "@puri_beach_watch",
  },
  {
    id: "FD-1080",
    timestamp: "6m ago",
    secondsAgo: 360,
    source: "Citizen App",
    eventType: "Flood",
    city: "Kochi",
    state: "Kerala",
    snippet: "Arabian Sea wave overtopping coastal road at Vypin Munambam. Beach erosion near residential ward.",
    trustScore: 96,
    status: "verified",
    telemetryRef: "Cochin Naval Base AWS (Wave 3.4m)",
    reporterHandle: "@mathew_vypin",
  },
  {
    id: "FD-1079",
    timestamp: "7m ago",
    secondsAgo: 420,
    source: "AWS Sensors",
    eventType: "Heatwave",
    city: "Jaipur",
    state: "Rajasthan",
    snippet: "Sanganer station recorded 41.6°C with dry westerly winds gusting to 22 km/h. Heat advisory sustained.",
    trustScore: 95,
    status: "verified",
    telemetryRef: "Sanganer IMD AWS #42348",
    reporterHandle: "Jaipur Met Office",
  },
  {
    id: "FD-1078",
    timestamp: "8m ago",
    secondsAgo: 480,
    source: "Twitter/X",
    eventType: "Thunderstorm",
    city: "Patna",
    state: "Bihar",
    snippet: "Unverified post claiming 1kg hail stones in Gandhi Maidan. AI Flagged: 2018 photo reused.",
    trustScore: 29,
    status: "flagged",
    telemetryRef: "Patna Airport AWS 0.0mm, 33°C",
    reporterHandle: "@bihar_live_updates",
  },
];

// Pool of Simulated Events that can stream in live
const incomingSimulationPool = [
  {
    eventType: "Flood" as const,
    source: "Citizen App" as const,
    city: "Mumbai Suburban",
    state: "Maharashtra",
    snippet: "Kurla West water accumulation crossed 2.5ft near railway station subway. Central railway trains slowed.",
    trustScore: 91,
    status: "verified" as const,
    telemetryRef: "Kurla AWS #43011 (58mm/hr)",
    reporterHandle: "@mumbai_commuter_99",
  },
  {
    eventType: "Thunderstorm" as const,
    source: "Doppler DWR" as const,
    city: "Kolkata",
    state: "West Bengal",
    snippet: "Doppler DWR Alipore detects squall line approaching from North 24 Parganas with wind gusts >65 km/h.",
    trustScore: 98,
    status: "verified" as const,
    telemetryRef: "Alipore Radar Reflectivity 48 dBZ",
    reporterHandle: "DWR Regional Center",
  },
  {
    eventType: "Rainfall" as const,
    source: "Citizen App" as const,
    city: "Bengaluru Urban",
    state: "Karnataka",
    snippet: "Sudden cloudburst-like shower over Electronic City Phase 1. Heavy water accumulation under elevated flyover.",
    trustScore: 74,
    status: "pending" as const,
    telemetryRef: "Electronics City AWS #4322 (28mm)",
    reporterHandle: "@techie_anand",
  },
  {
    eventType: "Strong Wind" as const,
    source: "Satellite" as const,
    city: "Paradip",
    state: "Odisha",
    snippet: "INSAT-3DR satellite telemetry notes deep depression vortex tightening 120km off Odisha coast.",
    trustScore: 95,
    status: "verified" as const,
    telemetryRef: "INSAT-3DR Rapid Scan Sounder",
    reporterHandle: "IMD Cyclone Warning Cell",
  },
  {
    eventType: "Fog" as const,
    source: "AWS Sensors" as const,
    city: "Amritsar",
    state: "Punjab",
    snippet: "Raja Sansi airport visibility dropped to 350m due to dense advection fog layer. Temperature 13.8°C.",
    trustScore: 97,
    status: "verified" as const,
    telemetryRef: "Amritsar Airport AWS #42071",
    reporterHandle: "Duty Aviation Forecaster",
  },
];

export default function LiveFeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedData);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<FeedItem | null>(null);
  const [simIndex, setSimIndex] = useState(0);

  // Ingestion metrics
  const [velocity, setVelocity] = useState(48); // reports per min

  // Auto Streaming Simulation Timer:
  // Every 7 seconds, if not paused and auto-refresh is on, add a new realistic item to top!
  useEffect(() => {
    if (isPaused || !autoRefresh) return;

    const interval = setInterval(() => {
      const template = incomingSimulationPool[simIndex % incomingSimulationPool.length];
      const newId = `FD-${1100 + feedItems.length + 1}`;

      const newItem: FeedItem = {
        id: newId,
        timestamp: "Just now",
        secondsAgo: 0,
        source: template.source,
        eventType: template.eventType,
        city: template.city,
        state: template.state,
        snippet: template.snippet,
        trustScore: template.trustScore,
        status: template.status,
        telemetryRef: template.telemetryRef,
        reporterHandle: template.reporterHandle,
        isNew: true,
      };

      setFeedItems((prev) => [newItem, ...prev.slice(0, 35)]);
      setSimIndex((i) => i + 1);
      setVelocity((v) => Math.min(Math.max(v + Math.floor(Math.random() * 5) - 2, 38), 64));
    }, 7500);

    return () => clearInterval(interval);
  }, [isPaused, autoRefresh, simIndex, feedItems.length]);

  // Manually trigger a simulated incoming event
  const triggerManualSimulation = () => {
    const template = incomingSimulationPool[simIndex % incomingSimulationPool.length];
    const newId = `FD-${1100 + feedItems.length + 1}`;

    const newItem: FeedItem = {
      id: newId,
      timestamp: "Just now",
      secondsAgo: 0,
      source: template.source,
      eventType: template.eventType,
      city: template.city,
      state: template.state,
      snippet: template.snippet,
      trustScore: template.trustScore,
      status: template.status,
      telemetryRef: template.telemetryRef,
      reporterHandle: template.reporterHandle,
      isNew: true,
    };

    setFeedItems((prev) => [newItem, ...prev]);
    setSimIndex((i) => i + 1);
  };

  // Filter feed items by source
  const filteredFeed = useMemo(() => {
    if (sourceFilter === "all") return feedItems;
    return feedItems.filter((item) => {
      if (sourceFilter === "Twitter/X" && item.source === "Twitter/X") return true;
      if (sourceFilter === "Citizen App" && item.source === "Citizen App") return true;
      if (sourceFilter === "AWS Sensors" && (item.source === "AWS Sensors" || item.source === "Doppler DWR")) return true;
      if (sourceFilter === "Satellite" && item.source === "Satellite") return true;
      return false;
    });
  }, [feedItems, sourceFilter]);

  // Helper icons and styles
  const getSourceIcon = (source: FeedItem["source"]) => {
    switch (source) {
      case "Twitter/X":
        return { icon: Radio, style: "bg-slate-100 text-slate-700 border-slate-200" };
      case "Citizen App":
        return { icon: Smartphone, style: "bg-blue-50 text-blue-700 border-blue-200" };
      case "AWS Sensors":
      case "Doppler DWR":
        return { icon: Wifi, style: "bg-teal-50 text-teal-700 border-teal-200" };
      case "Satellite":
        return { icon: Satellite, style: "bg-purple-50 text-purple-700 border-purple-200" };
      default:
        return { icon: Radio, style: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const getEventIcon = (event: FeedItem["eventType"]) => {
    switch (event) {
      case "Rainfall":
        return { icon: CloudRain, color: "text-blue-600" };
      case "Thunderstorm":
        return { icon: CloudLightning, color: "text-purple-600" };
      case "Flood":
        return { icon: Waves, color: "text-cyan-600" };
      case "Heatwave":
        return { icon: SunMedium, color: "text-orange-600" };
      case "Fog":
        return { icon: CloudFog, color: "text-slate-600" };
      case "Dust Storm":
      case "Strong Wind":
        return { icon: Wind, color: "text-amber-600" };
      default:
        return { icon: CloudRain, color: "text-blue-600" };
    }
  };

  const getTrustBadge = (score: number) => {
    if (score < 40) {
      return {
        bg: "bg-red-50 text-red-700 border-red-200",
        label: `${score}% Suspicious`,
      };
    }
    if (score <= 70) {
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        label: `${score}% Moderate`,
      };
    }
    return {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: `${score}% Verified`,
    };
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200/90 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
              Live Telemetry Feed
            </h1>

            {/* Pulsing LIVE Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>LIVE STREAM</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time streaming ingestion pipeline from Twitter/X, citizen crowdsource dispatches, Doppler radars, and automated weather stations.
          </p>
        </div>

        {/* Streaming Controls & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Resume Feed */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPaused(!isPaused)}
            className={`text-xs h-8 gap-1.5 font-medium border-slate-200 shadow-2xs ${
              isPaused ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-white text-slate-700"
            }`}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-amber-600" />
                <span>Resume Feed</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current text-slate-600" />
                <span>Pause Feed</span>
              </>
            )}
          </Button>

          {/* Auto Refresh Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-xs h-8 gap-1.5 font-medium border-slate-200 shadow-2xs ${
              autoRefresh ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-white text-slate-500"
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${autoRefresh && !isPaused ? "animate-spin text-blue-600" : ""}`} />
            <span>{autoRefresh ? "Auto-Stream On" : "Auto-Stream Off"}</span>
          </Button>

          {/* Trigger Manual Simulation Button */}
          <Button
            size="sm"
            onClick={triggerManualSimulation}
            className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white gap-1 font-semibold shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Incoming</span>
          </Button>
        </div>
      </div>

      {/* SOURCE FILTER TABS STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Source Channel:
          </span>

          {[
            { label: "All Sources", value: "all" },
            { label: "Citizen App", value: "Citizen App" },
            { label: "Twitter/X", value: "Twitter/X" },
            { label: "AWS / Radar Sensors", value: "AWS Sensors" },
            { label: "Satellite (INSAT-3DR)", value: "Satellite" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSourceFilter(tab.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                sourceFilter === tab.value
                  ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Ingesting ~{velocity} reports/min</span>
        </div>
      </div>

      {/* 2. MAIN LAYOUT: MAIN FEED (LEFT) + RIGHT SIDEBAR STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* MAIN FEED (Col 1-8) */}
        <div className="lg:col-span-8 space-y-3">
          {filteredFeed.map((item, index) => {
            const sourceConf = getSourceIcon(item.source);
            const SourceIcon = sourceConf.icon;
            const eventConf = getEventIcon(item.eventType);
            const EventIcon = eventConf.icon;
            const trust = getTrustBadge(item.trustScore);

            return (
              <Card
                key={item.id}
                className={`border bg-white transition-all duration-300 hover:border-blue-400 hover:shadow-sm rounded-xl overflow-hidden ${
                  item.isNew && index === 0
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md animate-in slide-in-from-top-3 duration-500"
                    : "border-slate-200/90"
                }`}
              >
                <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Left Column: Icons, Metadata, Snippet */}
                  <div className="space-y-2 flex-1">
                    {/* Top Row: Timestamp, Source, Event Badge, Location */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.timestamp}
                      </span>

                      <span className="text-slate-300">•</span>

                      {/* Source Badge */}
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium px-2 py-0.5 ${sourceConf.style}`}
                      >
                        <SourceIcon className="w-2.5 h-2.5 mr-1" />
                        {item.source}
                      </Badge>

                      {/* Event Badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        <EventIcon className={`w-3.5 h-3.5 ${eventConf.color}`} />
                        <span>{item.eventType}</span>
                      </span>

                      {/* Location Pin */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span>
                          {item.city}, {item.state}
                        </span>
                      </div>
                    </div>

                    {/* Description Snippet */}
                    <p className="text-xs text-slate-700 leading-relaxed">
                      &ldquo;{item.snippet}&rdquo;
                    </p>

                    {/* Ground Sensor Correlation Snippet */}
                    {item.telemetryRef && (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span className="text-slate-400">Telemetry:</span>
                        <span className="bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200/60 text-slate-700">
                          {item.telemetryRef}
                        </span>
                        {item.reporterHandle && (
                          <span className="text-slate-400">
                            By {item.reporterHandle}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Trust Score Badge & "View Details" Link */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-4">
                    <Badge
                      variant="outline"
                      className={`text-xs font-bold font-mono px-2.5 py-0.5 ${trust.bg}`}
                    >
                      {trust.label}
                    </Badge>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedIncident(item)}
                      className="h-7 px-2 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 gap-1"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 3. RIGHT SIDEBAR STATS PANEL (Col 9-12) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Feed Velocity */}
          <Card className="border-slate-200/90 bg-white p-4 rounded-2xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Feed Velocity
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-slate-900 font-heading">
                    {velocity}
                  </span>
                  <span className="text-xs text-slate-500">reports / min</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18%</span>
              </div>
            </div>

            {/* Sparkline Simulation Bars */}
            <div className="flex items-end gap-1 h-12 pt-2 border-b border-slate-100 pb-2">
              {[28, 34, 40, 36, 44, 48, 52, 46, 50, velocity].map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-300 ${
                    i === 9 ? "bg-blue-600" : "bg-blue-200"
                  }`}
                  style={{ height: `${(v / 65) * 100}%` }}
                  title={`${v} reports/min`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Streaming Protocol: WebSocket</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Connected (38ms)
              </span>
            </div>
          </Card>

          {/* Card 2: Source Breakdown Percentage */}
          <Card className="border-slate-200/90 bg-white p-4 rounded-2xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase font-heading">
                Source Channel Distribution
              </h3>
              <Badge variant="outline" className="text-[10px]">
                Past 1 hour
              </Badge>
            </div>

            <div className="space-y-2.5">
              {/* Citizen App */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-blue-600" />
                    IMD Citizen App
                  </span>
                  <span className="font-mono font-bold text-slate-900">44%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "44%" }} />
                </div>
              </div>

              {/* Twitter/X */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-slate-600" />
                    Twitter/X Social Stream
                  </span>
                  <span className="font-mono font-bold text-slate-900">31%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-700 rounded-full" style={{ width: "31%" }} />
                </div>
              </div>

              {/* AWS / DWR Sensors */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-teal-600" />
                    IMD AWS & Doppler Radar
                  </span>
                  <span className="font-mono font-bold text-slate-900">17%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: "17%" }} />
                </div>
              </div>

              {/* INSAT Satellite */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Satellite className="w-3 h-3 text-purple-600" />
                    INSAT-3DR Imagery Ingest
                  </span>
                  <span className="font-mono font-bold text-slate-900">8%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: Top Trending Location */}
          <Card className="border-blue-200 bg-blue-50/40 p-4 rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                Top Trending Location
              </span>
              <Badge className="bg-red-500 text-white text-[9px] px-1.5 py-0 font-bold animate-pulse">
                RED ALERT
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Mumbai Suburban, Maharashtra</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              18 verified incident reports in last 30 minutes. Santacruz AWS station records continuous torrential rain burst (64.2mm/hr).
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] text-blue-900 font-medium border-t border-blue-100">
              <span>Cluster ID: CL-MUM-402</span>
              <span>Subway Inundation Active</span>
            </div>
          </Card>

          {/* Card 4: Top Trending Event Type */}
          <Card className="border-slate-200 bg-white p-4 rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Top Event Category
              </span>
              <span className="text-xs font-bold text-cyan-700">42% of traffic</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Waves className="w-4 h-4 text-cyan-600" />
              <span>Flash Flood & Urban Runoff</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Active civic disruption in Mumbai, Bengaluru, and Chennai coastal corridors.
            </p>
          </Card>
        </div>
      </div>

      {/* 4. DETAIL INSPECTION MODAL */}
      <Dialog
        open={Boolean(selectedIncident)}
        onOpenChange={(open) => !open && setSelectedIncident(null)}
      >
        {selectedIncident && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedIncident.id}
                </span>
                <Badge
                  variant="outline"
                  className={getTrustBadge(selectedIncident.trustScore).bg}
                >
                  {getTrustBadge(selectedIncident.trustScore).label}
                </Badge>
              </div>
              <DialogTitle className="text-base font-bold text-slate-900 mt-1">
                {selectedIncident.city}, {selectedIncident.state} — {selectedIncident.eventType}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Live stream dispatch received {selectedIncident.timestamp} via {selectedIncident.source}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="font-semibold text-slate-700 block">Reported Incident Description</span>
                <p className="text-slate-800 italic leading-relaxed">
                  &ldquo;{selectedIncident.snippet}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block">Telemetry Corroboration</span>
                  <span className="font-semibold text-slate-800 font-mono text-[11px]">
                    {selectedIncident.telemetryRef || "Automated Stream"}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block">Reporter Provenance</span>
                  <span className="font-semibold text-slate-800 text-[11px]">
                    {selectedIncident.reporterHandle || "Verified Feed"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">AI Authenticity Trust Score:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedIncident.trustScore}% ({selectedIncident.status})
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedIncident.trustScore >= 70
                        ? "bg-emerald-500"
                        : selectedIncident.trustScore >= 40
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${selectedIncident.trustScore}%` }}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedIncident(null)}
                className="text-xs"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedIncident(null);
                }}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                Forward to Verification Desk
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
