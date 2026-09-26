"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CloudRainWind,
  Activity,
  Shield,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Radio,
  FileCheck2,
  Server,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation & UI states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Official Email or NIC ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.toLowerCase().includes("imd")) {
      newErrors.email = "Please enter a valid official email (e.g. analyst@imd.gov.in)";
    }

    if (!password) {
      newErrors.password = "Password or Security Token is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginSuccess(false);

    // Simulated authentication delay (UI only, awaiting Supabase in Step 4)
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);

      // Redirect to dashboard after brief simulated verification
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* 1. Mobile Visual Banner (Visible only on small screens) */}
      <div className="lg:hidden bg-gradient-to-b from-[#071324] to-[#0c1f3c] text-white p-6 border-b border-[#1b2f4d] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight">
              WeatherData<span className="text-sky-400">X</span>
            </span>
          </Link>

          <Badge variant="outline" className="text-[10px] text-sky-300 border-blue-400/40 bg-blue-950/60">
            256-bit Encrypted
          </Badge>
        </div>

        <div className="mt-4 relative z-10">
          <p className="text-xs text-sky-300 font-semibold tracking-wide uppercase">
            Ministry of Earth Sciences • IMD
          </p>
          <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
            National Weather Big Data Analytics Console
          </h2>
        </div>
      </div>

      {/* 2. Left Side: Login Form (40% width on Desktop) */}
      <div className="w-full lg:w-[42%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white border-r border-slate-200 z-10">
        {/* Top Header: Logo / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to WeatherDataX</span>
          </Link>

          <span className="hidden sm:inline-flex text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Internal Portal
          </span>
        </div>

        {/* Center: The Login Card */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">
          <Card className="border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg bg-white rounded-2xl">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge
                  variant="outline"
                  className="text-[10.5px] font-semibold text-blue-800 border-blue-200 bg-blue-50/70"
                >
                  MoES • IMD Operational Node
                </Badge>
              </div>

              <CardTitle className="text-2xl font-bold text-[#0a192f] tracking-tight font-heading pt-1">
                IMD Weather Analytics — Secure Access
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 leading-relaxed">
                Enter your authorized credentials to access national sensor streams,
                verification feeds, and emergency hazard broadcasting consoles.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {loginSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block font-semibold">Authentication Verified</strong>
                    <span>Establishing secure tunnel to analytics console...</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email / NIC ID Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Official Email / NIC ID</span>
                    <span className="text-[11px] font-normal text-slate-400">gov.in / nic.in</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="analyst.weather@imd.gov.in"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`pl-9 h-10 bg-slate-50/60 text-sm border-slate-300 focus-visible:ring-blue-600 ${
                        errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || loginSuccess}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Password / Security Token
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSupportModal(true)}
                      className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`pl-9 pr-10 h-10 bg-slate-50/60 text-sm border-slate-300 focus-visible:ring-blue-600 ${
                        errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || loginSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Remember This Device Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-xs font-medium text-slate-700 cursor-pointer select-none"
                    >
                      Remember this device
                    </label>
                  </div>
                  <span className="text-[10.5px] text-slate-400 hidden sm:inline">
                    30-day session
                  </span>
                </div>

                {/* Primary Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading || loginSuccess}
                  className="w-full h-10 bg-[#0a192f] hover:bg-[#162f55] text-white font-medium shadow-sm transition-all gap-2 mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : loginSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Access Granted</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-sky-400" />
                      <span>Sign In to Analytics Console</span>
                    </>
                  )}
                </Button>
              </form>

              {/* Security Advisory Pill */}
              <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Notice: All session logins are audited in compliance with CERT-In and MoES cybersecurity frameworks.
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-2 pb-4 text-center justify-center">
              <p className="text-xs text-slate-500">
                Facing authentication trouble?{" "}
                <button
                  type="button"
                  onClick={() => setShowSupportModal(true)}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Contact System Admin
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Support Modal dialog fallback */}
        {showSupportModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  System Admin Assistance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For password resets or multi-factor token reissue, reach out to the IMD Central Informatics Helpdesk.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="text-slate-500 block">NIC Technical Helpdesk:</span>
                  <strong className="text-slate-900">1800-180-1717 (Ext. 402)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Official Support Email:</span>
                  <a
                    href="mailto:admin.auth@imd.gov.in"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    admin.auth@imd.gov.in
                  </a>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-full bg-[#0a192f] text-white"
                onClick={() => setShowSupportModal(false)}
              >
                Close Support Notice
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Footer Attribution */}
        <div className="text-[11px] text-slate-400 text-center sm:text-left flex items-center justify-between">
          <span>© 2026 Ministry of Earth Sciences (MoES)</span>
          <span className="hidden sm:inline">Govt. of India</span>
        </div>
      </div>

      {/* 3. Right Side: Visual Panel (60% width on Desktop) */}
      <div className="hidden lg:flex lg:w-[58%] bg-gradient-to-br from-[#071324] via-[#0b1d3a] to-[#08152b] text-white relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Radar Ring Pattern & Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        {/* Concentric Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-blue-500/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-sky-400/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-400/20 rounded-full pointer-events-none" />

        {/* Top Row: System Status & Security Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md ring-1 ring-blue-400/30">
              <CloudRainWind className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight font-heading">
                WeatherData<span className="text-sky-400">X</span>
              </span>
              <span className="block text-[11px] text-slate-400">
                National Big Data Analytics Hub
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12243d] border border-blue-500/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit Encrypted • NIC Compliant</span>
          </div>
        </div>

        {/* Center: Hero Statement & Telemetry Badge */}
        <div className="relative z-10 max-w-xl my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-sky-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Restricted Meteorological Authority Access</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight">
            National Weather Big Data{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Analytics Platform
            </span>
          </h1>

          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Secure, mission-critical portal for verified India Meteorological Department (IMD)
            meteorologists, NDMA and State Disaster Management Authority (SDMA) command cells,
            and authorized atmospheric data scientists.
          </p>

          {/* Real-time Status Card Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0e1f38]/80 border border-[#1b345b] backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Active Ingestion Mesh</span>
              </div>
              <div className="text-base font-bold text-white">1,480+ Nodes Online</div>
              <div className="text-[11px] text-emerald-400">All feeds operational</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e1f38]/80 border border-[#1b345b] backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span>Security Protocol</span>
              </div>
              <div className="text-base font-bold text-white">TLS 1.3 / MFA</div>
              <div className="text-[11px] text-sky-300">CERT-In Hardened</div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Safeguard Statement */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <p>
            Safeguarding communities with real-time crowd and radar intelligence.
          </p>
          <span className="text-slate-500 font-mono text-[11px]">Node #DEL-IN-01</span>
        </div>
      </div>
    </div>
  );
}
