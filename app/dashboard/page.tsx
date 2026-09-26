"use client";

import React, { useState, useMemo } from "react";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Clock,
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  CloudFog,
  Wind,
  Camera,
  Image as ImageIcon,
  Video,
  Eye,
  Check,
  X,
  RotateCcw,
  Calendar as CalendarIcon,
  Search,
  Filter,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  Satellite,
  ChevronLeft,
  ChevronRight,
  Share2,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// 12 Realistic Indian Weather Data Reports
interface WeatherReport {
  id: string;
  dateTime: string;
  city: string;
  state: string;
  eventType: string;
  icon: React.ElementType;
  source: "Twitter/X" | "Citizen App" | "IMD AWS" | "INSAT-3DR" | "Doppler DWR";
  mediaType: "photo" | "video" | "sensor";
  mediaCount: number;
  status: "verified" | "pending" | "flagged";
  confidence: number;
  details: string;
}

const initialReports: WeatherReport[] = [
  {
    id: "WX-9481",
    dateTime: "25 Sep, 22:15",
    city: "Mumbai Suburban",
    state: "Maharashtra",
    eventType: "Rainfall",
    icon: CloudRain,
    source: "Twitter/X",
    mediaType: "photo",
    mediaCount: 3,
    status: "verified",
    confidence: 99.2,
    details: "Severe localized water accumulation in Kurla & Dadar. Precipitation rate > 65mm/hr verified with Santa Cruz AWS telemetry.",
  },
  {
    id: "WX-9480",
    dateTime: "25 Sep, 21:58",
    city: "Siliguri",
    state: "West Bengal",
    eventType: "Thunderstorm",
    icon: CloudLightning,
    source: "Doppler DWR",
    mediaType: "sensor",
    mediaCount: 1,
    status: "verified",
    confidence: 97.4,
    details: "Doppler radar array detected squall cells with wind gusts reaching 68 km/h. Multiple lightning discharges recorded.",
  },
  {
    id: "WX-9479",
    dateTime: "25 Sep, 21:40",
    city: "Chennai Central",
    state: "Tamil Nadu",
    eventType: "Flood",
    icon: Waves,
    source: "Citizen App",
    mediaType: "video",
    mediaCount: 2,
    status: "verified",
    confidence: 96.1,
    details: "Urban runoff inundation along Poonamallee High Road. Citizen uploaded video matching geospatial time window.",
  },
  {
    id: "WX-9478",
    dateTime: "25 Sep, 21:22",
    city: "Nagpur",
    state: "Maharashtra",
    eventType: "Heatwave",
    icon: SunMedium,
    source: "IMD AWS",
    mediaType: "sensor",
    mediaCount: 1,
    status: "verified",
    confidence: 99.8,
    details: "Surface station #4312 recorded ambient air temperature at 43.8°C with relative humidity at 22%. Orange alert sustained.",
  },
  {
    id: "WX-9477",
    dateTime: "25 Sep, 21:05",
    city: "Puri",
    state: "Odisha",
    eventType: "Strong Wind",
    icon: Wind,
    source: "INSAT-3DR",
    mediaType: "sensor",
    mediaCount: 2,
    status: "pending",
    confidence: 88.5,
    details: "Coastal depression cloud mass tracking inland. Wind speed est. 52 km/h. Awaiting corroborating coastal radar sweep.",
  },
  {
    id: "WX-9476",
    dateTime: "25 Sep, 20:45",
    city: "Bikaner",
    state: "Rajasthan",
    eventType: "Dust Storm",
    icon: Wind,
    source: "Twitter/X",
    mediaType: "photo",
    mediaCount: 1,
    status: "flagged",
    confidence: 42.1,
    details: "AI reverse-image engine flagged image as recycled footage from May 2023. Ground visibility is normal at 4,000m.",
  },
  {
    id: "WX-9475",
    dateTime: "25 Sep, 20:30",
    city: "Guwahati",
    state: "Assam",
    eventType: "Rainfall",
    icon: CloudRain,
    source: "Citizen App",
    mediaType: "photo",
    mediaCount: 4,
    status: "verified",
    confidence: 94.7,
    details: "Intense monsoonal downpour in Kamrup Metropolitan. Verified against Borjhar airport rain gauge telemetry (42mm).",
  },
  {
    id: "WX-9474",
    dateTime: "25 Sep, 20:12",
    city: "Delhi NCR",
    state: "Delhi NCR",
    eventType: "Fog",
    icon: CloudFog,
    source: "IMD AWS",
    mediaType: "sensor",
    mediaCount: 1,
    status: "verified",
    confidence: 98.6,
    details: "Safdarjung observatory noted visibility drop to 400m due to shallow radiative fog layer with 92% relative humidity.",
  },
  {
    id: "WX-9473",
    dateTime: "25 Sep, 19:50",
    city: "Ahmedabad",
    state: "Gujarat",
    eventType: "Thunderstorm",
    icon: CloudLightning,
    source: "Twitter/X",
    mediaType: "video",
    mediaCount: 1,
    status: "pending",
    confidence: 83.2,
    details: "Twitter user posted hail storm near SG Highway. Cross-referencing radar velocity azimuth to verify hail core signature.",
  },
  {
    id: "WX-9472",
    dateTime: "25 Sep, 19:35",
    city: "Kochi",
    state: "Kerala",
    eventType: "Flood",
    icon: Waves,
    source: "Citizen App",
    mediaType: "photo",
    mediaCount: 2,
    status: "verified",
    confidence: 95.9,
    details: "High-tide coastal surge reported in Chellanam area. Validated with CWC sea level gauges and proximate district cell.",
  },
  {
    id: "WX-9471",
    dateTime: "25 Sep, 19:15",
    city: "Shimla",
    state: "Himachal Pradesh",
    eventType: "Strong Wind",
    icon: Wind,
    source: "Twitter/X",
    mediaType: "video",
    mediaCount: 1,
    status: "flagged",
    confidence: 34.0,
    details: "Post claimed gale-force blizzard conditions. Automated temperature check shows +11°C. Flagged as misleading clickbait.",
  },
  {
    id: "WX-9470",
    dateTime: "25 Sep, 19:00",
    city: "Hyderabad",
    state: "Telangana",
    eventType: "Rainfall",
    icon: CloudRain,
    source: "IMD AWS",
    mediaType: "sensor",
    mediaCount: 1,
    status: "verified",
    confidence: 99.4,
    details: "Begumpet AWS station captured thunderstorm cloudburst yielding 38mm within 40 minutes. City drainage advisory alerted.",
  },
];

export default function DashboardOverviewPage() {
  const [reports, setReports] = useState<WeatherReport[]>(initialReports);

  // Filters State
  const [selectedEventType, setSelectedEventType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(new Date(2026, 8, 25));

  // Modal State for Inspecting Report
  const [selectedReport, setSelectedReport] = useState<WeatherReport | null>(null);

  // Filter Logic
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Event Type filter
      if (selectedEventType !== "all" && item.eventType.toLowerCase() !== selectedEventType.toLowerCase()) {
        return false;
      }
      // Location / State filter
      if (selectedLocation !== "all" && item.state.toLowerCase() !== selectedLocation.toLowerCase()) {
        return false;
      }
      // Status filter
      if (selectedStatusTab !== "all" && item.status.toLowerCase() !== selectedStatusTab.toLowerCase()) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query);
        const matchesState = item.state.toLowerCase().includes(query);
        const matchesEvent = item.eventType.toLowerCase().includes(query);
        if (!matchesId && !matchesCity && !matchesState && !matchesEvent) {
          return false;
        }
      }
      return true;
    });
  }, [reports, selectedEventType, selectedLocation, selectedStatusTab, searchQuery]);

  // Action handlers
  const handleApprove = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "verified", confidence: 99.0 } : r))
    );
  };

  const handleReject = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "flagged", confidence: 25.0 } : r))
    );
  };

  const handleClearFilters = () => {
    setSelectedEventType("all");
    setSelectedLocation("all");
    setSelectedStatusTab("all");
    setSearchQuery("");
    setFilterDate(new Date(2026, 8, 25));
  };

  return (
    <div className="space-y-6">
      {/* a. STATS CARDS ROW (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Reports Today */}
        <Card className="border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Reports Today
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <Database className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-[#0a192f] font-heading">
              12,480
            </div>
            <div className="flex items-center text-xs text-emerald-600 font-medium gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.2%</span>
              <span className="text-slate-400 font-normal">vs yesterday (10,920)</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Verified Reports (Green accent) */}
        <Card className="border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-shadow border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verified Reports
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-emerald-700 font-heading">
              11,890
            </div>
            <div className="flex items-center text-xs text-slate-500 gap-1">
              <span className="font-semibold text-emerald-700">95.3%</span>
              <span>AI & Ground Sensor Approved</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Flagged / Fake Reports (Red accent) */}
        <Card className="border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-shadow border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Flagged / Fake Reports
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center border border-red-100">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-red-600 font-heading">
              245
            </div>
            <div className="flex items-center text-xs text-slate-500 gap-1">
              <span className="font-semibold text-red-600">1.9%</span>
              <span>Pruned by Neural Vision Guard</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Active Weather Events (Orange accent) */}
        <Card className="border-slate-200 bg-white shadow-2xs hover:shadow-sm transition-shadow border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Weather Events
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-amber-600 font-heading">
              18
            </div>
            <div className="flex items-center text-xs text-slate-500 gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Multi-Hazard Alert Zones Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* b. FILTERS BAR (Horizontal Row Above Table) */}
      <Card className="border-slate-200 bg-white shadow-2xs">
        <CardContent className="p-3 sm:p-4 space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Left: Status Filter Tabs */}
            <Tabs
              value={selectedStatusTab}
              onValueChange={setSelectedStatusTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-slate-100 p-1 rounded-lg">
                <TabsTrigger value="all" className="text-xs px-3">
                  All ({reports.length})
                </TabsTrigger>
                <TabsTrigger value="verified" className="text-xs px-3 text-emerald-700">
                  Verified ({reports.filter((r) => r.status === "verified").length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs px-3 text-amber-700">
                  Pending ({reports.filter((r) => r.status === "pending").length})
                </TabsTrigger>
                <TabsTrigger value="flagged" className="text-xs px-3 text-red-700">
                  Flagged ({reports.filter((r) => r.status === "flagged").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Right: Dropdowns + Date + Clear Button */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Event Type Select */}
              <div className="w-36">
                <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                  <SelectTrigger size="sm" className="bg-slate-50 border-slate-200 text-xs">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="rainfall">Rainfall</SelectItem>
                    <SelectItem value="thunderstorm">Thunderstorm</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="heatwave">Heatwave</SelectItem>
                    <SelectItem value="fog">Fog</SelectItem>
                    <SelectItem value="dust storm">Dust Storm</SelectItem>
                    <SelectItem value="strong wind">Strong Wind</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Select */}
              <div className="w-36">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger size="sm" className="bg-slate-50 border-slate-200 text-xs">
                    <SelectValue placeholder="State / City" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="west bengal">West Bengal</SelectItem>
                    <SelectItem value="tamil nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="delhi ncr">Delhi NCR</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="assam">Assam</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Filter (Popover + Calendar) */}
              <Popover open={dateFilterOpen} onOpenChange={setDateFilterOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-slate-200 bg-slate-50 text-slate-700 gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>25 Sep 2026</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="end">
                  <Calendar
                    mode="single"
                    selected={filterDate}
                    onSelect={(d) => {
                      setFilterDate(d);
                      setDateFilterOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Clear Filters Button */}
              {(selectedEventType !== "all" ||
                selectedLocation !== "all" ||
                selectedStatusTab !== "all" ||
                searchQuery !== "") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="h-8 text-xs text-slate-500 hover:text-slate-900 gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* c. DATA TABLE (shadcn Table) */}
      <Card className="border-slate-200 bg-white shadow-2xs overflow-hidden">
        <CardHeader className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              National Ingestion Stream ({filteredReports.length} Reports)
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Continuous multi-modal observations cross-validated across ground sensors and satellite telemetry.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="w-24 text-xs font-semibold text-slate-700">Report ID</TableHead>
                <TableHead className="w-32 text-xs font-semibold text-slate-700">Date / Time</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Location</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Event Type</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Source</TableHead>
                <TableHead className="w-24 text-xs font-semibold text-slate-700">Media</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Verification Status</TableHead>
                <TableHead className="w-28 text-xs font-semibold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-slate-400 text-sm">
                    No reports match the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((row) => {
                  const EventIcon = row.icon;
                  return (
                    <TableRow
                      key={row.id}
                      onClick={() => setSelectedReport(row)}
                      className="cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Report ID */}
                      <TableCell className="font-mono text-xs font-semibold text-blue-700">
                        {row.id}
                      </TableCell>

                      {/* Date/Time */}
                      <TableCell className="text-xs text-slate-500 font-mono">
                        {row.dateTime}
                      </TableCell>

                      {/* Location */}
                      <TableCell className="text-xs font-medium text-slate-900">
                        <div>
                          <span>{row.city}</span>
                          <span className="block text-[11px] text-slate-400">{row.state}</span>
                        </div>
                      </TableCell>

                      {/* Event Type */}
                      <TableCell className="text-xs font-medium text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                            <EventIcon className="w-3.5 h-3.5" />
                          </div>
                          <span>{row.eventType}</span>
                        </div>
                      </TableCell>

                      {/* Source */}
                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-medium border ${
                            row.source === "Twitter/X"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : row.source === "Citizen App"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : row.source === "IMD AWS"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-indigo-50 text-indigo-800 border-indigo-200"
                          }`}
                        >
                          {row.source}
                        </Badge>
                      </TableCell>

                      {/* Media */}
                      <TableCell className="text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          {row.mediaType === "photo" && (
                            <>
                              <Camera className="w-3.5 h-3.5 text-blue-600" />
                              <span>{row.mediaCount} Photos</span>
                            </>
                          )}
                          {row.mediaType === "video" && (
                            <>
                              <Video className="w-3.5 h-3.5 text-purple-600" />
                              <span>Video</span>
                            </>
                          )}
                          {row.mediaType === "sensor" && (
                            <>
                              <Radio className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Telemetry</span>
                            </>
                          )}
                        </div>
                      </TableCell>

                      {/* Verification Status */}
                      <TableCell className="text-xs">
                        {row.status === "verified" && (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10.5px] gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Verified ({row.confidence}%)
                          </Badge>
                        )}
                        {row.status === "pending" && (
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10.5px] gap-1 font-semibold">
                            <Clock className="w-3 h-3" /> Pending Review
                          </Badge>
                        )}
                        {row.status === "flagged" && (
                          <Badge className="bg-red-50 text-red-700 border-red-200 text-[10.5px] gap-1 font-semibold">
                            <ShieldAlert className="w-3 h-3" /> Flagged Fake
                          </Badge>
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right text-xs">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setSelectedReport(row)}
                            title="Inspect Details"
                            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => handleApprove(row.id, e)}
                            title="Approve Report"
                            className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => handleReject(row.id, e)}
                            title="Reject / Flag Report"
                            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Showing 1 to {filteredReports.length} of 142 total reports recorded today
          </span>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5" disabled>
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              <span>Previous</span>
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5 bg-blue-50 text-blue-700 font-semibold border-blue-200">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* d. ANALYTICS CHARTS SECTION (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Event Type Distribution Card */}
        <Card className="border-slate-200 bg-white shadow-2xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Event Type Distribution
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Relative frequency of categorized meteorological hazards over the last 24h.
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-semibold text-blue-700 bg-blue-50 border-blue-200">
                12,480 Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 pt-2">
            {[
              { label: "Rainfall", count: "4,820 reports", pct: 38.6, color: "bg-blue-600" },
              { label: "Thunderstorm & Squall", count: "2,940 reports", pct: 23.5, color: "bg-amber-500" },
              { label: "Urban Flood & Inundation", count: "1,650 reports", pct: 13.2, color: "bg-cyan-600" },
              { label: "Heatwave Alerts", count: "1,410 reports", pct: 11.3, color: "bg-red-500" },
              { label: "Strong Wind & Gale", count: "1,020 reports", pct: 8.2, color: "bg-teal-500" },
              { label: "Dense Fog & Dust Storm", count: "640 reports", pct: 5.2, color: "bg-slate-500" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <div className="text-slate-500">
                    <span className="font-mono text-slate-800">{item.count}</span>{" "}
                    <span className="text-[11px] text-slate-400">({item.pct}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
            Source: National Multi-Modal Ingestion Model (Kafka Stream Layer)
          </CardFooter>
        </Card>

        {/* Right: Reports Trend (Last 7 Days) SVG Area Chart Card */}
        <Card className="border-slate-200 bg-white shadow-2xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Reports Trend (Last 7 Days)
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Daily aggregate volume of incoming crowdsourced and sensor reports.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+22% Monsoonal Surge</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {/* SVG Area / Line Chart with Gradient Fill */}
            <div className="relative w-full h-48">
              <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Guidelines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#e2e8f0" strokeWidth="1" />

                {/* Area Fill */}
                <path
                  d="M 20 120 Q 95 105, 170 85 T 320 60 T 400 45 T 480 25 L 480 150 L 20 150 Z"
                  fill="url(#areaGradient)"
                />

                {/* Line Path */}
                <path
                  d="M 20 120 Q 95 105, 170 85 T 320 60 T 400 45 T 480 25"
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                {[
                  { cx: 20, cy: 120, day: "19 Sep", val: "7.8k" },
                  { cx: 95, cy: 105, day: "20 Sep", val: "8.4k" },
                  { cx: 170, cy: 85, day: "21 Sep", val: "9.2k" },
                  { cx: 245, cy: 75, day: "22 Sep", val: "9.9k" },
                  { cx: 320, cy: 60, day: "23 Sep", val: "10.6k" },
                  { cx: 400, cy: 45, day: "24 Sep", val: "11.2k" },
                  { cx: 480, cy: 25, day: "25 Sep", val: "12.5k" },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <circle cx={pt.cx} cy={pt.cy} r="4" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2.5" />
                    <text
                      x={pt.cx}
                      y={pt.cy - 10}
                      textAnchor="middle"
                      className="text-[9.5px] font-mono fill-slate-700 font-semibold"
                    >
                      {pt.val}
                    </text>
                    <text
                      x={pt.cx}
                      y="160"
                      textAnchor="middle"
                      className="text-[10px] font-sans fill-slate-400"
                    >
                      {pt.day}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </CardContent>

          <CardFooter className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
            <span>Peak Observation: 12,480 reports on 25 Sep</span>
            <span className="text-emerald-600 font-medium">99.4% Ingestion Uptime</span>
          </CardFooter>
        </Card>
      </div>

      {/* Inspect Incident Dialog Modal */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
          <DialogContent className="sm:max-w-lg bg-white border border-slate-200 p-6 shadow-2xl">
            <DialogHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 border-blue-200">
                  {selectedReport.id}
                </Badge>
                <Badge
                  className={
                    selectedReport.status === "verified"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : selectedReport.status === "flagged"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }
                >
                  {selectedReport.status.toUpperCase()} ({selectedReport.confidence}%)
                </Badge>
              </div>
              <DialogTitle className="text-lg font-bold text-slate-900 pt-1">
                {selectedReport.eventType} Alert — {selectedReport.city}, {selectedReport.state}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Timestamp: {selectedReport.dateTime} IST • Ingestion Source: {selectedReport.source}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-700 block font-semibold">Incident Details:</strong>
                <p className="text-slate-600 leading-relaxed">{selectedReport.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Media Evidence:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {selectedReport.mediaType} ({selectedReport.mediaCount} files)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">AI Confidence:</span>
                  <span className="font-semibold text-emerald-700">
                    {selectedReport.confidence}% High Assurance
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:justify-between flex-row">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    handleReject(selectedReport.id, {} as React.MouseEvent);
                    setSelectedReport(null);
                  }}
                >
                  Flag as Fake
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  onClick={() => {
                    handleApprove(selectedReport.id, {} as React.MouseEvent);
                    setSelectedReport(null);
                  }}
                >
                  Approve & Broadcast
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
