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
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Radio,
  FileCheck2,
  Server,
  Building,
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
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & UI states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Full Official Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Official Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g. analyst@imd.gov.in)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSignupSuccess(false);
    setErrors((prev) => ({ ...prev, general: undefined }));

    try {
      // 1. Firebase Authentication: Create User Account
      const { user, error } = await signUpWithEmail(email, password, name.trim());

      if (error || !user) {
        setIsLoading(false);
        setErrors((prev) => ({
          ...prev,
          general: error || "Account registration failed. Please try again.",
        }));
        return;
      }

      // 2. Supabase: Create corresponding row in user_profiles table
      try {
        const { error: profileError } = await supabase.from("user_profiles").insert({
          id: user.uid,
          email: user.email || email.trim(),
          display_name: name.trim(),
          role: "analyst",
          department: "National Weather Forecasting Centre (NWFC)",
          station_id: "DEL-HQ-01",
        });

        if (profileError) {
          console.warn("[Supabase] user_profiles insert notice:", profileError.message);
        }
      } catch (dbErr) {
        console.warn("[Supabase] Could not insert user profile row:", dbErr);
      }

      // 3. Success Feedback & Redirect
      setIsLoading(false);
      setSignupSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "An unexpected registration error occurred.";
      setErrors((prev) => ({ ...prev, general: message }));
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    try {
      const { user, error } = await signInWithGoogle();

      if (error || !user) {
        setIsGoogleLoading(false);
        setErrors((prev) => ({
          ...prev,
          general: error || "Google registration could not be completed.",
        }));
        return;
      }

      // Ensure profile row exists in Supabase
      try {
        await supabase.from("user_profiles").upsert(
          {
            id: user.uid,
            email: user.email || "",
            display_name: user.displayName || "Meteorologist Analyst",
            role: "analyst",
            department: "IMD Weather Analytics",
            station_id: "DEL-HQ-01",
          },
          { onConflict: "id" }
        );
      } catch (dbErr) {
        console.warn("[Supabase] Profile upsert notice:", dbErr);
      }

      setIsGoogleLoading(false);
      setSignupSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: unknown) {
      setIsGoogleLoading(false);
      const message = err instanceof Error ? err.message : "Google registration error.";
      setErrors((prev) => ({ ...prev, general: message }));
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* 1. Mobile Visual Banner */}
      <div className="lg:hidden bg-gradient-to-b from-[#071324] to-[#0c1f3c] text-white p-6 border-b border-[#1b2f4d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight">
              WeatherData<span className="text-sky-400">X</span>
            </span>
          </Link>

          <Badge variant="outline" className="text-[10px] text-sky-300 border-blue-400/40 bg-blue-950/60">
            Official Registration
          </Badge>
        </div>

        <div className="mt-4 relative z-10">
          <p className="text-xs text-sky-300 font-semibold tracking-wide uppercase">
            Ministry of Earth Sciences • IMD
          </p>
          <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Analyst Account Onboarding
          </h2>
        </div>
      </div>

      {/* 2. Left Side: Signup Form (42% width on Desktop) */}
      <div className="w-full lg:w-[42%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white border-r border-slate-200 z-10">
        {/* Top Header: Logo / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Sign In</span>
          </Link>

          <span className="hidden sm:inline-flex text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            New Onboarding
          </span>
        </div>

        {/* Center: The Signup Card */}
        <div className="my-auto py-6 max-w-md w-full mx-auto">
          <Card className="border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg bg-white rounded-2xl">
            <CardHeader className="space-y-2 pb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge
                  variant="outline"
                  className="text-[10.5px] font-semibold text-blue-800 border-blue-200 bg-blue-50/70"
                >
                  IMD Analyst Enrollment
                </Badge>
              </div>

              <CardTitle className="text-2xl font-bold text-[#0a192f] tracking-tight font-heading pt-1">
                Create Analyst Profile
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 leading-relaxed">
                Register authorized analyst credentials for the national weather big data telemetry network.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Success Notification */}
              {signupSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block font-semibold">Registration Successful</strong>
                    <span>Creating analyst database record & redirecting...</span>
                  </div>
                </div>
              )}

              {/* General Error Banner */}
              {errors.general && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <div>
                    <strong className="block font-semibold">Registration Failed</strong>
                    <span>{errors.general}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-3.5">
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Official Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="Dr. Rajesh V. Sharma"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={`pl-9 h-9 bg-slate-50/60 text-xs border-slate-300 focus-visible:ring-blue-600 ${
                        errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || isGoogleLoading || signupSuccess}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Government / Official Email</span>
                    <span className="text-[10px] text-slate-400">gov.in / organization</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="email"
                      placeholder="rajesh.sharma@imd.gov.in"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`pl-9 h-9 bg-slate-50/60 text-xs border-slate-300 focus-visible:ring-blue-600 ${
                        errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || isGoogleLoading || signupSuccess}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`pl-9 pr-9 h-9 bg-slate-50/60 text-xs border-slate-300 focus-visible:ring-blue-600 ${
                        errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || isGoogleLoading || signupSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) {
                          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                        }
                      }}
                      className={`pl-9 pr-9 h-9 bg-slate-50/60 text-xs border-slate-300 focus-visible:ring-blue-600 ${
                        errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      disabled={isLoading || isGoogleLoading || signupSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || isGoogleLoading || signupSuccess}
                  className="w-full h-10 bg-[#0a192f] hover:bg-[#162f55] text-white font-medium shadow-sm transition-all gap-2 mt-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                      <span>Registering Analyst Account...</span>
                    </>
                  ) : signupSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Account Created</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>Complete Registration</span>
                    </>
                  )}
                </Button>
              </form>

              {/* Or Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-[10.5px] uppercase">
                  <span className="bg-white px-2 text-slate-400 font-semibold tracking-wider">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Continue with Google */}
              <Button
                type="button"
                variant="outline"
                disabled={isLoading || isGoogleLoading || signupSuccess}
                onClick={handleGoogleSignup}
                className="w-full h-9 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs gap-2.5 shadow-2xs"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Sign Up with Google Workspace</span>
              </Button>

              {/* Already have an account */}
              <div className="pt-2 text-center border-t border-slate-100">
                <p className="text-xs text-slate-600">
                  Already registered?{" "}
                  <Link
                    href="/login"
                    className="text-blue-700 font-bold hover:underline"
                  >
                    Sign In to Existing Account
                  </Link>
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-1 pb-4 text-center justify-center">
              <p className="text-[11px] text-slate-400">
                By registering, you agree to comply with IMD Official Secrets & Data Ethics norms.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom Footer Attribution */}
        <div className="text-[11px] text-slate-400 text-center sm:text-left flex items-center justify-between">
          <span>© 2026 Ministry of Earth Sciences (MoES)</span>
          <span className="hidden sm:inline">Govt. of India</span>
        </div>
      </div>

      {/* 3. Right Side: Visual Panel (58% width on Desktop) */}
      <div className="hidden lg:flex lg:w-[58%] bg-gradient-to-br from-[#071324] via-[#0b1d3a] to-[#08152b] text-white relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3355_1px,transparent_1px),linear-gradient(to_bottom,#1e3355_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-blue-500/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-sky-400/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-400/20 rounded-full pointer-events-none" />

        {/* Top Status */}
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
            <span>Authorized Analyst Onboarding</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-xl my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-400/30 text-sky-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>National Telemetry Integration</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight">
            Join the Central Weather{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Intelligence Grid
            </span>
          </h1>

          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Collaborate on verifying multi-source weather anomalies across Indian districts.
            Access high-velocity Doppler radar streams, citizen sensor feeds, and AI forensic analysis tools.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0e1f38]/80 border border-[#1b345b] backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inter-Agency Mesh</span>
              </div>
              <div className="text-base font-bold text-white">IMD • NDMA • CWC</div>
              <div className="text-[11px] text-emerald-400">Unified Emergency Alerts</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e1f38]/80 border border-[#1b345b] backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span>Data Storage</span>
              </div>
              <div className="text-base font-bold text-white">Supabase + Firebase</div>
              <div className="text-[11px] text-sky-300">Synchronized Profiles</div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
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
