"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  FileSpreadsheet,
  FileCode,
  CheckCircle,
  BarChart3,
  TrendingUp,
  MapPin,
  CloudRain,
  Clock,
  Sparkles,
  Filter,
  Check,
  X,
  FileCheck2,
  Share2,
  Layers,
  ArrowDownToLine,
  RefreshCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export interface GeneratedReport {
  id: string;
  name: string;
  generatedDate: string;
  dateRange: string;
  type: "Summary Report" | "Event-wise Breakdown" | "Verification Audit Log" | "State-wise Analysis";
  format: "PDF" | "CSV" | "Excel";
  fileSize: string;
  downloadCount: number;
}

const initialReportsList: GeneratedReport[] = [
  {
    id: "REP-2026-0925",
    name: "IMD_National_Monsoon_Summary_W38.pdf",
    generatedDate: "25 Sep 2026, 18:30 IST",
    dateRange: "18 Sep - 25 Sep 2026",
    type: "Summary Report",
    format: "PDF",
    fileSize: "4.2 MB",
    downloadCount: 14,
  },
  {
    id: "REP-2026-0924",
    name: "Severe_Weather_Events_Maharashtra_Konkan.xlsx",
    generatedDate: "24 Sep 2026, 14:15 IST",
    dateRange: "01 Sep - 24 Sep 2026",
    type: "Event-wise Breakdown",
    format: "Excel",
    fileSize: "1.8 MB",
    downloadCount: 8,
  },
  {
    id: "REP-2026-0923",
    name: "AI_Verification_Audit_Log_Q3_Citizen_Feeds.csv",
    generatedDate: "23 Sep 2026, 11:00 IST",
    dateRange: "01 Jul - 23 Sep 2026",
    type: "Verification Audit Log",
    format: "CSV",
    fileSize: "840 KB",
    downloadCount: 22,
  },
  {
    id: "REP-2026-0922",
    name: "Western_Ghats_Flood_Inundation_Analysis.pdf",
    generatedDate: "22 Sep 2026, 19:45 IST",
    dateRange: "15 Sep - 22 Sep 2026",
    type: "State-wise Analysis",
    format: "PDF",
    fileSize: "6.1 MB",
    downloadCount: 19,
  },
  {
    id: "REP-2026-0920",
    name: "Doppler_Radar_Corroboration_Audit_Bengal.xlsx",
    generatedDate: "20 Sep 2026, 16:20 IST",
    dateRange: "10 Sep - 20 Sep 2026",
    type: "Verification Audit Log",
    format: "Excel",
    fileSize: "2.4 MB",
    downloadCount: 6,
  },
  {
    id: "REP-2026-0918",
    name: "Coastal_Depression_Gale_Impact_Odisha.pdf",
    generatedDate: "18 Sep 2026, 09:30 IST",
    dateRange: "11 Sep - 18 Sep 2026",
    type: "State-wise Analysis",
    format: "PDF",
    fileSize: "3.7 MB",
    downloadCount: 12,
  },
];

export default function ReportsPage() {
  // Report Generator Form State
  const [reportType, setReportType] = useState<GeneratedReport["type"]>("Summary Report");
  const [format, setFormat] = useState<GeneratedReport["format"]>("PDF");
  const [datePreset, setDatePreset] = useState("Last 7 Days (19 Sep - 26 Sep 2026)");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 8, 26));
  const [isGenerating, setIsGenerating] = useState(false);

  // Reports List State
  const [reports, setReports] = useState<GeneratedReport[]>(initialReportsList);

  // Toast State
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    type: "success" | "info";
  } | null>(null);

  const triggerToast = (title: string, description: string, type: "success" | "info" = "success") => {
    setToastMessage({ title, description, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const ext = format === "PDF" ? "pdf" : format === "Excel" ? "xlsx" : "csv";
      const sanitizedType = reportType.replace(/\s+/g, "_");
      const newReport: GeneratedReport = {
        id: `REP-2026-09${26 + Math.floor(Math.random() * 10)}`,
        name: `IMD_${sanitizedType}_${new Date().toISOString().slice(0, 10)}.${ext}`,
        generatedDate: "Just now",
        dateRange: datePreset,
        type: reportType,
        format: format,
        fileSize: format === "PDF" ? "3.8 MB" : format === "Excel" ? "1.9 MB" : "640 KB",
        downloadCount: 0,
      };

      setReports((prev) => [newReport, ...prev]);
      triggerToast(
        "Report Generated Successfully",
        `Created "${newReport.name}" (${newReport.format}) ready for download.`,
        "success"
      );
    }, 1000);
  };

  const handleDownload = (report: GeneratedReport) => {
    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    triggerToast(
      "Download Started",
      `Initiated download for ${report.name} (${report.fileSize}).`,
      "info"
    );
  };

  const getFormatBadge = (fmt: GeneratedReport["format"]) => {
    switch (fmt) {
      case "PDF":
        return {
          icon: FileText,
          style: "bg-red-50 text-red-700 border-red-200",
        };
      case "Excel":
        return {
          icon: FileSpreadsheet,
          style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "CSV":
        return {
          icon: FileCode,
          style: "bg-blue-50 text-blue-700 border-blue-200",
        };
      default:
        return {
          icon: FileText,
          style: "bg-slate-50 text-slate-700 border-slate-200",
        };
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans relative">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/90 pb-4 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
            Reports & Analytics Export
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate and export official IMD meteorological bulletins, verification audit logs, and multi-hazard data sheets.
          </p>
        </div>

        <Badge variant="outline" className="text-blue-800 bg-blue-50 border-blue-200 text-xs w-fit">
          <Clock className="w-3 h-3 mr-1 text-blue-600" />
          Auto-Sync: Daily 18:00 IST
        </Badge>
      </div>

      {/* 2. QUICK STATS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1 */}
        <Card className="border-slate-200/90 bg-white p-4 rounded-xl shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wide text-[11px] text-slate-600">
              Total Reports This Month
            </span>
            <span className="flex items-center text-emerald-700 bg-emerald-50 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +12.4%
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 font-heading">
            1,428
          </div>
          <p className="text-[11px] text-slate-400">
            Aggregated across 36 states and union territories.
          </p>
        </Card>

        {/* Stat 2 */}
        <Card className="border-slate-200/90 bg-white p-4 rounded-xl shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wide text-[11px] text-slate-600">
              Most Active Region
            </span>
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-heading">
            Maharashtra
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            412 reports <span className="text-slate-400 font-normal">(Konkan & Mumbai Suburban)</span>
          </p>
        </Card>

        {/* Stat 3 */}
        <Card className="border-slate-200/90 bg-white p-4 rounded-xl shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wide text-[11px] text-slate-600">
              Most Common Hazard
            </span>
            <CloudRain className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-heading">
            Monsoonal Flood
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            38.2% <span className="text-slate-400 font-normal">of all verified meteorological alerts</span>
          </p>
        </Card>
      </div>

      {/* 3. REPORT GENERATOR CARD */}
      <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-bold text-slate-900 font-heading">
              Custom Report Generator
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Filter telemetry timeframes, select categorization templates, and export formatted dossiers.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          <form onSubmit={handleGenerateReport} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date Range Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                  Date Range / Timeframe
                </label>
                <div className="flex gap-2">
                  <select
                    value={datePreset}
                    onChange={(e) => setDatePreset(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Last 24 Hours (25 Sep - 26 Sep 2026)">Last 24 Hours</option>
                    <option value="Last 7 Days (19 Sep - 26 Sep 2026)">Last 7 Days</option>
                    <option value="Current Month (September 2026)">Current Month (Sep 2026)</option>
                    <option value="Monsoon Q3 (July - September 2026)">Monsoon Q3 (Jul - Sep)</option>
                    <option value="Past 90 Days Cumulative">Past 90 Days Cumulative</option>
                  </select>

                  {/* Calendar Popover Trigger */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-2.5 text-slate-600 border-slate-200 bg-slate-50 hover:bg-slate-100 shrink-0"
                        title="Pick custom date"
                      >
                        <CalendarIcon className="w-3.5 h-3.5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            setSelectedDate(date);
                            setDatePreset(`Custom Date: ${date.toLocaleDateString("en-IN")}`);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Report Type Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Report Template / Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as GeneratedReport["type"])}
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Summary Report">Summary Report</option>
                  <option value="Event-wise Breakdown">Event-wise Breakdown</option>
                  <option value="Verification Audit Log">Verification Audit Log</option>
                  <option value="State-wise Analysis">State-wise Analysis</option>
                </select>
              </div>

              {/* Format Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Export File Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as GeneratedReport["format"])}
                  className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="PDF">PDF (Printable Dossier with Charts)</option>
                  <option value="Excel">Excel (.xlsx with Pivot Tables)</option>
                  <option value="CSV">CSV (Raw Sensor Telemetry)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Generated files are cached for 30 days and comply with IMD Open Data policies.
              </span>

              <Button
                type="submit"
                disabled={isGenerating}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling Data...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    <span>Generate Report</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 4. RECENT REPORTS TABLE */}
      <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 bg-slate-50/60 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900 font-heading">
              Recently Generated Bulletins & Logs
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Showing {reports.length} generated documents available for immediate download.
            </CardDescription>
          </div>

          <Badge variant="outline" className="text-xs font-mono">
            {reports.length} Archives
          </Badge>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-slate-700 w-16">Format</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Document Name</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Report Type</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Timeframe</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Generated On</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700 text-right pr-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const formatBadge = getFormatBadge(report.format);
                const FormatIcon = formatBadge.icon;

                return (
                  <TableRow key={report.id} className="hover:bg-slate-50/60 border-b border-slate-100">
                    {/* Format Badge */}
                    <TableCell className="py-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold px-2 py-0.5 flex items-center gap-1 ${formatBadge.style}`}
                      >
                        <FormatIcon className="w-3 h-3" />
                        <span>{report.format}</span>
                      </Badge>
                    </TableCell>

                    {/* Document Name */}
                    <TableCell className="py-3">
                      <div className="font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                        <span>{report.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {report.fileSize} • {report.downloadCount} downloads
                      </div>
                    </TableCell>

                    {/* Report Type */}
                    <TableCell className="py-3 text-xs text-slate-600">
                      {report.type}
                    </TableCell>

                    {/* Timeframe */}
                    <TableCell className="py-3 text-xs text-slate-500 font-medium whitespace-nowrap">
                      {report.dateRange}
                    </TableCell>

                    {/* Generated Date */}
                    <TableCell className="py-3 text-xs text-slate-500 whitespace-nowrap">
                      {report.generatedDate}
                    </TableCell>

                    {/* Action Button */}
                    <TableCell className="py-3 text-right pr-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report)}
                        className="h-8 px-2.5 text-xs text-blue-700 border-blue-200 hover:bg-blue-50 gap-1.5 shadow-2xs font-semibold"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Floating Success / Info Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 flex items-start gap-3 max-w-sm animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 flex-1">
            <h4 className="text-xs font-bold text-slate-900">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-500 leading-normal">{toastMessage.description}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
