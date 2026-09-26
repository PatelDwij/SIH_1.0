"use client";

import React, { useState, useMemo } from "react";
import {
  Map as MapIcon,
  Layers,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Flame,
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  Wind,
  CloudFog,
  Eye,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Radio,
  Satellite,
  Compass,
  Info,
  Check,
  X,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Note: Replace with real map library (Leaflet/Mapbox) + real GPS coordinates when backend is connected

export interface MapReport {
  id: string;
  city: string;
  state: string;
  x: number; // SVG X coordinate (0-800)
  y: number; // SVG Y coordinate (0-850)
  eventType: "Rainfall" | "Thunderstorm" | "Flood" | "Heatwave" | "Fog" | "Dust Storm" | "Strong Wind";
  severity: "severe" | "moderate" | "mild" | "verified-safe";
  status: "verified" | "pending" | "flagged";
  trustScore: number;
  timestamp: string;
  reportsCount: number;
  snippet: string;
  sensorCorrelation: string;
}

const mapReportsData: MapReport[] = [
  {
    id: "WX-9488",
    city: "Mumbai",
    state: "Maharashtra",
    x: 260,
    y: 555,
    eventType: "Flood",
    severity: "severe",
    status: "verified",
    trustScore: 92,
    timestamp: "6m ago",
    reportsCount: 8,
    snippet: "Milan Subway waterlogged 4ft; Kurla & Dadar low-lying inundation. Precipitation 64mm/hr.",
    sensorCorrelation: "Santacruz AWS #43003 (Agreement 99%)",
  },
  {
    id: "WX-9487",
    city: "Siliguri",
    state: "West Bengal",
    x: 675,
    y: 335,
    eventType: "Thunderstorm",
    severity: "severe",
    status: "pending",
    trustScore: 94,
    timestamp: "12m ago",
    reportsCount: 4,
    snippet: "Golf ball sized hail stones damaged roofs in Pradhan Nagar. Squall gusts 72 km/h.",
    sensorCorrelation: "DWR Bagdogra 56 dBZ Hail Core",
  },
  {
    id: "WX-9486",
    city: "Delhi NCR",
    state: "Delhi NCR",
    x: 375,
    y: 275,
    eventType: "Fog",
    severity: "moderate",
    status: "verified",
    trustScore: 98,
    timestamp: "18m ago",
    reportsCount: 6,
    snippet: "Runway Visual Range dropped to 400m at IGI Airport. Shallow radiation fog layer.",
    sensorCorrelation: "Safdarjung & Palam AWS Combined",
  },
  {
    id: "WX-9485",
    city: "Bengaluru",
    state: "Karnataka",
    x: 365,
    y: 700,
    eventType: "Flood",
    severity: "moderate",
    status: "pending",
    trustScore: 68,
    timestamp: "24m ago",
    reportsCount: 7,
    snippet: "Bellandur ORR service lane submerged after sudden burst. Tech shuttle buses stranded.",
    sensorCorrelation: "HAL Airport AWS #4320 (31.5mm/45m)",
  },
  {
    id: "WX-9484",
    city: "Chennai",
    state: "Tamil Nadu",
    x: 430,
    y: 705,
    eventType: "Strong Wind",
    severity: "severe",
    status: "verified",
    trustScore: 84,
    timestamp: "32m ago",
    reportsCount: 5,
    snippet: "High spring tide waves surging over Marina Loop Road. Onshore squall gusts 54 km/h.",
    sensorCorrelation: "Chennai Port Tide Gauge +1.18m",
  },
  {
    id: "WX-9483",
    city: "Bikaner",
    state: "Rajasthan",
    x: 265,
    y: 310,
    eventType: "Dust Storm",
    severity: "severe",
    status: "flagged",
    trustScore: 24,
    timestamp: "39m ago",
    reportsCount: 2,
    snippet: "Claim of black dust haboob on NH-11 bypass. Flagged: recycled video from May 2021.",
    sensorCorrelation: "Bikaner AWS reads clear sky, 0 dBZ",
  },
  {
    id: "WX-9482",
    city: "Kolkata",
    state: "West Bengal",
    x: 635,
    y: 455,
    eventType: "Rainfall",
    severity: "mild",
    status: "verified",
    trustScore: 88,
    timestamp: "45m ago",
    reportsCount: 4,
    snippet: "Intermittent monsoonal drizzle across Salt Lake and Park Street. Traffic normal.",
    sensorCorrelation: "Alipore AWS #42809 (14.2mm rain)",
  },
  {
    id: "WX-9481",
    city: "Hyderabad",
    state: "Telangana",
    x: 395,
    y: 580,
    eventType: "Rainfall",
    severity: "moderate",
    status: "pending",
    trustScore: 56,
    timestamp: "52m ago",
    reportsCount: 3,
    snippet: "Inundation sensor triggered under Gachibowli flyover. Ultrasonic water depth 22cm.",
    sensorCorrelation: "GHMC Smart City IoT Gateway #14",
  },
  {
    id: "WX-9480",
    city: "Guwahati",
    state: "Assam",
    x: 730,
    y: 345,
    eventType: "Rainfall",
    severity: "severe",
    status: "verified",
    trustScore: 82,
    timestamp: "1h ago",
    reportsCount: 5,
    snippet: "Brahmaputra river level rising; Uzan Bazar ferry ghat submerged under heavy showers.",
    sensorCorrelation: "Borjhar Airport AWS (72mm/3hr)",
  },
  {
    id: "WX-9479",
    city: "Shimla",
    state: "Himachal Pradesh",
    x: 380,
    y: 200,
    eventType: "Dust Storm", // Used as unseasonal snow alert proxy
    severity: "mild",
    status: "flagged",
    trustScore: 31,
    timestamp: "1h 12m ago",
    reportsCount: 1,
    snippet: "Claims of 2ft blizzard at Ridge. Flagged: temp is +15.4°C, Swiss Alps stock photo reused.",
    sensorCorrelation: "Shimla Observatory 0.0mm, Clear",
  },
  {
    id: "WX-9478",
    city: "Ahmedabad",
    state: "Gujarat",
    x: 240,
    y: 440,
    eventType: "Strong Wind",
    severity: "severe",
    status: "flagged",
    trustScore: 19,
    timestamp: "1h 25m ago",
    reportsCount: 2,
    snippet: "Hoax claim of EF-3 tornado on SP Ring Road. Flagged: 2022 Oklahoma tornado video reused.",
    sensorCorrelation: "DWR Ahmedabad 0 dBZ, Clear",
  },
  {
    id: "WX-9477",
    city: "Puri",
    state: "Odisha",
    x: 580,
    y: 520,
    eventType: "Strong Wind",
    severity: "severe",
    status: "verified",
    trustScore: 94,
    timestamp: "1h 40m ago",
    reportsCount: 4,
    snippet: "Deep depression coastal gale at 65 km/h. Sea spray entering Swargadwar market.",
    sensorCorrelation: "Puri Coastal AWS #42981",
  },
  {
    id: "WX-9476",
    city: "Kochi",
    state: "Kerala",
    x: 345,
    y: 775,
    eventType: "Flood",
    severity: "moderate",
    status: "verified",
    trustScore: 96,
    timestamp: "2h ago",
    reportsCount: 3,
    snippet: "Arabian Sea wave overtopping sea wall at Vypin Munambam. Coastal roads waterlogged.",
    sensorCorrelation: "Cochin Naval Base AWS (Wave 3.4m)",
  },
  {
    id: "WX-9475",
    city: "Nagpur",
    state: "Maharashtra",
    x: 385,
    y: 475,
    eventType: "Heatwave",
    severity: "severe",
    status: "verified",
    trustScore: 99,
    timestamp: "2h 15m ago",
    reportsCount: 3,
    snippet: "Severe heatwave sustained. Ambient temperature 43.8°C with 22% relative humidity.",
    sensorCorrelation: "Nagpur Sonegaon AWS #4312",
  },
  {
    id: "WX-9474",
    city: "Patna",
    state: "Bihar",
    x: 570,
    y: 360,
    eventType: "Thunderstorm",
    severity: "mild",
    status: "flagged",
    trustScore: 29,
    timestamp: "2h 45m ago",
    reportsCount: 1,
    snippet: "False report of giant hailstones at Gandhi Maidan. Photo matched 2018 Jabalpur news.",
    sensorCorrelation: "Patna Airport AWS 0.0mm, 33°C",
  },
  {
    id: "WX-9473",
    city: "Jaipur",
    state: "Rajasthan",
    x: 320,
    y: 335,
    eventType: "Heatwave",
    severity: "moderate",
    status: "verified",
    trustScore: 95,
    timestamp: "3h ago",
    reportsCount: 3,
    snippet: "Extreme heat index. Surface station recorded 41.6°C with dry westerly winds.",
    sensorCorrelation: "Sanganer IMD AWS #42348",
  },
];

// Top 5 States Stats
const stateStats = [
  { state: "Maharashtra", count: 11, pct: 85, color: "bg-blue-600" },
  { state: "West Bengal", count: 8, pct: 62, color: "bg-purple-600" },
  { state: "Karnataka", count: 7, pct: 54, color: "bg-emerald-600" },
  { state: "Tamil Nadu", count: 5, pct: 38, color: "bg-cyan-600" },
  { state: "Assam", count: 5, pct: 38, color: "bg-amber-600" },
];

export default function MapViewPage() {
  // Layer Mode: "all" | "verified" | "flagged" | "heatmap"
  const [activeLayer, setActiveLayer] = useState<"all" | "verified" | "flagged" | "heatmap">("all");

  // Event Type Filter Chips
  const allEventTypes: MapReport["eventType"][] = [
    "Rainfall",
    "Thunderstorm",
    "Flood",
    "Heatwave",
    "Fog",
    "Dust Storm",
    "Strong Wind",
  ];
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(
    new Set(allEventTypes)
  );

  // Active / Selected Marker for Popup Card
  const [selectedMarker, setSelectedMarker] = useState<MapReport | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<MapReport | null>(null);

  // Side Panel Collapsed State
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  // Zoom / Pan Simulation
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [radarSweepEnabled, setRadarSweepEnabled] = useState(true);

  // Toggle event filter chips
  const toggleEventFilter = (event: string) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(event)) {
        if (next.size > 1) next.delete(event);
      } else {
        next.add(event);
      }
      return next;
    });
  };

  // Select all or reset event filters
  const resetEventFilters = () => {
    setSelectedEvents(new Set(allEventTypes));
  };

  // Filtered reports matching active layer & selected event types
  const visibleReports = useMemo(() => {
    return mapReportsData.filter((report) => {
      // 1. Layer filtering
      if (activeLayer === "verified" && report.status !== "verified") return false;
      if (activeLayer === "flagged" && report.status !== "flagged") return false;

      // 2. Event type filtering
      if (!selectedEvents.has(report.eventType)) return false;

      return true;
    });
  }, [activeLayer, selectedEvents]);

  // Marker Color Configuration by Severity
  // red=severe, orange=moderate, yellow=mild, green=verified-safe
  const getMarkerColor = (report: MapReport) => {
    if (report.severity === "severe") {
      return {
        fill: "#ef4444", // red-500
        ring: "rgba(239, 68, 68, 0.4)",
        stroke: "#b91c1c",
        text: "text-red-600",
        bg: "bg-red-50 text-red-700 border-red-200",
        label: "Severe Warning",
      };
    }
    if (report.severity === "moderate") {
      return {
        fill: "#f97316", // orange-500
        ring: "rgba(249, 115, 22, 0.4)",
        stroke: "#c2410c",
        text: "text-orange-600",
        bg: "bg-orange-50 text-orange-700 border-orange-200",
        label: "Moderate Alert",
      };
    }
    if (report.severity === "mild") {
      return {
        fill: "#eab308", // yellow-500
        ring: "rgba(234, 179, 8, 0.4)",
        stroke: "#a16207",
        text: "text-amber-600",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        label: "Mild / Advisory",
      };
    }
    return {
      fill: "#10b981", // green-500
      ring: "rgba(16, 185, 129, 0.4)",
      stroke: "#047857",
      text: "text-emerald-600",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: "Verified Safe",
    };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Rainfall":
        return CloudRain;
      case "Thunderstorm":
        return CloudLightning;
      case "Flood":
        return Waves;
      case "Heatwave":
        return SunMedium;
      case "Fog":
        return CloudFog;
      case "Dust Storm":
        return Wind;
      case "Strong Wind":
        return Wind;
      default:
        return CloudRain;
    }
  };

  const activePopupReport = selectedMarker || hoveredMarker;

  return (
    <div className="space-y-4 pb-10 font-sans">
      {/* 1. HEADER & CONTROLS */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200/90 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
              Map View — National Weather Intelligence
            </h1>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200 font-mono text-xs"
            >
              {visibleReports.length} Active Nodes
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time geospatial visualization of citizen dispatches, radar sweeps, and sensor telemetry across the Indian subcontinent.
          </p>
        </div>

        {/* Layer Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          <button
            onClick={() => setActiveLayer("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Reports ({mapReportsData.length})
          </button>

          <button
            onClick={() => setActiveLayer("verified")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === "verified"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Only</span>
          </button>

          <button
            onClick={() => setActiveLayer("flagged")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === "flagged"
                ? "bg-white text-rose-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Flagged/Fake</span>
          </button>

          <button
            onClick={() => setActiveLayer("heatmap")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLayer === "heatmap"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Heatmap Density</span>
          </button>
        </div>
      </div>

      {/* EVENT TYPE FILTER CHIPS STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Event Filters:
          </span>

          {allEventTypes.map((type) => {
            const isSelected = selectedEvents.has(type);
            const Icon = getEventIcon(type);

            return (
              <button
                key={type}
                onClick={() => toggleEventFilter(type)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-blue-50 text-blue-900 border-blue-300 shadow-2xs"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3 h-3 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                <span>{type}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {selectedEvents.size < allEventTypes.length && (
            <button
              onClick={resetEventFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Reset All
            </button>
          )}

          <button
            onClick={() => setRadarSweepEnabled(!radarSweepEnabled)}
            className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1 font-medium transition-colors ${
              radarSweepEnabled
                ? "bg-slate-900 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            <Compass className={`w-3 h-3 ${radarSweepEnabled ? "animate-spin" : ""}`} />
            <span>Radar Sweep</span>
          </button>
        </div>
      </div>

      {/* 2. MAP AREA & COLLAPSIBLE SIDE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* MAP CONTAINER (Col 1-8 or Col 1-12 when side panel closed) */}
        <div
          className={`${
            sidePanelOpen ? "lg:col-span-8" : "lg:col-span-12"
          } transition-all duration-300 relative rounded-2xl border border-slate-300/80 bg-slate-950 overflow-hidden shadow-lg aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-[620px]`}
        >
          {/* Top Left Floating Map Controls */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 flex flex-col gap-1 shadow-md">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
                className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg text-xs"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg text-xs"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="w-7 h-7 flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg text-xs"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <Badge className="bg-slate-900/90 text-slate-300 border-slate-700 text-[10px] font-mono px-2 py-1 backdrop-blur-xs shadow-md">
              Grid: WGS84 • Zoom {(zoomLevel * 100).toFixed(0)}%
            </Badge>
          </div>

          {/* Top Right: Toggle Side Panel Button */}
          <button
            onClick={() => setSidePanelOpen(!sidePanelOpen)}
            className="absolute top-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md transition-colors"
          >
            {sidePanelOpen ? (
              <>
                <span>Hide List</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Show Visible ({visibleReports.length})</span>
              </>
            )}
          </button>

          {/* Bottom Left Corner: Map Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-lg text-[11px] text-slate-300 space-y-1.5 max-w-xs">
            <span className="font-bold text-white text-xs block font-heading border-b border-slate-800 pb-1">
              Marker Severity Legend
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>Severe Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>Moderate Alert</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>Mild Advisory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Verified Safe</span>
              </div>
            </div>
          </div>

          {/* Interactive Hover / Click Popup Card Overlay */}
          {activePopupReport && (
            <div
              className="absolute z-30 pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-3.5 shadow-2xl w-72 text-xs text-slate-800 transition-all duration-150 animate-in fade-in zoom-in-95"
              style={{
                // Position popup intelligently based on marker coordinates
                left: `${Math.min(Math.max((activePopupReport.x / 800) * 100, 10), 65)}%`,
                top: `${Math.min(Math.max((activePopupReport.y / 850) * 100 - 15, 8), 65)}%`,
              }}
            >
              <div className="flex items-start justify-between gap-1 pb-1.5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-blue-900 text-xs">
                      {activePopupReport.id}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] px-1.5 py-0 font-semibold ${
                        getMarkerColor(activePopupReport).bg
                      }`}
                    >
                      {activePopupReport.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    {activePopupReport.city}, {activePopupReport.state}
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setSelectedMarker(null);
                    setHoveredMarker(null);
                  }}
                  className="text-slate-400 hover:text-slate-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="py-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Event: <strong className="text-slate-800">{activePopupReport.eventType}</strong></span>
                  <span>{activePopupReport.timestamp}</span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed italic bg-slate-50 p-1.5 rounded-md">
                  &ldquo;{activePopupReport.snippet}&rdquo;
                </p>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">AI Trust Score:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {activePopupReport.trustScore}% ({activePopupReport.status})
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        activePopupReport.trustScore >= 70
                          ? "bg-emerald-500"
                          : activePopupReport.trustScore >= 40
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${activePopupReport.trustScore}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1 truncate">
                  Telemetry: {activePopupReport.sensorCorrelation}
                </div>
              </div>
            </div>
          )}

          {/* MAIN STYLIZED SVG MAP AREA */}
          <div
            className="w-full h-full flex items-center justify-center p-2 transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 800 850"
              className="w-full h-full max-h-[600px] select-none"
              style={{ filter: "drop-shadow(0 0 20px rgba(14, 165, 233, 0.15))" }}
            >
              <defs>
                {/* Radar Grid Pattern */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>

                {/* Radar Sweep Gradient */}
                <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </linearGradient>

                {/* Heatmap Radial Gradients */}
                <radialGradient id="heatRed">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="heatOrange">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#eab308" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Grid Lines */}
              <rect width="800" height="850" fill="url(#grid)" />

              {/* Radar Concentric Rings centered roughly on Central India (400, 480) */}
              <circle cx="400" cy="480" r="120" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="400" cy="480" r="220" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="400" cy="480" r="320" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Rotating Radar Sweep Cone Simulation */}
              {radarSweepEnabled && (
                <g className="origin-[400px_480px] animate-spin" style={{ animationDuration: "14s" }}>
                  <path
                    d="M 400 480 L 150 200 A 350 350 0 0 1 400 130 Z"
                    fill="url(#sweepGrad)"
                  />
                </g>
              )}

              {/* STYLIZED INDIA MAP OUTLINE */}
              {/* Note: Stylized boundary polygon representing the Indian mainland & coastlines */}
              <path
                d="M 345 80
                   C 365 70, 390 90, 400 115
                   C 415 130, 430 155, 415 185
                   C 425 200, 455 215, 485 230
                   C 525 240, 575 260, 615 280
                   C 635 270, 655 280, 665 300
                   C 685 300, 715 295, 755 310
                   C 785 320, 795 350, 775 380
                   C 755 400, 735 420, 720 410
                   C 705 390, 685 380, 670 390
                   C 655 410, 645 440, 650 470
                   C 635 490, 605 520, 575 540
                   C 545 570, 495 610, 465 660
                   C 445 690, 435 730, 415 770
                   C 395 805, 375 830, 355 835
                   C 340 820, 335 780, 330 740
                   C 320 690, 305 640, 290 600
                   C 270 570, 255 530, 250 490
                   C 230 490, 205 480, 190 460
                   C 170 440, 165 410, 195 400
                   C 170 380, 180 360, 210 355
                   C 230 350, 250 330, 270 300
                   C 285 270, 300 230, 320 180
                   C 325 150, 330 110, 345 80 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeOpacity="0.75"
                className="transition-colors hover:stroke-cyan-400"
              />

              {/* Secondary Coastline Glow Shadow */}
              <path
                d="M 345 80
                   C 365 70, 390 90, 400 115
                   C 415 130, 430 155, 415 185
                   C 425 200, 455 215, 485 230
                   C 525 240, 575 260, 615 280
                   C 635 270, 655 280, 665 300
                   C 685 300, 715 295, 755 310
                   C 785 320, 795 350, 775 380
                   C 755 400, 735 420, 720 410
                   C 705 390, 685 380, 670 390
                   C 655 410, 645 440, 650 470
                   C 635 490, 605 520, 575 540
                   C 545 570, 495 610, 465 660
                   C 445 690, 435 730, 415 770
                   C 395 805, 375 830, 355 835
                   C 340 820, 335 780, 330 740
                   C 320 690, 305 640, 290 600
                   C 270 570, 255 530, 250 490
                   C 230 490, 205 480, 190 460
                   C 170 440, 165 410, 195 400
                   C 170 380, 180 360, 210 355
                   C 230 350, 250 330, 270 300
                   C 285 270, 300 230, 320 180
                   C 325 150, 330 110, 345 80 Z"
                fill="none"
                stroke="#0284c7"
                strokeWidth="6"
                strokeOpacity="0.25"
                filter="blur(3px)"
              />

              {/* State / Regional Hub Connecting Corridors (Subtle GIS vectors) */}
              <g stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3">
                <line x1="375" y1="275" x2="260" y2="555" /> {/* Delhi - Mumbai */}
                <line x1="375" y1="275" x2="635" y2="455" /> {/* Delhi - Kolkata */}
                <line x1="260" y1="555" x2="365" y2="700" /> {/* Mumbai - Bengaluru */}
                <line x1="365" y1="700" x2="430" y2="705" /> {/* Bengaluru - Chennai */}
                <line x1="430" y1="705" x2="635" y2="455" /> {/* Chennai - Kolkata */}
                <line x1="635" y1="455" x2="730" y2="345" /> {/* Kolkata - Guwahati */}
                <line x1="260" y1="555" x2="395" y2="580" /> {/* Mumbai - Hyderabad */}
              </g>

              {/* HEATMAP DENSITY OVERLAY LAYER (When Heatmap tab active) */}
              {activeLayer === "heatmap" && (
                <g>
                  {/* Mumbai Density Blob */}
                  <circle cx="260" cy="555" r="75" fill="url(#heatRed)" />
                  {/* Bengaluru Density Blob */}
                  <circle cx="365" cy="700" r="60" fill="url(#heatOrange)" />
                  {/* Siliguri Density Blob */}
                  <circle cx="675" cy="335" r="55" fill="url(#heatRed)" />
                  {/* Delhi Density Blob */}
                  <circle cx="375" cy="275" r="65" fill="url(#heatOrange)" />
                  {/* Chennai Density Blob */}
                  <circle cx="430" cy="705" r="55" fill="url(#heatRed)" />
                </g>
              )}

              {/* PULSING INTERACTIVE WEATHER REPORT MARKERS */}
              {visibleReports.map((report) => {
                const markerConfig = getMarkerColor(report);
                const isSelected = selectedMarker?.id === report.id;
                const isHovered = hoveredMarker?.id === report.id;

                return (
                  <g
                    key={report.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedMarker(report)}
                    onMouseEnter={() => setHoveredMarker(report)}
                    onMouseLeave={() => setHoveredMarker(null)}
                  >
                    {/* Pulsing Outer Radar Ring */}
                    <circle
                      cx={report.x}
                      cy={report.y}
                      r={isSelected || isHovered ? "22" : "15"}
                      fill={markerConfig.ring}
                      className="animate-ping"
                      style={{ animationDuration: "3s" }}
                    />

                    {/* Outer Glow Halo */}
                    <circle
                      cx={report.x}
                      cy={report.y}
                      r={isSelected || isHovered ? "16" : "11"}
                      fill={markerConfig.ring}
                    />

                    {/* Solid Center Dot */}
                    <circle
                      cx={report.x}
                      cy={report.y}
                      r={isSelected || isHovered ? "8" : "6"}
                      fill={markerConfig.fill}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />

                    {/* City Name Label */}
                    <text
                      x={report.x}
                      y={report.y - 12}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="10"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none drop-shadow-md select-none font-sans"
                    >
                      {report.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* SIDE PANEL (Right side list view of currently visible markers) */}
        {sidePanelOpen && (
          <div className="lg:col-span-4 space-y-3">
            <Card className="border-slate-200/90 bg-white shadow-xs rounded-2xl overflow-hidden">
              <CardHeader className="p-3.5 pb-2 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xs font-bold text-slate-900 tracking-wide uppercase font-heading">
                      Active Weather Hotspots
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-500">
                      Showing {visibleReports.length} synced locations
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-800 border-blue-200">
                    Auto-Synced
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-2 space-y-2 max-h-[540px] overflow-y-auto">
                {visibleReports.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No active markers match current filters.
                  </div>
                ) : (
                  visibleReports.map((report) => {
                    const markerConfig = getMarkerColor(report);
                    const isSelected = selectedMarker?.id === report.id;
                    const EventIcon = getEventIcon(report.eventType);

                    return (
                      <div
                        key={report.id}
                        onClick={() => setSelectedMarker(report)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-xs text-blue-900">
                                {report.id}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-800">
                                {report.city}, {report.state}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-2.5 h-2.5 text-slate-400" />
                              {report.timestamp} • {report.reportsCount} dispatches
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${markerConfig.bg}`}
                          >
                            {report.eventType}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                          {report.snippet}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px]">
                          <span className="text-slate-400 truncate max-w-[170px]">
                            {report.sensorCorrelation}
                          </span>
                          <span className="font-mono font-bold text-slate-700">
                            Trust: {report.trustScore}%
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 3. BOTTOM STATS STRIP: Regional Breakdown (Top 5 States) */}
      <Card className="border-slate-200/90 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Regional Incident Density by State
            </h3>
            <p className="text-xs text-slate-500">
              Top 5 meteorological reporting corridors across IMD regional centers.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span>Total Active Reports: <strong className="text-slate-900">42</strong></span>
            <span>Ground Radars: <strong className="text-blue-600">39 Online</strong></span>
          </div>
        </div>

        {/* Top 5 States Horizontal Bar List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {stateStats.map((item) => (
            <div key={item.state} className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{item.state}</span>
                <span className="font-mono font-bold text-slate-900">{item.count} reports</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Density index</span>
                <span>{item.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
