"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  MapPin,
  Clock,
  Calendar,
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  Wind,
  CloudFog,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  Search,
  Filter,
  Layers,
  LayoutGrid,
  List,
  Eye,
  ExternalLink,
  Copy,
  Check,
  X,
  MessageSquare,
  Smartphone,
  Radio,
  Satellite,
  User,
  Activity,
  Sparkles,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Send,
  Camera,
  Flame,
  FileCheck2,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Types
export interface MediaItem {
  id: string;
  type: "photo" | "video";
  url: string;
  thumbnailTitle: string;
  caption: string;
  duration?: string;
  exifClean: boolean;
  resolution: string;
  camera: string;
  timestamp: string;
}

export interface VerificationReport {
  id: string;
  timestamp: string;
  exactDateTime: string;
  city: string;
  state: string;
  landmark: string;
  gps: { lat: number; lng: number };
  eventType: "Flash Flood" | "Severe Rainfall" | "Thunderstorm & Hail" | "Severe Dust Storm" | "High Tide Surge" | "Urban Waterlogging" | "Snow Blizzard" | "Extreme Heatwave";
  eventSeverity: "Moderate" | "Severe" | "Extreme" | "Critical";
  source: "Twitter/X" | "Citizen App" | "API" | "Doppler DWR";
  sourceUser: {
    name: string;
    handle: string;
    history: string;
    totalSubmitted: number;
    totalVerified: number;
    reliabilityScore: number;
    device: string;
    joined: string;
    isVerifiedUser: boolean;
  };
  media: MediaItem[];
  description: string;
  trustScore: number; // 0 - 100
  status: "pending" | "flagged" | "verified";
  aiFlags: {
    label: string;
    type: "danger" | "warning" | "info";
    detail: string;
  }[];
  aiAnalysis: {
    duplicateDetection: {
      isDuplicate: boolean;
      clusterId?: string;
      similarity: number;
      clusterSummary: string;
      similarReports: { id: string; distance: string; timeDelta: string; matchPct: number }[];
    };
    imageForensics: {
      ganFakeScore: number; // e.g. 1.8%
      exifStatus: "Verified Authentic" | "Altered/Stripped" | "Inconclusive";
      reverseImageHits: number;
      sourcePlatform?: string;
      notes: string;
    };
    nlpSentiment: {
      urgency: "Critical" | "High" | "Moderate" | "Low";
      authenticityScore: number;
      spamRisk: number;
      extractedEntities: string[];
    };
    telemetryValidation: {
      nearestStation: string;
      distance: string;
      observedMetric: string;
      radarReflectivity: string;
      telemetryCorrelation: "Strong Agreement" | "Partial Match" | "Direct Contradiction" | "No Nearby Station";
    };
  };
  analystNotes?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  flagReason?: string;
  infoRequested?: boolean;
}

// Initial Realistic Indian Meteorological Reports Data
const initialReports: VerificationReport[] = [
  {
    id: "WX-9488",
    timestamp: "8 mins ago",
    exactDateTime: "26 Sep 2026, 11:42 IST",
    city: "Mumbai Suburban",
    state: "Maharashtra",
    landmark: "Milan Subway & SV Road Underpass, Santacruz",
    gps: { lat: 19.0833, lng: 72.8425 },
    eventType: "Flash Flood",
    eventSeverity: "Critical",
    source: "Citizen App",
    sourceUser: {
      name: "Rohan Kulkarni",
      handle: "@rohank_mumbai",
      history: "12 reports submitted, 11 verified",
      totalSubmitted: 12,
      totalVerified: 11,
      reliabilityScore: 91.6,
      device: "Samsung Galaxy S24 Ultra • Android 15 • IMD Citizen v3.4.1",
      joined: "March 2024",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-1",
        type: "video",
        url: "/placeholder-flood-1.jpg",
        thumbnailTitle: "Water level submerged vehicle wheels at Milan Subway",
        caption: "Vehicles submerged up to windshield level; pedestrians wading in waist-deep water.",
        duration: "0:34",
        exifClean: true,
        resolution: "3840 x 2160 (4K)",
        camera: "Galaxy S24 Ultra 24mm f/1.7",
        timestamp: "26-09-2026 11:39 IST",
      },
      {
        id: "m-2",
        type: "photo",
        url: "/placeholder-flood-2.jpg",
        thumbnailTitle: "Storm drain discharge failure",
        caption: "Subway pump station completely overwhelmed by reverse tidal flow.",
        exifClean: true,
        resolution: "4032 x 3024",
        camera: "Galaxy S24 Ultra 50MP",
        timestamp: "26-09-2026 11:40 IST",
      },
    ],
    description: "Milan Subway water level crossed 4 feet rapidly within 25 minutes of continuous torrential downpour. Two BEST feeder buses stuck on approach ramp. Commuters rescued onto median.",
    trustScore: 89,
    status: "pending",
    aiFlags: [
      { label: "Corroborated by Santacruz AWS (64.2mm/hr)", type: "info", detail: "Surface station #43003 recorded heavy rain burst matching report timestamp." },
      { label: "High spatial cluster density", type: "info", detail: "4 corroborating citizen uploads detected within 1.2km radius in past 15 mins." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "CL-MUM-402",
        similarity: 92,
        clusterSummary: "Cluster of 5 incident reports covering Santacruz-Vile Parle subway corridor.",
        similarReports: [
          { id: "WX-9485", distance: "450m", timeDelta: "4 mins ago", matchPct: 94 },
          { id: "WX-9479", distance: "900m", timeDelta: "12 mins ago", matchPct: 88 },
        ],
      },
      imageForensics: {
        ganFakeScore: 1.4,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Digital signature and GPS geotag correlate precisely with cellular base station tower handover.",
      },
      nlpSentiment: {
        urgency: "Critical",
        authenticityScore: 94,
        spamRisk: 2,
        extractedEntities: ["Milan Subway", "Santacruz", "BEST Bus", "Waist-deep water", "4 feet"],
      },
      telemetryValidation: {
        nearestStation: "Santacruz IMD Observatory (AWS #43003)",
        distance: "1.4 km",
        observedMetric: "64.2 mm/hr precipitation, 98% RH",
        radarReflectivity: "51.5 dBZ (Intense precipitation core)",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Corroborated with Mumbai Traffic Police twitter alert #29. Subway closed to vehicular traffic.",
  },
  {
    id: "WX-9487",
    timestamp: "16 mins ago",
    exactDateTime: "26 Sep 2026, 11:32 IST",
    city: "Siliguri",
    state: "West Bengal",
    landmark: "Hill Cart Road & Pradhan Nagar Ward 3",
    gps: { lat: 26.7271, lng: 88.4316 },
    eventType: "Thunderstorm & Hail",
    eventSeverity: "Severe",
    source: "Citizen App",
    sourceUser: {
      name: "Anirban Sen",
      handle: "@anirban_slg",
      history: "16 reports submitted, 16 verified",
      totalSubmitted: 16,
      totalVerified: 16,
      reliabilityScore: 100,
      device: "OnePlus 12 • Android 15 • IMD Citizen v3.4.1",
      joined: "Jan 2024",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-3",
        type: "photo",
        url: "/placeholder-hail-1.jpg",
        thumbnailTitle: "Golf ball sized hail stones next to 5-rupee coin",
        caption: "Hail diameter measured ~3.8cm; shattered corrugated tin roof and windshields.",
        exifClean: true,
        resolution: "4096 x 3072",
        camera: "OnePlus 12 Sony LYT-808",
        timestamp: "26-09-2026 11:29 IST",
      },
    ],
    description: "Violent thunderstorm accompanied by high velocity squall and extensive hail. Hailstones measuring 3-4 cm in diameter caused damage to parked vehicles and tin roofs in Pradhan Nagar.",
    trustScore: 94,
    status: "pending",
    aiFlags: [
      { label: "Doppler DWR Bagdogra Hail Core Detected", type: "info", detail: "Radar reflectivity spiked at 56 dBZ with pronounced differential reflectivity (ZDR) drop." },
      { label: "Gold Contributor Reporter", type: "info", detail: "Citizen has 100% past verification accuracy rating across 16 submissions." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 38,
        clusterSummary: "First primary hail observation in Siliguri northern sector today.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.9,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Coin reference size verified via object detection bounding box (scale ratio 1.54x).",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 96,
        spamRisk: 1,
        extractedEntities: ["Pradhan Nagar", "Hailstorm", "Roof damage", "Squall", "3-4 cm"],
      },
      telemetryValidation: {
        nearestStation: "Bagdogra Airport Weather Radar (DWR)",
        distance: "11.2 km",
        observedMetric: "Wind gust 72 km/h, 56 dBZ core aloft at 4.2 km",
        radarReflectivity: "56 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Forwarded to North Bengal Regional Disaster Control Room for hailstorm advisory update.",
  },
  {
    id: "WX-9486",
    timestamp: "25 mins ago",
    exactDateTime: "26 Sep 2026, 11:23 IST",
    city: "Bikaner",
    state: "Rajasthan",
    landmark: "NH-11 Bypass & Karni Industrial Area",
    gps: { lat: 28.0229, lng: 73.3119 },
    eventType: "Severe Dust Storm",
    eventSeverity: "Critical",
    source: "Twitter/X",
    sourceUser: {
      name: "StormTracker India",
      handle: "@storm_india_viral",
      history: "28 reports submitted, 4 verified",
      totalSubmitted: 28,
      totalVerified: 4,
      reliabilityScore: 14.2,
      device: "Twitter Web App / Third-party automation bot",
      joined: "August 2025",
      isVerifiedUser: false,
    },
    media: [
      {
        id: "m-4",
        type: "video",
        url: "/placeholder-dust-1.jpg",
        thumbnailTitle: "Massive dark wall of dust swallowing skyline",
        caption: "Huge haboob black wall of sand covering highway within 30 seconds.",
        duration: "0:45",
        exifClean: false,
        resolution: "1280 x 720",
        camera: "Unknown / Compressed Re-upload",
        timestamp: "Unknown (Stripped)",
      },
    ],
    description: "Apocalyptic black dust storm wall just hit Bikaner outer bypass! Day turned completely into pitch dark night, zero visibility on NH-11 right now! Stay indoors!",
    trustScore: 24,
    status: "pending",
    aiFlags: [
      { label: "Reverse image match found (May 2021 Rajasthan storm)", type: "danger", detail: "AI visual match engine found 99.1% perceptual hash match with viral video from 18 May 2021." },
      { label: "Doppler Radar shows 0 dBZ (Clear sky)", type: "danger", detail: "IMD Doppler radar Bikaner reports no convective dust cloud or squall within 80km." },
      { label: "Low source credibility", type: "danger", detail: "Account has 85.8% rejection rate for circulating recycled storm clips." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "HOAX-ARC-2021-DUST",
        similarity: 99,
        clusterSummary: "Identical video match with historical archive footage recorded during Cyclone Tauktae dust squall.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 12.3,
        exifStatus: "Altered/Stripped",
        reverseImageHits: 14,
        sourcePlatform: "YouTube Archives (May 2021) / Viral Twitter thread",
        notes: "Video shows heavy compression degradation, duplicated audio track, and missing camera raw EXIF.",
      },
      nlpSentiment: {
        urgency: "Critical",
        authenticityScore: 28,
        spamRisk: 86,
        extractedEntities: ["Bikaner", "NH-11", "Black dust storm", "Apocalyptic", "Zero visibility"],
      },
      telemetryValidation: {
        nearestStation: "Bikaner Civil Aerodrome AWS",
        distance: "3.8 km",
        observedMetric: "Wind 12 km/h NW, Visibility 5,000m, Temp 38.6°C",
        radarReflectivity: "0 dBZ (Clear Atmosphere)",
        telemetryCorrelation: "Direct Contradiction",
      },
    },
    analystNotes: "",
  },
  {
    id: "WX-9485",
    timestamp: "34 mins ago",
    exactDateTime: "26 Sep 2026, 11:14 IST",
    city: "Bengaluru Urban",
    state: "Karnataka",
    landmark: "Bellandur EcoSpace / Outer Ring Road Service Lane",
    gps: { lat: 12.9260, lng: 77.6762 },
    eventType: "Urban Waterlogging",
    eventSeverity: "Moderate",
    source: "Twitter/X",
    sourceUser: {
      name: "Priya Raman",
      handle: "@priya_raman_blr",
      history: "6 reports submitted, 5 verified",
      totalSubmitted: 6,
      totalVerified: 5,
      reliabilityScore: 83.3,
      device: "iPhone 15 Pro • Twitter for iOS",
      joined: "November 2023",
      isVerifiedUser: false,
    },
    media: [
      {
        id: "m-5",
        type: "photo",
        url: "/placeholder-blr-1.jpg",
        thumbnailTitle: "Waterlogging outside Bellandur tech park gate",
        caption: "Two wheelers stalled; knee deep water accumulated near bus stop on ORR.",
        exifClean: true,
        resolution: "3024 x 4032",
        camera: "iPhone 15 Pro Main Camera",
        timestamp: "26-09-2026 11:11 IST",
      },
    ],
    description: "Bellandur ORR outside EcoSpace has turned into a lake again after 40 mins of heavy rain. Several tech park company shuttles stuck. Water reaching bumper height.",
    trustScore: 68,
    status: "pending",
    aiFlags: [
      { label: "Moderate telemetry agreement with HAL AWS", type: "warning", detail: "HAL Airport station registered 31.5mm rain in past 45 mins. Localized runoff likely." },
      { label: "Geotag inferred from road signage NLP", type: "info", detail: "OCR detected 'Outer Ring Road - Kadubeesanahalli' road signboard in photo." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "CL-BLR-ORR-02",
        similarity: 78,
        clusterSummary: "Cluster of 3 independent citizen social posts regarding Bellandur traffic jam.",
        similarReports: [
          { id: "WX-9480", distance: "320m", timeDelta: "15 mins ago", matchPct: 81 },
        ],
      },
      imageForensics: {
        ganFakeScore: 2.1,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Color palette and rain reflections on asphalt match midday light conditions.",
      },
      nlpSentiment: {
        urgency: "Moderate",
        authenticityScore: 88,
        spamRisk: 6,
        extractedEntities: ["Bellandur", "EcoSpace", "Outer Ring Road", "Knee deep water", "Company shuttles"],
      },
      telemetryValidation: {
        nearestStation: "Bengaluru HAL Airport Observatory",
        distance: "4.7 km",
        observedMetric: "31.5 mm rainfall, Wind 24 km/h gusting to 38 km/h",
        radarReflectivity: "42 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Traffic police notified. Waterlogging confirmed near Bellandur lake overflow culvert.",
  },
  {
    id: "WX-9484",
    timestamp: "45 mins ago",
    exactDateTime: "26 Sep 2026, 11:02 IST",
    city: "Chennai",
    state: "Tamil Nadu",
    landmark: "Foreshore Estate Promenade & Marina Beach Loop Road",
    gps: { lat: 13.0336, lng: 80.2798 },
    eventType: "High Tide Surge",
    eventSeverity: "Severe",
    source: "Citizen App",
    sourceUser: {
      name: "K. Saravanan",
      handle: "@saravanan_coastal",
      history: "21 reports submitted, 20 verified",
      totalSubmitted: 21,
      totalVerified: 20,
      reliabilityScore: 95.2,
      device: "Google Pixel 8 • Android 15 • IMD Citizen v3.4.1",
      joined: "May 2023",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-6",
        type: "video",
        url: "/placeholder-chennai-1.jpg",
        thumbnailTitle: "Waves cresting over Marina beach stone berms",
        caption: "Tidal surge inundating catamaran parking lots and fishing net shelters.",
        duration: "0:22",
        exifClean: true,
        resolution: "1920 x 1080",
        camera: "Pixel 8 12MP Ultra-wide",
        timestamp: "26-09-2026 10:58 IST",
      },
      {
        id: "m-7",
        type: "photo",
        url: "/placeholder-chennai-2.jpg",
        thumbnailTitle: "Coastal road sea spray and sand deposits",
        caption: "Sea water rushing onto Loop Road; police cordoning off pedestrian beach access.",
        exifClean: true,
        resolution: "4032 x 3024",
        camera: "Pixel 8 Main Sensor",
        timestamp: "26-09-2026 11:00 IST",
      },
    ],
    description: "High spring tide coupled with strong easterly onshore gusts causing sea water to surge across Foreshore Estate sand banks onto Loop Road. Fishermen hauling boats onto higher ground.",
    trustScore: 84,
    status: "pending",
    aiFlags: [
      { label: "INCOIS Coastal Alert Corroborated", type: "info", detail: "INCOIS Ocean State forecast flagged swell surge alert for South Chennai coastline." },
      { label: "Chennai Port Tide Gauge Anomaly (+1.2m)", type: "info", detail: "Observed tide height is 1.18m above predicted astronomical tide table." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 42,
        clusterSummary: "Correlates with coastal surge sequence along Bay of Bengal shoreline.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.8,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "GPS coordinates, altitude, and device accelerometer stamp verify live recording.",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 95,
        spamRisk: 1,
        extractedEntities: ["Foreshore Estate", "Marina Loop Road", "Spring tide", "Fishermen boats", "Seawater surge"],
      },
      telemetryValidation: {
        nearestStation: "Chennai Port Trust Tide Monitoring Station",
        distance: "5.1 km",
        observedMetric: "Tidal anomaly +1.18m, Sea surface temp 29.4°C, Wind 44 km/h ENE",
        radarReflectivity: "28 dBZ (Coastal drizzle bands)",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Alerted Greater Chennai Corporation Disaster cell & Coastal Security Group.",
  },
  {
    id: "WX-9483",
    timestamp: "58 mins ago",
    exactDateTime: "26 Sep 2026, 10:50 IST",
    city: "Shimla",
    state: "Himachal Pradesh",
    landmark: "The Ridge & Mall Road Promenade",
    gps: { lat: 31.1048, lng: 77.1734 },
    eventType: "Snow Blizzard",
    eventSeverity: "Critical",
    source: "Twitter/X",
    sourceUser: {
      name: "Breaking Viral News",
      handle: "@india_unfiltered_live",
      history: "41 reports submitted, 3 verified",
      totalSubmitted: 41,
      totalVerified: 3,
      reliabilityScore: 7.3,
      device: "Web automation interface",
      joined: "July 2025",
      isVerifiedUser: false,
    },
    media: [
      {
        id: "m-8",
        type: "photo",
        url: "/placeholder-blizzard-1.jpg",
        thumbnailTitle: "Heavy 2-foot snow accumulation on European chalet roofs",
        caption: "Claims of severe blizzard shutting down Shimla Ridge and Kalka highway.",
        exifClean: false,
        resolution: "1920 x 1080",
        camera: "Stock Photography Source",
        timestamp: "Unknown",
      },
    ],
    description: "Shocking unseasonal massive blizzard hit Shimla Ridge today! Over 2 feet of deep snow reported, roads blocked, sub-zero freeze across the hill station! Emergency alert declared!",
    trustScore: 31,
    status: "pending",
    aiFlags: [
      { label: "Temperature Anomaly: Station reads +15.4°C", type: "danger", detail: "Shimla Observatory surface thermometer reads +15.4°C. Snowfall is physically impossible." },
      { label: "Reverse image match: Swiss Alps stock photo (2019)", type: "danger", detail: "AI perceptual hash matched Getty stock image #98124 taken in Zermatt, Switzerland." },
      { label: "Misinformation pattern detected", type: "danger", detail: "Account repeatedly distributes sensationalized clickbait weather content." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "HOAX-SHIMLA-SNOW-2026",
        similarity: 98,
        clusterSummary: "Identified as part of an automated clickbait spam ring targeting domestic tourist queries.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 18.6,
        exifStatus: "Altered/Stripped",
        reverseImageHits: 29,
        sourcePlatform: "European Travel Stock Archives (2019)",
        notes: "Architecture in background shows European chalet gables, not Himachal heritage structures.",
      },
      nlpSentiment: {
        urgency: "Critical",
        authenticityScore: 19,
        spamRisk: 92,
        extractedEntities: ["Shimla Ridge", "Blizzard", "2 feet snow", "Sub-zero", "Emergency alert"],
      },
      telemetryValidation: {
        nearestStation: "Shimla IMD Meteorological Centre",
        distance: "1.2 km",
        observedMetric: "Temp +15.4°C, RH 54%, Wind 6 km/h, Weather: Clear Sky",
        radarReflectivity: "0 dBZ",
        telemetryCorrelation: "Direct Contradiction",
      },
    },
    analystNotes: "",
  },
  {
    id: "WX-9482",
    timestamp: "1 hr 12 mins ago",
    exactDateTime: "26 Sep 2026, 10:36 IST",
    city: "Guwahati",
    state: "Assam",
    landmark: "Uzan Bazar Riverside Ghat & Brahmaputra Walkway",
    gps: { lat: 26.1923, lng: 91.7580 },
    eventType: "Severe Rainfall",
    eventSeverity: "Severe",
    source: "Citizen App",
    sourceUser: {
      name: "Bhaskar Das",
      handle: "@bhaskar_assam",
      history: "9 reports submitted, 8 verified",
      totalSubmitted: 9,
      totalVerified: 8,
      reliabilityScore: 88.9,
      device: "Vivo V30 Pro • Android 15 • IMD Citizen v3.4.1",
      joined: "February 2024",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-9",
        type: "photo",
        url: "/placeholder-ghy-1.jpg",
        thumbnailTitle: "Submerged riverfront steps at Uzan Bazar",
        caption: "Brahmaputra river level overflowing past second tier of ghat steps.",
        exifClean: true,
        resolution: "4000 x 3000",
        camera: "Vivo V30 Pro Zeiss Optics",
        timestamp: "26-09-2026 10:32 IST",
      },
      {
        id: "m-10",
        type: "photo",
        url: "/placeholder-ghy-2.jpg",
        thumbnailTitle: "Stormwater runoff culvert near riverside road",
        caption: "Muddy monsoonal runoff washing across pedestrian promenade.",
        exifClean: true,
        resolution: "4000 x 3000",
        camera: "Vivo V30 Pro",
        timestamp: "26-09-2026 10:34 IST",
      },
    ],
    description: "Incessant heavy monsoon showers since dawn. Brahmaputra river level has risen sharply at Uzan Bazar, completely submerging the public walking promenade and lower river ferry pontoons.",
    trustScore: 82,
    status: "pending",
    aiFlags: [
      { label: "Borjhar Airport AWS Corroborated (72mm/3hr)", type: "info", detail: "Sustained heavy monsoonal precipitation recorded by regional airport automated rain gauge." },
      { label: "CWC Guwahati Gauge Trending High", type: "info", detail: "Central Water Commission hydrological station shows river level rising at 4.2 cm/hr." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 46,
        clusterSummary: "Consistent with regional monsoon synoptic pattern across Kamrup Metropolitan.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 1.1,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Camera EXIF, shutter speed, and muddy water particulate motion match natural physics.",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 92,
        spamRisk: 2,
        extractedEntities: ["Uzan Bazar", "Brahmaputra", "River ferry pontoons", "Promenade submerged", "Heavy showers"],
      },
      telemetryValidation: {
        nearestStation: "Borjhar Airport IMD Station",
        distance: "16.8 km",
        observedMetric: "Cumulative 72.4 mm rainfall over 3 hours, Visibility 2,500m",
        radarReflectivity: "46 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Notified Inland Waterways Authority of India (IWAI) ferry cell regarding pontoon submergence.",
  },
  {
    id: "WX-9481",
    timestamp: "1 hr 25 mins ago",
    exactDateTime: "26 Sep 2026, 10:22 IST",
    city: "Hyderabad",
    state: "Telangana",
    landmark: "Gachibowli Flyover & Telecom Nagar Junction",
    gps: { lat: 17.4401, lng: 78.3489 },
    eventType: "Urban Waterlogging",
    eventSeverity: "Moderate",
    source: "API",
    sourceUser: {
      name: "GHMC Smart City Inundation Sensor Network",
      handle: "@ghmc_iot_telemetry",
      history: "180 reports submitted, 154 verified",
      totalSubmitted: 180,
      totalVerified: 154,
      reliabilityScore: 85.5,
      device: "Ultrasonic Hydro-Acoustic Sensor IoT Node #GCH-14",
      joined: "October 2023",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-11",
        type: "photo",
        url: "/placeholder-cctv-hyd.jpg",
        thumbnailTitle: "Municipal CCTV snapshot of Gachibowli junction",
        caption: "Water pooling beneath flyover ramp; traffic moving at slow crawl.",
        exifClean: true,
        resolution: "1280 x 720 (CCTV)",
        camera: "Hikvision IP CCTV #HYD-TFC-88",
        timestamp: "26-09-2026 10:20 IST",
      },
    ],
    description: "Ultrasonic sensor #GCH-14 triggered automated flood alert: standing water depth exceeds 38cm on east-bound carriageway under Gachibowli flyover. Slow movement toward Bio-Diversity junction.",
    trustScore: 56,
    status: "pending",
    aiFlags: [
      { label: "Sensor noise anomaly detected (Possible transducer drift)", type: "warning", detail: "Acoustic reflection profile indicates potential leaves or debris interference on transducer head." },
      { label: "Traffic camera shows moderate accumulation", type: "info", detail: "Computer vision vehicle wheel submergence metric estimates 18-22cm actual depth." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "CL-HYD-GCB-01",
        similarity: 72,
        clusterSummary: "Matches 2 citizen tweets regarding slow traffic near Bio-Diversity junction.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.5,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Direct encrypted RTSP stream snapshot with government cryptographic watermark.",
      },
      nlpSentiment: {
        urgency: "Moderate",
        authenticityScore: 86,
        spamRisk: 4,
        extractedEntities: ["Gachibowli flyover", "Telecom Nagar", "Sensor GCH-14", "38cm standing water"],
      },
      telemetryValidation: {
        nearestStation: "Hyderabad Central University (HCU) AWS",
        distance: "3.2 km",
        observedMetric: "22.8 mm rainfall in 30 mins, Wind 18 km/h",
        radarReflectivity: "38 dBZ",
        telemetryCorrelation: "Partial Match",
      },
    },
    analystNotes: "Sensor depth adjusted to 22cm based on manual CCTV inspection.",
  },

  // Pre-Flagged Fake / Suspicious Reports (For Flagged tab)
  {
    id: "WX-9478",
    timestamp: "2 hrs ago",
    exactDateTime: "26 Sep 2026, 09:45 IST",
    city: "Ahmedabad",
    state: "Gujarat",
    landmark: "SP Ring Road & Bopal Crossing",
    gps: { lat: 23.0338, lng: 72.4633 },
    eventType: "Severe Dust Storm",
    eventSeverity: "Critical",
    source: "Twitter/X",
    sourceUser: {
      name: "Viral Gujarat News",
      handle: "@viral_guj_updates",
      history: "19 reports submitted, 1 verified",
      totalSubmitted: 19,
      totalVerified: 1,
      reliabilityScore: 5.2,
      device: "Twitter Web App",
      joined: "Jan 2026",
      isVerifiedUser: false,
    },
    media: [
      {
        id: "m-12",
        type: "video",
        url: "/placeholder-tornado.jpg",
        thumbnailTitle: "Giant funnel cloud touching down near warehouses",
        caption: "Claims of massive EF-3 tornado ripping roofs in Ahmedabad outskirts.",
        duration: "0:28",
        exifClean: false,
        resolution: "1280 x 720",
        camera: "Unknown / Repurposed US Tornado Footage",
        timestamp: "Unknown",
      },
    ],
    description: "Unbelievable tornado touched down near SP Ring Road Bopal! Multiple houses collapsed and cars thrown into air! Watch before deleted!",
    trustScore: 19,
    status: "flagged",
    flagReason: "Re-used viral video from 2022 Oklahoma tornado. Zero Doppler rotation detected.",
    aiFlags: [
      { label: "Direct Video Reuse (Oklahoma Tornado, May 2022)", type: "danger", detail: "Matched exact video frame sequence from National Weather Service Norman archive." },
      { label: "Doppler DWR Ahmedabad shows 0 dBZ", type: "danger", detail: "Atmospheric sounding profile confirms severe capping inversion; tornadogenesis physically impossible." },
      { label: "Malicious clickbait engagement farming", type: "danger", detail: "Spam heuristics identified affiliate link in user reply thread." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "HOAX-OKLAHOMA-REPOST",
        similarity: 100,
        clusterSummary: "Exact digital clone of viral video from USA storm chasing channel.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 14.2,
        exifStatus: "Altered/Stripped",
        reverseImageHits: 47,
        sourcePlatform: "YouTube / NWS US Archives",
        notes: "Power transmission pylons in video follow North American electrical grid design standards.",
      },
      nlpSentiment: {
        urgency: "Critical",
        authenticityScore: 12,
        spamRisk: 96,
        extractedEntities: ["Ahmedabad", "SP Ring Road", "Bopal", "Tornado", "Houses collapsed"],
      },
      telemetryValidation: {
        nearestStation: "Ahmedabad Airport IMD Observatory",
        distance: "14.2 km",
        observedMetric: "Temp 36.8°C, RH 38%, Wind 8 km/h, Clear blue sky",
        radarReflectivity: "0 dBZ",
        telemetryCorrelation: "Direct Contradiction",
      },
    },
    analystNotes: "Permanent flag added to social account handle in IMD misinformation database.",
  },
  {
    id: "WX-9477",
    timestamp: "2 hrs 30 mins ago",
    exactDateTime: "26 Sep 2026, 09:18 IST",
    city: "Patna",
    state: "Bihar",
    landmark: "Gandhi Maidan & Frazer Road",
    gps: { lat: 25.6186, lng: 85.1414 },
    eventType: "Thunderstorm & Hail",
    eventSeverity: "Severe",
    source: "Twitter/X",
    sourceUser: {
      name: "Bihar Today Flash",
      handle: "@bihar_today_flash",
      history: "34 reports submitted, 6 verified",
      totalSubmitted: 34,
      totalVerified: 6,
      reliabilityScore: 17.6,
      device: "Android Smartphone",
      joined: "September 2024",
      isVerifiedUser: false,
    },
    media: [
      {
        id: "m-13",
        type: "photo",
        url: "/placeholder-hail-patna.jpg",
        thumbnailTitle: "Huge blocks of ice scattered across lawn",
        caption: "Claims of 1 kg ice blocks crashing down in Gandhi Maidan during thunderstorm.",
        exifClean: false,
        resolution: "1080 x 1080",
        camera: "Unknown",
        timestamp: "Unknown",
      },
    ],
    description: "Deadly hailstorm in Patna Gandhi Maidan! 1 kilogram hail blocks falling from sky, hundreds injured! Stay away from open grounds!",
    trustScore: 29,
    status: "flagged",
    flagReason: "AI reverse-image matched May 2018 photo. Local IMD observatory recorded zero rainfall.",
    aiFlags: [
      { label: "Reverse image match (May 2018 Jabalpur storm)", type: "danger", detail: "Photo corresponds to historic hailstorm event in Madhya Pradesh from 8 years ago." },
      { label: "Patna Observatory AWS: Zero rainfall, 33°C", type: "danger", detail: "No convective development or lightning strikes registered by Bihar lightning detection network." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: true,
        clusterId: "HOAX-JABALPUR-HAIL-2018",
        similarity: 97,
        clusterSummary: "Recycled news image from historic May 2018 thunderstorm.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 9.4,
        exifStatus: "Altered/Stripped",
        reverseImageHits: 18,
        sourcePlatform: "Dainik Bhaskar Archives (2018)",
        notes: "Cropped to remove original 2018 photographer watermark on bottom right.",
      },
      nlpSentiment: {
        urgency: "Critical",
        authenticityScore: 24,
        spamRisk: 88,
        extractedEntities: ["Patna", "Gandhi Maidan", "1kg ice blocks", "Hundreds injured"],
      },
      telemetryValidation: {
        nearestStation: "Patna Airport IMD AWS",
        distance: "4.8 km",
        observedMetric: "Temp 33.2°C, RH 62%, Precipitation 0.0 mm",
        radarReflectivity: "0 dBZ",
        telemetryCorrelation: "Direct Contradiction",
      },
    },
    analystNotes: "Flagged and added to automated debunking bulletin.",
  },

  // Recently Verified Reports (For Recently Verified tab)
  {
    id: "WX-9476",
    timestamp: "Today, 10:45 IST",
    exactDateTime: "26 Sep 2026, 10:45 IST",
    city: "Kochi",
    state: "Kerala",
    landmark: "Vypin Coastal Road & Munambam Beach",
    gps: { lat: 10.1834, lng: 76.1663 },
    eventType: "High Tide Surge",
    eventSeverity: "Severe",
    source: "Citizen App",
    sourceUser: {
      name: "Mathew Joseph",
      handle: "@mathew_vypin",
      history: "15 reports submitted, 15 verified",
      totalSubmitted: 15,
      totalVerified: 15,
      reliabilityScore: 100,
      device: "Pixel 8 Pro • IMD Citizen App",
      joined: "Jan 2024",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-14",
        type: "photo",
        url: "/placeholder-kochi.jpg",
        thumbnailTitle: "Arabian Sea wave overtopping coastal road",
        caption: "High energy sea swell pushing over sea wall onto residential lanes.",
        exifClean: true,
        resolution: "4032 x 3024",
        camera: "Pixel 8 Pro 50MP",
        timestamp: "26-09-2026 10:40 IST",
      },
    ],
    description: "Arabian Sea high wave surge breached 150m of coastal defense wall at Munambam. Water inundating coastal residential colonies. Sand berms eroded.",
    trustScore: 96,
    status: "verified",
    verifiedAt: "26 Sep 2026, 10:48 IST",
    verifiedBy: "Duty Meteorologist Dr. S. Nambiar (Regional Center Thiruvananthapuram)",
    aiFlags: [
      { label: "INCOIS Coastal Warning Corroborated", type: "info", detail: "Wave rider buoy #AD04 measured significant wave height 3.4 meters." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 32,
        clusterSummary: "Verified coastal swell sequence.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.6,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Full cryptographic EXIF chain valid.",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 98,
        spamRisk: 1,
        extractedEntities: ["Vypin", "Munambam", "Sea wall breach", "Residential colonies"],
      },
      telemetryValidation: {
        nearestStation: "Cochin Naval Base AWS",
        distance: "8.6 km",
        observedMetric: "Wind 52 km/h WSW, Wave height 3.4m, High tide +1.3m",
        radarReflectivity: "34 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Disaster advisory broadcast dispatched to Ernakulam District Collectorate.",
  },
  {
    id: "WX-9475",
    timestamp: "Today, 10:15 IST",
    exactDateTime: "26 Sep 2026, 10:15 IST",
    city: "Delhi NCR",
    state: "Delhi NCR",
    landmark: "IGI Airport Runway 28 & Mahipalpur Underpass",
    gps: { lat: 28.5562, lng: 77.1000 },
    eventType: "Severe Rainfall",
    eventSeverity: "Severe",
    source: "API",
    sourceUser: {
      name: "Airport Meteorological Office (AMO) Delhi",
      handle: "@imd_delhi_airport",
      history: "420 reports submitted, 420 verified",
      totalSubmitted: 420,
      totalVerified: 420,
      reliabilityScore: 100,
      device: "Direct Aviation Weather Data Service (AWDS)",
      joined: "Jan 2023",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-15",
        type: "photo",
        url: "/placeholder-delhi.jpg",
        thumbnailTitle: "Runway visual range (RVR) transmissometer camera feed",
        caption: "Heavy rain curtain dropping runway visibility to 450 meters.",
        exifClean: true,
        resolution: "1920 x 1080",
        camera: "Vaisala Runway Transmissometer Sensor Cam",
        timestamp: "26-09-2026 10:12 IST",
      },
    ],
    description: "Rapid monsoonal squall line traversed IGI airport. Runway Visual Range (RVR) dropped to 450m on Runway 28. 48.6mm rain recorded in 45 minutes; CAT III-B procedures initiated.",
    trustScore: 99,
    status: "verified",
    verifiedAt: "26 Sep 2026, 10:18 IST",
    verifiedBy: "Senior Aviation Forecaster V. K. Aggarwal",
    aiFlags: [
      { label: "Safdarjung & Palam AWS Unified Telemetry Verified", type: "info", detail: "Dual station telemetry confirms localized cloudburst-like squall intensity." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 22,
        clusterSummary: "Primary aviation bulletin.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.2,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Automated sensor stream.",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 99,
        spamRisk: 0,
        extractedEntities: ["IGI Airport", "Runway 28", "RVR 450m", "CAT III-B", "48.6mm rain"],
      },
      telemetryValidation: {
        nearestStation: "Palam IMD Airport Station",
        distance: "0.2 km",
        observedMetric: "48.6 mm/45min, Wind gust 64 km/h WNW, QNH 1002 hPa",
        radarReflectivity: "52 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "METAR / SPECI advisory published to Air Traffic Control.",
  },
  {
    id: "WX-9474",
    timestamp: "Today, 09:30 IST",
    exactDateTime: "26 Sep 2026, 09:30 IST",
    city: "Puri",
    state: "Odisha",
    landmark: "Golden Beach & Swargadwar Beach Front",
    gps: { lat: 19.8049, lng: 85.8180 },
    eventType: "High Tide Surge",
    eventSeverity: "Severe",
    source: "Citizen App",
    sourceUser: {
      name: "Debabrata Mohanty",
      handle: "@debabrata_puri",
      history: "19 reports submitted, 18 verified",
      totalSubmitted: 19,
      totalVerified: 18,
      reliabilityScore: 94.7,
      device: "Samsung Galaxy A55 • IMD Citizen App",
      joined: "April 2024",
      isVerifiedUser: true,
    },
    media: [
      {
        id: "m-16",
        type: "photo",
        url: "/placeholder-puri.jpg",
        thumbnailTitle: "Squally wind ripping tourist umbrellas along beach road",
        caption: "Deep depression coastal gale winds reaching 65 km/h along Puri shoreline.",
        exifClean: true,
        resolution: "3000 x 4000",
        camera: "Galaxy A55 Triple Cam",
        timestamp: "26-09-2026 09:25 IST",
      },
    ],
    description: "Deep depression tracking toward Odisha coast. Gale force gusts at 65 km/h blowing sand and sea spray into Swargadwar market. Red flags hoisted across bathing beaches.",
    trustScore: 94,
    status: "verified",
    verifiedAt: "26 Sep 2026, 09:35 IST",
    verifiedBy: "Duty Officer P. K. Patnaik (IMD Bhubaneswar)",
    aiFlags: [
      { label: "Doppler Radar Paradip Gale Warning Correlated", type: "info", detail: "Radar velocity azimuth display confirms 62-68 km/h wind core at 500m altitude." },
    ],
    aiAnalysis: {
      duplicateDetection: {
        isDuplicate: false,
        similarity: 28,
        clusterSummary: "Corroborates Coastal Cyclone Warning Bulletin #4.",
        similarReports: [],
      },
      imageForensics: {
        ganFakeScore: 0.9,
        exifStatus: "Verified Authentic",
        reverseImageHits: 0,
        notes: "Valid geolocation match with Swargadwar beach promenade.",
      },
      nlpSentiment: {
        urgency: "High",
        authenticityScore: 96,
        spamRisk: 1,
        extractedEntities: ["Puri", "Swargadwar", "Deep depression", "Gale 65 km/h", "Red flags hoisted"],
      },
      telemetryValidation: {
        nearestStation: "Puri Coastal Observatory (AWS #42981)",
        distance: "0.8 km",
        observedMetric: "Sustained wind 54 km/h gusting 66 km/h, Barometric pressure 998.2 hPa",
        radarReflectivity: "36 dBZ",
        telemetryCorrelation: "Strong Agreement",
      },
    },
    analystNotes: "Local administration initiated beach evacuation advisory.",
  },
];

export default function VerificationPage() {
  // Main Data State
  const [reports, setReports] = useState<VerificationReport[]>(initialReports);
  
  // Navigation & Filtering States
  const [activeTab, setActiveTab] = useState<"pending" | "flagged" | "verified">("pending");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [trustFilter, setTrustFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Side Panel State
  const [selectedReport, setSelectedReport] = useState<VerificationReport | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [analystNoteText, setAnalystNoteText] = useState("");
  const [copiedGps, setCopiedGps] = useState(false);

  // Dialog States
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingItem, setRejectingItem] = useState<VerificationReport | null>(null);
  const [rejectReasonSelection, setRejectReasonSelection] = useState("Reverse image match / deepfake");
  const [rejectCustomNote, setRejectCustomNote] = useState("");

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoItem, setInfoItem] = useState<VerificationReport | null>(null);
  const [infoPreset, setInfoPreset] = useState("Please submit additional wide-angle photo showing road water depth");
  const [infoCustomMessage, setInfoCustomMessage] = useState("");

  // Toast Notification State
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: "success" | "danger" | "info";
    undoAction?: () => void;
  } | null>(null);

  // Trigger Toast Helper
  const showToast = (
    title: string,
    description: string,
    type: "success" | "danger" | "info" = "success",
    undoAction?: () => void
  ) => {
    setToast({ show: true, title, description, type, undoAction });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 6000);
  };

  // Trust Score Styling Function:
  // red (<40%), orange (40-70%), green (>70%)
  const getTrustScoreConfig = (score: number) => {
    if (score < 40) {
      return {
        barColor: "bg-red-500",
        badgeBg: "bg-red-50 text-red-700 border-red-200",
        pillColor: "bg-red-500",
        textColor: "text-red-700",
        ratingLabel: "High Fake Risk (<40%)",
        verdict: "AI Suspected Fake",
      };
    }
    if (score <= 70) {
      return {
        barColor: "bg-amber-500",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        pillColor: "bg-amber-500",
        textColor: "text-amber-700",
        ratingLabel: "Moderate Trust (40-70%)",
        verdict: "Needs Corroboration",
      };
    }
    return {
      barColor: "bg-emerald-500",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pillColor: "bg-emerald-500",
      textColor: "text-emerald-700",
      ratingLabel: "High Trust (>70%)",
      verdict: "High Credibility",
    };
  };

  // Event Type Icons & Colors
  const getEventBadge = (eventType: string) => {
    switch (eventType) {
      case "Flash Flood":
        return { icon: Waves, color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "Severe Rainfall":
        return { icon: CloudRain, color: "bg-sky-50 text-sky-700 border-sky-200" };
      case "Thunderstorm & Hail":
        return { icon: CloudLightning, color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "Severe Dust Storm":
        return { icon: Wind, color: "bg-amber-50 text-amber-800 border-amber-200" };
      case "High Tide Surge":
        return { icon: Waves, color: "bg-cyan-50 text-cyan-700 border-cyan-200" };
      case "Urban Waterlogging":
        return { icon: CloudRain, color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      case "Snow Blizzard":
        return { icon: Wind, color: "bg-slate-100 text-slate-700 border-slate-300" };
      case "Extreme Heatwave":
        return { icon: SunMedium, color: "bg-orange-50 text-orange-700 border-orange-200" };
      default:
        return { icon: CloudRain, color: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  // Source Badge
  const getSourceBadge = (source: string) => {
    switch (source) {
      case "Twitter/X":
        return { label: "Twitter/X", icon: Radio, style: "bg-slate-100 text-slate-700 border-slate-200" };
      case "Citizen App":
        return { label: "IMD Citizen App", icon: Smartphone, style: "bg-blue-50 text-blue-700 border-blue-200" };
      case "API":
        return { label: "Municipal API", icon: Satellite, style: "bg-teal-50 text-teal-700 border-teal-200" };
      case "Doppler DWR":
        return { label: "Doppler Radar", icon: Radio, style: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      default:
        return { label: source, icon: Smartphone, style: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  // Counts for Header & Tabs
  const pendingCount = useMemo(() => reports.filter((r) => r.status === "pending").length, [reports]);
  const flaggedCount = useMemo(() => reports.filter((r) => r.status === "flagged").length, [reports]);
  const verifiedCount = useMemo(() => reports.filter((r) => r.status === "verified").length, [reports]);

  // Filtered Reports
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Tab filter
      if (item.status !== activeTab) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query);
        const matchesState = item.state.toLowerCase().includes(query);
        const matchesLandmark = item.landmark.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesReporter = item.sourceUser.name.toLowerCase().includes(query);
        if (!matchesId && !matchesCity && !matchesState && !matchesLandmark && !matchesDesc && !matchesReporter) {
          return false;
        }
      }

      // Event Type Filter
      if (eventTypeFilter !== "all" && item.eventType !== eventTypeFilter) {
        return false;
      }

      // Trust Filter
      if (trustFilter === "high" && item.trustScore <= 70) return false;
      if (trustFilter === "medium" && (item.trustScore < 40 || item.trustScore > 70)) return false;
      if (trustFilter === "low" && item.trustScore >= 40) return false;

      return true;
    });
  }, [reports, activeTab, searchQuery, eventTypeFilter, trustFilter]);

  // Actions
  const handleApprove = (report: VerificationReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const previousStatus = report.status;
    const nowStamp = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) + " IST";

    // Update state
    setReports((prev) =>
      prev.map((r) =>
        r.id === report.id
          ? {
              ...r,
              status: "verified",
              verifiedAt: `Today, ${nowStamp}`,
              verifiedBy: "Duty Officer (Current Analyst Session)",
            }
          : r
      )
    );

    // If active in side panel, keep it updated
    if (selectedReport?.id === report.id) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: "verified",
              verifiedAt: `Today, ${nowStamp}`,
              verifiedBy: "Duty Officer (Current Analyst Session)",
            }
          : null
      );
    }

    showToast(
      `Approved ${report.id}`,
      `Report verified and broadcast to National Weather Advisory Feed.`,
      "success",
      () => {
        // Undo Action
        setReports((prev) =>
          prev.map((r) => (r.id === report.id ? { ...r, status: previousStatus } : r))
        );
        if (selectedReport?.id === report.id) {
          setSelectedReport((prev) => (prev ? { ...prev, status: previousStatus } : null));
        }
      }
    );
  };

  const openRejectDialog = (report: VerificationReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRejectingItem(report);
    setRejectReasonSelection(
      report.trustScore < 40
        ? "Reverse image match / deepfake"
        : "Contradicts radar telemetry"
    );
    setRejectCustomNote("");
    setRejectModalOpen(true);
  };

  const confirmReject = () => {
    if (!rejectingItem) return;
    const item = rejectingItem;
    const previousStatus = item.status;
    const fullReason = rejectCustomNote.trim()
      ? `${rejectReasonSelection}: ${rejectCustomNote.trim()}`
      : rejectReasonSelection;

    setReports((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? {
              ...r,
              status: "flagged",
              flagReason: fullReason,
            }
          : r
      )
    );

    if (selectedReport?.id === item.id) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: "flagged",
              flagReason: fullReason,
            }
          : null
      );
    }

    setRejectModalOpen(false);
    setRejectingItem(null);

    showToast(
      `Flagged as Fake: ${item.id}`,
      `Report removed from active alerts. Reason logged: "${fullReason}".`,
      "danger",
      () => {
        setReports((prev) =>
          prev.map((r) => (r.id === item.id ? { ...r, status: previousStatus } : r))
        );
        if (selectedReport?.id === item.id) {
          setSelectedReport((prev) => (prev ? { ...prev, status: previousStatus } : null));
        }
      }
    );
  };

  const openInfoDialog = (report: VerificationReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setInfoItem(report);
    setInfoPreset("Please submit additional wide-angle photo showing road water depth");
    setInfoCustomMessage("");
    setInfoModalOpen(true);
  };

  const confirmRequestInfo = () => {
    if (!infoItem) return;
    const item = infoItem;
    const message = infoCustomMessage.trim() ? infoCustomMessage.trim() : infoPreset;

    setReports((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? {
              ...r,
              infoRequested: true,
              analystNotes: r.analystNotes
                ? `${r.analystNotes}\n[Info Requested]: ${message}`
                : `[Info Requested]: ${message}`,
            }
          : r
      )
    );

    if (selectedReport?.id === item.id) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              infoRequested: true,
              analystNotes: prev.analystNotes
                ? `${prev.analystNotes}\n[Info Requested]: ${message}`
                : `[Info Requested]: ${message}`,
            }
          : null
      );
    }

    setInfoModalOpen(false);
    setInfoItem(null);

    showToast(
      `Info Requested for ${item.id}`,
      `Notification dispatched to ${item.sourceUser.name} via ${item.source}.`,
      "info"
    );
  };

  const handleOpenSidePanel = (report: VerificationReport) => {
    setSelectedReport(report);
    setActiveMediaIndex(0);
    setAnalystNoteText(report.analystNotes || "");
    setCopiedGps(false);
  };

  const handleSaveNotes = () => {
    if (!selectedReport) return;
    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id
          ? { ...r, analystNotes: analystNoteText }
          : r
      )
    );
    setSelectedReport((prev) => (prev ? { ...prev, analystNotes: analystNoteText } : null));
    showToast("Notes Saved", `Review notes updated for report ${selectedReport.id}.`, "success");
  };

  const handleCopyGps = (lat: number, lng: number) => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2500);
  };

  const handleRefreshStream = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Stream Refreshed", "Live sync complete with IMD Radar & Citizen Crowdsource pipeline.", "info");
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 font-sans relative">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
              Verification Queue
            </h1>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-800 border-amber-200 font-semibold px-2.5 py-0.5 text-xs shadow-xs"
            >
              {pendingCount} Pending Review
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            IMD Duty Meteorologist audit console. Review AI-evaluated citizen reports, social media alerts, and Doppler radar telemetry before public advisory broadcast.
          </p>
        </div>

        {/* View Controls & Action Group */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshStream}
            disabled={isRefreshing}
            className="text-xs text-slate-700 bg-white border-slate-200 hover:bg-slate-50 gap-1.5 shadow-xs"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
            <span>Sync Pipeline</span>
          </Button>

          {/* Toggle View: Option A (Cards) vs Option B (Table) */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "cards"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Card View (Default)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FILTER TABS & SEARCH CONTROLS */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Main 3 Filter Tabs: Pending, Flagged, Recently Verified */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "pending"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Pending Review</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("flagged")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "flagged"
                  ? "bg-white text-rose-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Flagged (AI-Suspected Fake)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-800 font-bold">
                {flaggedCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("verified")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "verified"
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recently Verified</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                {verifiedCount}
              </span>
            </button>
          </div>

          {/* Quick Stats / Legend Pill */}
          <div className="flex items-center gap-3 text-[11px] text-slate-500 bg-white border border-slate-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
            <span className="font-medium text-slate-700">AI Trust Score Guide:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>&gt;70% High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>40-70% Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>&lt;40% Suspicious</span>
            </div>
          </div>
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by Report ID, city, landmark, reporter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-9 bg-slate-50/70 border-slate-200 focus-visible:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Event Filter */}
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50/70 border border-slate-200 rounded-md text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
          >
            <option value="all">All Weather Event Types</option>
            <option value="Flash Flood">Flash Flood</option>
            <option value="Severe Rainfall">Severe Rainfall</option>
            <option value="Thunderstorm & Hail">Thunderstorm & Hail</option>
            <option value="Severe Dust Storm">Severe Dust Storm</option>
            <option value="High Tide Surge">High Tide Surge</option>
            <option value="Urban Waterlogging">Urban Waterlogging</option>
            <option value="Snow Blizzard">Snow Blizzard</option>
          </select>

          {/* Trust Score Filter */}
          <select
            value={trustFilter}
            onChange={(e) => setTrustFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50/70 border border-slate-200 rounded-md text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
          >
            <option value="all">All Trust Score Tiers</option>
            <option value="high">High Trust (&gt;70%)</option>
            <option value="medium">Moderate (40% - 70%)</option>
            <option value="low">Flagged / Low (&lt;40%)</option>
          </select>
        </div>
      </div>

      {/* 3. MAIN VIEW: OPTION A (CARDS) vs OPTION B (TABLE) */}
      {filteredReports.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 bg-white/60 p-12 text-center rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <CheckCheck className="w-6 h-6 text-slate-500" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No Reports in this view</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {searchQuery || eventTypeFilter !== "all" || trustFilter !== "all"
              ? "No items match your active search and filter parameters. Try clearing filters."
              : activeTab === "pending"
              ? "All pending reports have been audited and verified for this cycle. Good job!"
              : activeTab === "flagged"
              ? "No reports flagged as fake or suspicious currently."
              : "No recently verified reports recorded in this session yet."}
          </p>
          {(searchQuery || eventTypeFilter !== "all" || trustFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setEventTypeFilter("all");
                setTrustFilter("all");
              }}
              className="mt-4 text-xs"
            >
              Reset Filters
            </Button>
          )}
        </Card>
      ) : viewMode === "cards" ? (
        /* ================= OPTION A: CARD-BASED REVIEW LIST (DEFAULT) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => {
            const trust = getTrustScoreConfig(report.trustScore);
            const eventConfig = getEventBadge(report.eventType);
            const sourceConfig = getSourceBadge(report.source);
            const EventIcon = eventConfig.icon;
            const SourceIcon = sourceConfig.icon;
            const primaryMedia = report.media[0];

            return (
              <Card
                key={report.id}
                onClick={() => handleOpenSidePanel(report)}
                className="group cursor-pointer border border-slate-200/90 bg-white hover:border-blue-400/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden rounded-xl"
              >
                <div>
                  {/* Top Bar: ID, Timestamp, Priority, and Source */}
                  <div className="p-4 pb-3 border-b border-slate-100/90 flex items-center justify-between gap-2 bg-slate-50/40">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {report.id}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {report.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium px-2 py-0.5 ${sourceConfig.style}`}
                      >
                        <SourceIcon className="w-2.5 h-2.5 mr-1" />
                        {sourceConfig.label}
                      </Badge>

                      {report.infoRequested && (
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px]"
                        >
                          Info Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3.5">
                    {/* Location & Event Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>
                            {report.city}, {report.state}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 pl-5 truncate max-w-xs sm:max-w-sm">
                          {report.landmark}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold px-2.5 py-0.5 shrink-0 ${eventConfig.color}`}
                      >
                        <EventIcon className="w-3 h-3 mr-1" />
                        {report.eventType}
                      </Badge>
                    </div>

                    {/* Media Preview Area with simulated realistic photograph thumbnails & tags */}
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 aspect-16/9 group-hover:brightness-105 transition-all">
                      {/* Realistic Background Gradient simulating scene */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center ${
                          report.eventType === "Flash Flood" || report.eventType === "Urban Waterlogging"
                            ? "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
                            : report.eventType === "Thunderstorm & Hail"
                            ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
                            : report.eventType === "Severe Dust Storm"
                            ? "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900"
                            : report.eventType === "High Tide Surge"
                            ? "bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950"
                            : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
                        }`}
                      >
                        {/* Weather graphic aesthetic overlay */}
                        <div className="absolute inset-0 opacity-25 flex items-center justify-center">
                          <EventIcon className="w-24 h-24 text-white" />
                        </div>
                      </div>

                      {/* Video / Photo Overlay indicator */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs px-2 py-0.5 rounded-md">
                          {primaryMedia.type === "video" ? (
                            <>
                              <VideoIcon className="w-3 h-3 text-red-400" />
                              <span>Video ({primaryMedia.duration})</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3 h-3 text-sky-400" />
                              <span>Photo ({report.media.length} items)</span>
                            </>
                          )}
                        </span>

                        {primaryMedia.exifClean ? (
                          <span className="text-[10px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                            EXIF Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium bg-rose-950/80 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                            EXIF Stripped
                          </span>
                        )}
                      </div>

                      {/* Play Button Overlay if Video */}
                      {primaryMedia.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current text-blue-900" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Media Caption Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 pt-6 text-white text-[11px]">
                        <p className="line-clamp-1 text-slate-200">
                          {primaryMedia.thumbnailTitle}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
                          <span>{primaryMedia.camera}</span>
                          <span>{primaryMedia.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reporter Description (Realistic Text) */}
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                      &ldquo;{report.description}&rdquo;
                    </p>

                    {/* AI Trust Score Colored Progress Bar */}
                    <div className="space-y-1.5 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/60">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-700">AI Trust Score:</span>
                          <span className={`font-bold font-mono ${trust.textColor}`}>
                            {report.trustScore}%
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${trust.badgeBg}`}>
                          {trust.verdict}
                        </span>
                      </div>

                      {/* Progress Bar with Color Thresholds */}
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${trust.barColor} transition-all duration-500 rounded-full`}
                          style={{ width: `${report.trustScore}%` }}
                        />
                      </div>
                    </div>

                    {/* AI Flags & Suspicion Reasons */}
                    {report.aiFlags.length > 0 && (
                      <div className="space-y-1 pt-0.5">
                        {report.aiFlags.slice(0, 2).map((flag, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-1.5 text-[11px] p-1.5 rounded-md border ${
                              flag.type === "danger"
                                ? "bg-rose-50 text-rose-800 border-rose-200"
                                : flag.type === "warning"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-blue-50/70 text-blue-800 border-blue-200/80"
                            }`}
                          >
                            <AlertTriangle
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                flag.type === "danger"
                                  ? "text-rose-600"
                                  : flag.type === "warning"
                                  ? "text-amber-600"
                                  : "text-blue-600"
                              }`}
                            />
                            <div className="truncate">
                              <span className="font-semibold">{flag.label}: </span>
                              <span className="text-[10.5px] opacity-90">{flag.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons Footer */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    <span className="text-slate-400">By </span>
                    <span className="font-medium text-slate-700">{report.sourceUser.name}</span>
                    <span className="text-[10px] text-slate-400 ml-1">
                      ({report.sourceUser.reliabilityScore}% rel)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* 1. Request Info (Gray, HelpCircle icon) */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => openInfoDialog(report, e)}
                      className="h-8 px-2.5 text-xs text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100 gap-1"
                      title="Request More Info from citizen"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span className="hidden sm:inline">Info</span>
                    </Button>

                    {/* 2. Reject / Flag as Fake (Red, XCircle icon) */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => openRejectDialog(report, e)}
                      className="h-8 px-2.5 text-xs text-rose-700 border-rose-200 hover:bg-rose-50 hover:border-rose-300 gap-1"
                      title="Flag as Fake or Reject"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reject</span>
                    </Button>

                    {/* 3. Approve (Green, CheckCircle icon) */}
                    <Button
                      size="sm"
                      onClick={(e) => handleApprove(report, e)}
                      className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs gap-1 font-semibold"
                      title="Approve and mark verified"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      <span>Approve</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* ================= OPTION B: COMPACT TABLE VIEW ================= */
        <Card className="border border-slate-200/90 bg-white overflow-hidden rounded-xl shadow-xs">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-24 text-xs font-semibold text-slate-700">Report ID</TableHead>
                  <TableHead className="w-32 text-xs font-semibold text-slate-700">Timestamp</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Location</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Event</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Source</TableHead>
                  <TableHead className="w-44 text-xs font-semibold text-slate-700">AI Trust Score</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">AI Verification Flags</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700 pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const trust = getTrustScoreConfig(report.trustScore);
                  const eventConfig = getEventBadge(report.eventType);
                  const sourceConfig = getSourceBadge(report.source);
                  const EventIcon = eventConfig.icon;
                  const SourceIcon = sourceConfig.icon;

                  return (
                    <TableRow
                      key={report.id}
                      onClick={() => handleOpenSidePanel(report)}
                      className="cursor-pointer hover:bg-blue-50/40 transition-colors border-b border-slate-100"
                    >
                      {/* ID */}
                      <TableCell className="font-mono text-xs font-bold text-blue-900 py-3">
                        {report.id}
                      </TableCell>

                      {/* Timestamp */}
                      <TableCell className="text-xs text-slate-500 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{report.timestamp}</span>
                        </div>
                      </TableCell>

                      {/* Location */}
                      <TableCell className="text-xs py-3 max-w-xs">
                        <div className="font-medium text-slate-800 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{report.city}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate pl-4">
                          {report.landmark}
                        </div>
                      </TableCell>

                      {/* Event Type */}
                      <TableCell className="py-3 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium px-2 py-0.5 ${eventConfig.color}`}
                        >
                          <EventIcon className="w-3 h-3 mr-1" />
                          {report.eventType}
                        </Badge>
                      </TableCell>

                      {/* Source */}
                      <TableCell className="py-3 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-medium px-2 py-0.5 ${sourceConfig.style}`}
                        >
                          <SourceIcon className="w-2.5 h-2.5 mr-1" />
                          {sourceConfig.label}
                        </Badge>
                      </TableCell>

                      {/* Trust Score */}
                      <TableCell className="py-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className={`font-mono font-bold ${trust.textColor}`}>
                              {report.trustScore}%
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {trust.verdict}
                            </span>
                          </div>
                          <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${trust.barColor}`}
                              style={{ width: `${report.trustScore}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* AI Flags Preview */}
                      <TableCell className="text-xs py-3 max-w-xs">
                        {report.aiFlags.length > 0 ? (
                          <div className="flex items-center gap-1 text-[11px] truncate">
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                report.aiFlags[0].type === "danger"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              <AlertTriangle className="w-2.5 h-2.5" />
                              {report.aiFlags[0].label}
                            </span>
                            {report.aiFlags.length > 1 && (
                              <span className="text-[10px] text-slate-400 font-medium">
                                +{report.aiFlags.length - 1} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">No flags</span>
                        )}
                      </TableCell>

                      {/* Quick Actions */}
                      <TableCell
                        className="py-3 text-right pr-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenSidePanel(report)}
                            className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => openRejectDialog(report, e)}
                            className="h-7 px-2 text-xs text-rose-700 border-rose-200 hover:bg-rose-50"
                            title="Reject/Flag as Fake"
                          >
                            <XCircle className="w-3 h-3 text-rose-600 sm:mr-1" />
                            <span className="hidden sm:inline">Reject</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => handleApprove(report, e)}
                            className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-xs"
                            title="Approve Report"
                          >
                            <CheckCircle className="w-3 h-3 text-white sm:mr-1" />
                            <span className="hidden sm:inline">Approve</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* ================= 4. RESPONSIVE SIDE PANEL (INCIDENT DETAIL VIEW) ================= */}
      {selectedReport && (
        <>
          {/* Backdrop for Desktop & Mobile */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity animate-in fade-in"
            onClick={() => setSelectedReport(null)}
          />

          {/* Slide-over Drawer (Desktop right side, Mobile full screen) */}
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl md:max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-250">
            {/* Panel Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-blue-950 bg-blue-100/70 px-2 py-0.5 rounded-md border border-blue-200">
                    {selectedReport.id}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold ${getEventBadge(selectedReport.eventType).color}`}
                  >
                    {selectedReport.eventType}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      selectedReport.status === "verified"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : selectedReport.status === "flagged"
                        ? "bg-rose-50 text-rose-800 border-rose-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {selectedReport.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium text-slate-800">
                    {selectedReport.city}, {selectedReport.state}
                  </span>
                  <span>•</span>
                  <span>{selectedReport.exactDateTime}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="h-8 w-8 p-0 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-full"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close Panel</span>
              </Button>
            </div>

            {/* Panel Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* SECTION 1: FULL MEDIA GALLERY */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase font-heading flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    Forensic Media Evidence ({selectedReport.media.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Click thumbnail to switch view
                  </span>
                </div>

                {/* Active Media Main Preview */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-16/9 shadow-sm">
                  {/* Dynamic background representing the selected photo/video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
                    <div className="text-center p-4">
                      {selectedReport.media[activeMediaIndex]?.type === "video" ? (
                        <div className="space-y-2">
                          <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-md">
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </div>
                          <span className="text-xs font-medium text-slate-300 block">
                            Preview Video Clip ({selectedReport.media[activeMediaIndex]?.duration})
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="w-12 h-12 text-slate-500 mx-auto" />
                          <span className="text-xs font-medium text-slate-300 block">
                            High Resolution Forensic Capture
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Watermark Overlay Stamp (Forensic Style) */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-[10px] font-mono text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                    EXIF: {selectedReport.media[activeMediaIndex]?.timestamp} • GPS MATCH
                  </div>

                  {/* Bottom Metadata bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 text-white text-xs">
                    <p className="font-medium text-slate-100">
                      {selectedReport.media[activeMediaIndex]?.caption}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-400 mt-1 font-mono">
                      <span>Res: {selectedReport.media[activeMediaIndex]?.resolution}</span>
                      <span>Hardware: {selectedReport.media[activeMediaIndex]?.camera}</span>
                      <span>
                        Status:{" "}
                        <span className={selectedReport.media[activeMediaIndex]?.exifClean ? "text-emerald-400" : "text-rose-400"}>
                          {selectedReport.media[activeMediaIndex]?.exifClean ? "EXIF Clean" : "EXIF Stripped"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {selectedReport.media.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedReport.media.map((med, idx) => (
                      <button
                        key={med.id}
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative rounded-lg overflow-hidden border-2 w-20 h-14 shrink-0 transition-all ${
                          activeMediaIndex === idx
                            ? "border-blue-600 ring-2 ring-blue-500/20 shadow-xs"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-[10px] text-white">
                          {med.type === "video" ? (
                            <Play className="w-4 h-4 fill-white" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                        <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-slate-300 text-center truncate px-0.5">
                          #{idx + 1} {med.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: EYEWITNESS STATEMENT & LOCATION */}
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-800 uppercase tracking-wide text-[11px]">
                    Citizen Eyewitness Narrative
                  </span>
                  <span>Submitted {selectedReport.timestamp}</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                  &ldquo;{selectedReport.description}&rdquo;
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium text-slate-700">Specific Landmark:</span>
                  <span>{selectedReport.landmark}</span>
                </div>
              </div>

              {/* SECTION 3: COMPLETE TECHNICAL METADATA */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase font-heading flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Metadata & Reporter Provenance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Exact GPS Box */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Exact GPS Coordinates</span>
                      <button
                        onClick={() => handleCopyGps(selectedReport.gps.lat, selectedReport.gps.lng)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-medium"
                      >
                        {copiedGps ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedGps ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono text-xs font-bold text-slate-800">
                      {selectedReport.gps.lat.toFixed(4)}° N, {selectedReport.gps.lng.toFixed(4)}° E
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Accuracy radius: ±4.2 meters (Cellular + GNSS Lock)
                    </p>
                  </div>

                  {/* Submission Timestamp Box */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                    <span className="font-semibold text-[11px] text-slate-700 block">
                      Server Ingestion Time
                    </span>
                    <p className="font-mono text-xs font-bold text-slate-800">
                      {selectedReport.exactDateTime}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Network pipeline latency: 284ms
                    </p>
                  </div>

                  {/* Reporter Profile Box */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px] text-slate-700">Reporter Credibility</span>
                      {selectedReport.sourceUser.isVerifiedUser && (
                        <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200">
                          Aadhaar Verified
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-xs text-slate-800">
                      {selectedReport.sourceUser.name}{" "}
                      <span className="text-slate-400 font-normal">({selectedReport.sourceUser.handle})</span>
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {selectedReport.sourceUser.history} ({selectedReport.sourceUser.reliabilityScore}% verified)
                    </p>
                  </div>

                  {/* Device Info Box */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                    <span className="font-semibold text-[11px] text-slate-700 block">
                      Client Device & Build
                    </span>
                    <p className="text-xs font-medium text-slate-800 truncate" title={selectedReport.sourceUser.device}>
                      {selectedReport.sourceUser.device}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Protocol: TLS 1.3 / IMD Crowdsource Gateway API
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: AI ANALYSIS BREAKDOWN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase font-heading flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    AI Multi-Modal Analysis Breakdown
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-xs font-bold ${getTrustScoreConfig(selectedReport.trustScore).badgeBg}`}
                  >
                    AI Score: {selectedReport.trustScore}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* 1. Duplicate & Cluster Detection */}
                  <Card className="p-3.5 border-slate-200 bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            Cluster & Duplicate Detection
                          </span>
                          {selectedReport.aiAnalysis.duplicateDetection.isDuplicate ? (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                              Cluster Match ({selectedReport.aiAnalysis.duplicateDetection.similarity}%)
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-[10px]">
                              Unique Incident
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {selectedReport.aiAnalysis.duplicateDetection.clusterSummary}
                        </p>
                      </div>
                    </div>

                    {selectedReport.aiAnalysis.duplicateDetection.similarReports.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                          Corroborating Reports Nearby:
                        </span>
                        {selectedReport.aiAnalysis.duplicateDetection.similarReports.map((sim, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-xs p-1.5 bg-slate-50 rounded-md font-mono"
                          >
                            <span className="text-blue-900 font-semibold">{sim.id}</span>
                            <span className="text-slate-500">{sim.distance} away</span>
                            <span className="text-slate-500">{sim.timeDelta}</span>
                            <span className="text-emerald-700 font-bold">{sim.matchPct}% match</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  {/* 2. Image Forensics & Reverse Image Match */}
                  <Card className="p-3.5 border-slate-200 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Image Forensics & Deepfake Detection
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          selectedReport.aiAnalysis.imageForensics.ganFakeScore > 10
                            ? "text-rose-600"
                            : "text-emerald-600"
                        }`}
                      >
                        GAN Fake Prob: {selectedReport.aiAnalysis.imageForensics.ganFakeScore}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="text-[10px] text-slate-400 block">EXIF Integrity</span>
                        <span className="font-semibold text-slate-800">
                          {selectedReport.aiAnalysis.imageForensics.exifStatus}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="text-[10px] text-slate-400 block">Web Reverse Matches</span>
                        <span
                          className={`font-semibold ${
                            selectedReport.aiAnalysis.imageForensics.reverseImageHits > 0
                              ? "text-rose-700"
                              : "text-emerald-700"
                          }`}
                        >
                          {selectedReport.aiAnalysis.imageForensics.reverseImageHits} matches found
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic">
                      {selectedReport.aiAnalysis.imageForensics.notes}
                    </p>
                  </Card>

                  {/* 3. NLP Sentiment & Lexical Authenticity */}
                  <Card className="p-3.5 border-slate-200 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        NLP Sentiment & Authenticity Verification
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        Urgency: {selectedReport.aiAnalysis.nlpSentiment.urgency}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="text-[10px] text-slate-400 block">Lexical Authenticity</span>
                        <span className="font-semibold text-emerald-700 font-mono">
                          {selectedReport.aiAnalysis.nlpSentiment.authenticityScore}%
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-md">
                        <span className="text-[10px] text-slate-400 block">Spam / Bot Probability</span>
                        <span className="font-semibold text-slate-700 font-mono">
                          {selectedReport.aiAnalysis.nlpSentiment.spamRisk}%
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedReport.aiAnalysis.nlpSentiment.extractedEntities.map((ent, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-medium"
                        >
                          {ent}
                        </span>
                      ))}
                    </div>
                  </Card>

                  {/* 4. Cross-Telemetry Corroboration (IMD Doppler & AWS) */}
                  <Card className="p-3.5 border-slate-200 bg-blue-50/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-blue-700" />
                        Ground-Truth Sensor Telemetry Match
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          selectedReport.aiAnalysis.telemetryValidation.telemetryCorrelation === "Strong Agreement"
                            ? "text-emerald-700"
                            : selectedReport.aiAnalysis.telemetryValidation.telemetryCorrelation === "Direct Contradiction"
                            ? "text-rose-700"
                            : "text-amber-700"
                        }`}
                      >
                        {selectedReport.aiAnalysis.telemetryValidation.telemetryCorrelation}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                      <div className="flex justify-between border-b border-blue-100 pb-1">
                        <span className="text-slate-500">Nearest Station:</span>
                        <span className="font-medium text-slate-900">
                          {selectedReport.aiAnalysis.telemetryValidation.nearestStation} ({selectedReport.aiAnalysis.telemetryValidation.distance})
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-blue-100 pb-1">
                        <span className="text-slate-500">Station Measurement:</span>
                        <span className="font-medium text-slate-900 font-mono">
                          {selectedReport.aiAnalysis.telemetryValidation.observedMetric}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Doppler Radar Reflectivity:</span>
                        <span className="font-medium text-slate-900 font-mono">
                          {selectedReport.aiAnalysis.telemetryValidation.radarReflectivity}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* SECTION 5: ANALYST REVIEW NOTES */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase font-heading flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    Analyst Review Notes & Audit Log
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveNotes}
                    className="h-7 text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                  >
                    Save Notes
                  </Button>
                </div>

                <textarea
                  rows={3}
                  value={analystNoteText}
                  onChange={(e) => setAnalystNoteText(e.target.value)}
                  placeholder="Add duty meteorologist verification rationale, radar cross-check confirmation, or ground contact notes..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 shadow-2xs leading-relaxed"
                />

                {/* Quick Preset Tags for Analyst */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium py-0.5">Quick Tags:</span>
                  {[
                    "Corroborated by Radar",
                    "Visuals Match Ground Sensor",
                    "Severe Inundation Confirmed",
                    "Disaster Cell Notified",
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setAnalystNoteText((prev) => (prev ? `${prev} • ${tag}` : tag))
                      }
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel Action Footer (Bottom) */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-500 hidden sm:block">
                {selectedReport.status === "verified" ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Report is already verified
                  </span>
                ) : selectedReport.status === "flagged" ? (
                  <span className="text-rose-700 font-medium flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    Report is flagged as fake
                  </span>
                ) : (
                  <span>Ready for analyst determination</span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInfoDialog(selectedReport)}
                  className="flex-1 sm:flex-none text-xs text-slate-700 border-slate-300 hover:bg-slate-100"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  Request Info
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openRejectDialog(selectedReport)}
                  className="flex-1 sm:flex-none text-xs text-rose-700 border-rose-300 hover:bg-rose-50 font-semibold"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600 mr-1" />
                  Flag as Fake
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleApprove(selectedReport)}
                  className="flex-1 sm:flex-none text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs px-4"
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1 text-white" />
                  Approve Report
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= 5. REJECT / FLAG AS FAKE CONFIRMATION DIALOG ================= */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Flag as Fake / Reject Report</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Rejecting report <span className="font-mono font-bold text-slate-800">{rejectingItem?.id}</span> will remove it from public advisory feeds and log the event in the National Weather Misinformation Registry.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">
                Primary Rejection Reason:
              </label>
              <select
                value={rejectReasonSelection}
                onChange={(e) => setRejectReasonSelection(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-rose-500"
              >
                <option value="Reverse image match / deepfake">Reverse image match / deepfake</option>
                <option value="Contradicts radar telemetry">Contradicts Doppler radar telemetry</option>
                <option value="Physical temperature anomaly">Physical temperature anomaly (Impossible snow/ice)</option>
                <option value="Outdated recycled storm footage">Outdated recycled storm footage from prior year</option>
                <option value="Spam / Malicious submission">Spam / Bot network engagement farming</option>
                <option value="Location / Landmark mismatch">Location / Landmark mismatch</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">
                Analyst Explanatory Note (Optional):
              </label>
              <Input
                type="text"
                placeholder="e.g., Matched 2021 YouTube video; ground weather is sunny at 38°C"
                value={rejectCustomNote}
                onChange={(e) => setRejectCustomNote(e.target.value)}
                className="text-xs h-9"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRejectModalOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={confirmReject}
              className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold"
            >
              Confirm Rejection & Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= 6. REQUEST MORE INFO DIALOG ================= */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-900">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Request Citizen Clarification</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Send an inquiry push notification to <span className="font-semibold text-slate-800">{infoItem?.sourceUser.name}</span> for report <span className="font-mono font-bold text-slate-800">{infoItem?.id}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">Inquiry Preset:</label>
              <select
                value={infoPreset}
                onChange={(e) => setInfoPreset(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500"
              >
                <option value="Please submit additional wide-angle photo showing road water depth">
                  Please submit additional wide-angle photo showing road water depth
                </option>
                <option value="Please confirm current landmark visibility and approximate wind direction">
                  Please confirm current landmark visibility and approximate wind direction
                </option>
                <option value="Please verify whether precipitation is ongoing or has subsided">
                  Please verify whether precipitation is ongoing or has subsided
                </option>
                <option value="Please capture visible road signboard to corroborate geolocation">
                  Please capture visible road signboard to corroborate geolocation
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">Custom Guidance (Optional):</label>
              <Input
                type="text"
                placeholder="Custom instruction for the citizen contributor..."
                value={infoCustomMessage}
                onChange={(e) => setInfoCustomMessage(e.target.value)}
                className="text-xs h-9"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInfoModalOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={confirmRequestInfo}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Request</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= 7. INTERACTIVE TOAST NOTIFICATION ================= */}
      {toast?.show && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-slate-200 rounded-xl shadow-2xl p-4 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : toast.type === "danger" ? (
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <XCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
              <p className="text-[11px] text-slate-500 leading-normal">{toast.description}</p>
              {toast.undoAction && (
                <button
                  onClick={() => {
                    toast.undoAction?.();
                    setToast(null);
                  }}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline pt-1 inline-block"
                >
                  Undo Action
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
