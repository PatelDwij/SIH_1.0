"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  CloudRain,
  CloudLightning,
  Waves,
  SunMedium,
  CloudFog,
  Wind,
  MapPin,
  Camera,
  Video,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Navigation,
  ShieldCheck,
  ArrowRight,
  Info,
  RotateCcw,
  Sparkles,
  Phone,
  User,
  ExternalLink,
  ChevronRight,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { supabase } from "@/lib/supabase";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi NCR",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const EVENT_TYPES = [
  { value: "rainfall", label: "Rainfall", icon: CloudRain, desc: "Torrential rain, continuous downpour, or cloudburst" },
  { value: "thunderstorm", label: "Thunderstorm", icon: CloudLightning, desc: "Lightning, thunder, squall, or hail" },
  { value: "flood", label: "Flood / Inundation", icon: Waves, desc: "Submerged roads, urban waterlogging, river overflow" },
  { value: "heatwave", label: "Heatwave", icon: SunMedium, desc: "Extreme scorching heat, hot winds (Loo)" },
  { value: "fog", label: "Dense Fog", icon: CloudFog, desc: "Severely restricted visibility, winter fog" },
  { value: "dust_storm", label: "Dust Storm", icon: Wind, desc: "Gale-force dust, haboob, reduced visibility" },
  { value: "strong_wind", label: "Strong Wind / Gale", icon: Wind, desc: "High velocity gusts, tree/roof damage" },
];

/**
 * Ensures any event type string is normalized to the exact Supabase CHECK constraint values:
 * 'rainfall' | 'thunderstorm' | 'flood' | 'heatwave' | 'fog' | 'dust_storm' | 'strong_wind'
 */
const mapToDatabaseEventType = (input: string): string => {
  if (!input) return "rainfall";
  const clean = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const validMapping: Record<string, string> = {
    // Rainfall
    rainfall: "rainfall",
    rain: "rainfall",
    heavy_rain: "rainfall",
    cloudburst: "rainfall",

    // Thunderstorm
    thunderstorm: "thunderstorm",
    thunder: "thunderstorm",
    lightning: "thunderstorm",
    hailstorm: "thunderstorm",

    // Flood
    flood: "flood",
    flooding: "flood",
    inundation: "flood",
    flood_inundation: "flood",
    urban_waterlogging: "flood",
    flash_flood: "flood",
    waterlogging: "flood",

    // Heatwave
    heatwave: "heatwave",
    heat_wave: "heatwave",
    extreme_heat: "heatwave",

    // Fog
    fog: "fog",
    dense_fog: "fog",
    mist: "fog",
    smog: "fog",

    // Dust storm
    dust_storm: "dust_storm",
    duststorm: "dust_storm",
    dust: "dust_storm",
    haboob: "dust_storm",

    // Strong wind
    strong_wind: "strong_wind",
    strongwind: "strong_wind",
    strong_wind_gale: "strong_wind",
    wind: "strong_wind",
    gale: "strong_wind",
    squall: "strong_wind",
  };

  if (validMapping[clean]) {
    return validMapping[clean];
  }

  // Heuristic safety checks
  if (clean.includes("rain") || clean.includes("cloudburst")) return "rainfall";
  if (clean.includes("thunder") || clean.includes("lightning") || clean.includes("hail")) return "thunderstorm";
  if (clean.includes("flood") || clean.includes("inundat") || clean.includes("waterlog")) return "flood";
  if (clean.includes("heat")) return "heatwave";
  if (clean.includes("fog") || clean.includes("mist")) return "fog";
  if (clean.includes("dust") || clean.includes("haboob")) return "dust_storm";
  if (clean.includes("wind") || clean.includes("gale") || clean.includes("squall")) return "strong_wind";

  return "rainfall";
};

const getEventDisplayLabel = (type: string): string => {
  const found = EVENT_TYPES.find((item) => item.value === type);
  if (found) return found.label;
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function CitizenReportPage() {
  // Form fields
  const [eventType, setEventType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [reporterName, setReporterName] = useState<string>("");
  const [reporterContact, setReporterContact] = useState<string>("");

  // Geolocation
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationCaptured, setLocationCaptured] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Media upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    eventType: string;
    city: string;
    state: string;
    mediaUrl?: string | null;
    timestamp: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Geolocation capture
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        setCoords({ lat, lng });
        setLocationCaptured(true);
        setIsLocating(false);

        // Optional reverse geocoding to suggest city/state if empty
        if (!city || !state) {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            if (data?.address) {
              const suggestedCity =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.suburb ||
                data.address.county;
              const suggestedState = data.address.state;

              if (suggestedCity && !city) setCity(suggestedCity);
              if (suggestedState && !state) {
                const matchedState = INDIAN_STATES.find(
                  (s) => s.toLowerCase() === suggestedState.toLowerCase()
                );
                if (matchedState) setState(matchedState);
              }
            }
          } catch {
            // Reverse geocode is best-effort; ignore errors
          }
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please enter City and State manually.");
        } else {
          setLocationError("Could not capture GPS location. Please enter location manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Media file handling
  const handleFileSelect = (file: File) => {
    // Validate file type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setErrorMessage("Please select a valid image (JPEG, PNG, WebP) or video (MP4, MOV).");
      return;
    }

    // Max 50MB limit
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File size exceeds 50MB limit. Please choose a smaller file.");
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setMediaType(isVideo ? "video" : "image");

    const objectUrl = URL.createObjectURL(file);
    setMediaPreview(objectUrl);
  };

  const handleRemoveMedia = () => {
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setSelectedFile(null);
    setMediaPreview(null);
    setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!eventType) errors.eventType = "Please select the weather event type";
    if (!city.trim()) errors.city = "City or District is required";
    if (!state) errors.state = "State is required";
    if (!description.trim()) {
      errors.description = "Please describe what you are seeing";
    } else if (description.trim().length < 10) {
      errors.description = "Please provide at least 10 characters describing the event";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top of form
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    let mediaUrl: string | null = null;
    let finalMediaType: "image" | "video" | null = null;

    try {
      // 1. Upload Media to Cloudinary if provided
      if (selectedFile) {
        setUploadStatus("Uploading media evidence to secure Cloudinary storage...");
        const uploadResult = await uploadToCloudinary(selectedFile);
        mediaUrl = uploadResult.secure_url;
        finalMediaType = selectedFile.type.startsWith("video/") ? "video" : "image";
      }

      // 2. Prepare description with optional reporter contact info
      setUploadStatus("Submitting report to national weather database...");
      let finalDescription = description.trim();
      const contactInfoParts = [];
      if (reporterName.trim()) contactInfoParts.push(`Name: ${reporterName.trim()}`);
      if (reporterContact.trim()) contactInfoParts.push(`Contact: ${reporterContact.trim()}`);

      if (contactInfoParts.length > 0) {
        finalDescription += `\n\n[Citizen Contact Details]: ${contactInfoParts.join(" | ")}`;
      }

      // 3. Map event type to exact lowercase snake_case database constraint value
      const dbEventType = mapToDatabaseEventType(eventType);

      // 4. Insert row into Supabase 'weather_reports' table
      const { data, error } = await supabase
        .from("weather_reports")
        .insert({
          event_type: dbEventType,
          location_city: city.trim(),
          location_state: state,
          latitude: coords?.lat ?? 20.5937,
          longitude: coords?.lng ?? 78.9629,
          description: finalDescription,
          source: "citizen",
          media_url: mediaUrl,
          media_type: finalMediaType,
          trust_score: 50,
          verification_status: "pending",
        })
        .select();

      if (error) {
        console.error("Supabase report insert notice:", error);
        throw new Error(error.message);
      }

      const insertedId = data && data[0]?.id ? data[0].id : `WX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // 5. Show success screen
      setSubmittedData({
        id: `WX-${insertedId.replace(/-/g, "").slice(0, 6).toUpperCase()}`,
        eventType: dbEventType,
        city: city.trim(),
        state,
        mediaUrl,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setSubmitSuccess(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } catch (err: unknown) {
      console.error("Report submission error:", err);
      const msg = err instanceof Error ? err.message : "Failed to submit report. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  const handleResetForm = () => {
    setEventType("");
    setCity("");
    setState("");
    setDescription("");
    setReporterName("");
    setReporterContact("");
    setCoords(null);
    setLocationCaptured(false);
    setLocationError(null);
    handleRemoveMedia();
    setSubmittedData(null);
    setSubmitSuccess(false);
    setErrorMessage(null);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white pb-20">
      {/* 1. Official Government Header Strip */}
      <section className="bg-gradient-to-r from-[#071324] via-[#0c1f3c] to-[#0a182d] text-white py-10 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#1b2d4b] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12243d] border border-blue-500/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of Earth Sciences (MoES) • IMD Public Desk</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
            Report Weather Event
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Witnessing severe weather in your locality? Submit real-time observations and media
            to assist the India Meteorological Department and disaster authorities.
          </p>

          {/* Impact Banner Note */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs text-left max-w-lg">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Public Notice:</strong> Your report helps IMD respond faster to weather
                emergencies across India.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        {submitSuccess && submittedData ? (
          /* ================= SUCCESS CONFIRMATION SCREEN ================= */
          <Card className="border-emerald-200 bg-white shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-250">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight font-heading">
                Report Submitted Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
                Thank you for contributing to India&apos;s meteorological safety grid. Our duty meteorologists
                will verify your report shortly.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Receipt Summary Box */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tracking Reference
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {submittedData.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Event Type</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {getEventDisplayLabel(submittedData.eventType)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Report Location</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {submittedData.city}, {submittedData.state}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Time Logged</span>
                    <span className="font-medium text-slate-700 mt-0.5 block">
                      Today at {submittedData.timestamp} IST
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Verification Status</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Pending Review
                    </span>
                  </div>
                </div>

                {submittedData.mediaUrl && (
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-slate-400 block text-[11px] mb-1">
                      Uploaded Media Evidence
                    </span>
                    <div className="h-28 w-40 rounded-lg overflow-hidden border border-slate-200 bg-black flex items-center justify-center">
                      <img
                        src={submittedData.mediaUrl}
                        alt="Evidence preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Informative Guidance */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your observation is now visible on the IMD Analyst Verification Queue.
                  Once validated against satellite and radar feeds, it will appear on the national
                  weather dashboard.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  onClick={handleResetForm}
                  className="w-full sm:flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Submit Another Report</span>
                </Button>

                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm gap-1.5"
                  >
                    <span>View Public Map</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* ================= THE CITIZEN SUBMISSION FORM ================= */
          <Card className="border-slate-200 bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/60 border-b border-slate-100 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-tight font-heading">
                    Weather Incident Details
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-1">
                    Fill out the fields below. Photos and videos significantly increase verification speed.
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="text-[11px] font-semibold text-blue-700 bg-blue-50 border-blue-200"
                >
                  Public Submission
                </Badge>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="p-5 sm:p-7 space-y-6">
                {/* General Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="block font-semibold">Submission Notice</strong>
                      <p className="leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* 1. Event Type Select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>
                      1. What weather event are you observing? <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">Required</span>
                  </label>

                  <Select value={eventType} onValueChange={(val) => {
                    setEventType(val);
                    if (formErrors.eventType) setFormErrors((prev) => ({ ...prev, eventType: "" }));
                  }}>
                    <SelectTrigger className={`h-11 bg-slate-50/60 text-sm border-slate-300 focus-visible:ring-blue-600 ${
                      formErrors.eventType ? "border-red-500 ring-1 ring-red-500" : ""
                    }`}>
                      <SelectValue placeholder="Select Weather Hazard Type...">
                        {eventType ? (
                          <div className="flex items-center gap-2">
                            {(() => {
                              const selected = EVENT_TYPES.find((e) => e.value === eventType);
                              if (!selected) return eventType;
                              const SelectedIcon = selected.icon;
                              return (
                                <>
                                  <SelectedIcon className="w-4 h-4 text-blue-600 shrink-0" />
                                  <span className="font-medium text-slate-800">{selected.label}</span>
                                </>
                              );
                            })()}
                          </div>
                        ) : null}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-72">
                      {EVENT_TYPES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SelectItem key={item.value} value={item.value} className="py-2.5 cursor-pointer">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <span className="font-semibold text-slate-900 block text-xs">
                                  {item.label}
                                </span>
                                <span className="text-[11px] text-slate-400 block font-normal">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  {formErrors.eventType && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.eventType}</span>
                    </p>
                  )}
                </div>

                {/* 2. Location Fields (City, State, Geolocation) */}
                <div className="space-y-3 pt-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>
                      2. Where is this happening? <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">Location</span>
                  </label>

                  {/* Geolocation Button */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        <span>Precise GPS Coordinates</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Auto-capture your device&apos;s current coordinates for pinpoint accuracy.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className={`h-9 text-xs font-semibold shrink-0 gap-1.5 transition-all ${
                        locationCaptured
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {isLocating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Acquiring GPS...</span>
                        </>
                      ) : locationCaptured ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>GPS Captured ✓</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span>Use My Current Location</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {locationCaptured && coords && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        GPS confirmed: <strong>{coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E</strong> (Embedded with report submission)
                      </span>
                    </div>
                  )}

                  {locationError && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{locationError}</span>
                    </div>
                  )}

                  {/* City and State Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* City Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-700">
                        City / Town / District <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Pune, Siliguri, Patna"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (formErrors.city) setFormErrors((prev) => ({ ...prev, city: "" }));
                        }}
                        className={`h-10 text-xs bg-slate-50/60 border-slate-300 focus-visible:ring-blue-600 ${
                          formErrors.city ? "border-red-500 ring-1 ring-red-500" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.city && (
                        <p className="text-[10.5px] text-red-600 font-medium">
                          {formErrors.city}
                        </p>
                      )}
                    </div>

                    {/* State Select */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-700">
                        State / UT <span className="text-red-500">*</span>
                      </label>
                      <Select value={state} onValueChange={(val) => {
                        setState(val);
                        if (formErrors.state) setFormErrors((prev) => ({ ...prev, state: "" }));
                      }}>
                        <SelectTrigger className={`h-10 bg-slate-50/60 text-xs border-slate-300 focus-visible:ring-blue-600 ${
                          formErrors.state ? "border-red-500 ring-1 ring-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select State / UT..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-60">
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs py-2 cursor-pointer">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.state && (
                        <p className="text-[10.5px] text-red-600 font-medium">
                          {formErrors.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Description Textarea */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      3. Describe what you are seeing <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {description.length} characters
                    </span>
                  </div>

                  <Textarea
                    rows={4}
                    placeholder="Describe what you're seeing - e.g. heavy rain, flooding depth, visible damage, road blockages, hail size..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (formErrors.description) setFormErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    className={`text-xs bg-slate-50/60 border-slate-300 focus-visible:ring-blue-600 min-h-24 ${
                      formErrors.description ? "border-red-500 ring-1 ring-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />

                  {formErrors.description ? (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.description}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400">
                      Include specific landmarks, estimated water depth, or notable hazards if visible.
                    </p>
                  )}
                </div>

                {/* 4. Media Upload Area */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>4. Attach Photo or Video Evidence</span>
                    <span className="text-[11px] font-normal text-slate-400">
                      Highly Recommended
                    </span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                    accept="image/*,video/*"
                    className="hidden"
                    disabled={isSubmitting}
                  />

                  {!mediaPreview ? (
                    /* Dropzone when no file selected */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                        isDragging
                          ? "border-blue-500 bg-blue-50/80 scale-[1.01]"
                          : "border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center gap-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            Click to upload or drag and drop media
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Photos (JPEG, PNG, WebP) or Videos (MP4, MOV) up to 50MB
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            <Camera className="w-3 h-3 text-blue-600" /> Photo
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            <Video className="w-3 h-3 text-purple-600" /> Video
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Preview card when file is selected */
                    <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-black shrink-0 flex items-center justify-center">
                          {mediaType === "video" ? (
                            <div className="flex flex-col items-center justify-center text-white">
                              <Video className="w-6 h-6 text-purple-400" />
                              <span className="text-[9px] uppercase font-bold mt-1">Video</span>
                            </div>
                          ) : (
                            <img
                              src={mediaPreview}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {selectedFile?.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB" : ""} •{" "}
                            <span className="capitalize font-medium text-blue-600">
                              {mediaType}
                            </span>
                          </p>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Ready for upload
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveMedia}
                        disabled={isSubmitting}
                        className="text-slate-500 hover:text-red-600 hover:bg-red-50 h-8 px-2.5 text-xs shrink-0"
                      >
                        <X className="w-4 h-4 mr-1" />
                        <span>Remove</span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* 5. Reporter Contact (Optional) */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-slate-800">
                      5. Your Contact Information (Optional)
                    </label>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      For IMD meteorological verification follow-up only. This information is confidential
                      and never shown publicly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">
                        Full Name (Optional)
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          type="text"
                          placeholder="e.g. Ramesh Chandra"
                          value={reporterName}
                          onChange={(e) => setReporterName(e.target.value)}
                          className="pl-8 h-9 text-xs bg-slate-50/60 border-slate-300"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">
                        Phone or Email (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          type="text"
                          placeholder="+91 98765 43210 or email"
                          value={reporterContact}
                          onChange={(e) => setReporterContact(e.target.value)}
                          className="pl-8 h-9 text-xs bg-slate-50/60 border-slate-300"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Footer / Submit Button */}
              <CardFooter className="bg-slate-50/70 border-t border-slate-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 text-center sm:text-left">
                  By submitting, you confirm that your observation is truthful and unmanipulated.
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px] h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                      <span>{uploadStatus || "Submitting..."}</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>Submit Weather Report</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* 3. Helpful Reporting Guide */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tips for Citizen Observers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-semibold text-slate-800 block">1. Prioritize Personal Safety</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Never approach rushing floodwaters, downed electrical lines, or lightning-prone areas.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-semibold text-slate-800 block">2. Capture Landmarks</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Include visible signboards, road dividers, or recognizable structures to corroborate location.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-semibold text-slate-800 block">3. Authentic Recent Media</span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Only submit photos and videos captured today. AI models flag recycled footage from previous years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
