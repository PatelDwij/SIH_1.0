"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Sliders,
  Camera,
  Check,
  CheckCircle,
  AlertTriangle,
  Laptop,
  Smartphone,
  Globe,
  KeyRound,
  Lock,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Mail,
  Phone,
  Building,
  Award,
  Trash2,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function SettingsPage() {
  // Tab State
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("Dr. Rajesh V. Sharma");
  const [profileEmail, setProfileEmail] = useState("rajesh.sharma@imd.gov.in");
  const [profileDept, setProfileDept] = useState("National Weather Forecasting Centre (NWFC)");
  const [profileRole, setProfileRole] = useState("Senior Duty Meteorologist / Lead Forecaster");
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210");

  // Notifications State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [audioPings, setAudioPings] = useState(false);

  // Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Active Sessions
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: "sess-1",
      device: "Windows 11 Workstation",
      browser: "Chrome 128.0",
      ip: "103.21.144.62",
      location: "New Delhi, India",
      lastActive: "Active Now",
      isCurrent: true,
    },
    {
      id: "sess-2",
      device: "Apple iPad Pro (M4)",
      browser: "Safari 17.5",
      ip: "103.21.144.68",
      location: "IMD Operations Control Centre",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "sess-3",
      device: "Ubuntu 22.04 LTS Terminal",
      browser: "Firefox 130.0",
      ip: "192.168.56.10",
      location: "Mausam Bhawan Server Room",
      lastActive: "Yesterday",
      isCurrent: false,
    },
  ]);

  // System Preferences
  const [language, setLanguage] = useState("English (en-IN)");
  const [themePreference, setThemePreference] = useState<"light" | "dark" | "system">("light");
  const [defaultDashboardView, setDefaultDashboardView] = useState("Overview");
  const [telemetryRefreshRate, setTelemetryRefreshRate] = useState("10s");

  // Toast State
  const [toast, setToast] = useState<{ title: string; description: string } | null>(null);

  const showToast = (title: string, description: string) => {
    setToast({ title, description });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showToast("Profile Updated", "Analyst profile details saved to IMD directory.");
  };

  const handleSaveNotifications = () => {
    showToast("Notification Settings Saved", "Alert preferences updated successfully.");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast("Error", "Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Password Mismatch", "New password and confirmation do not match.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Password Changed", "Security credentials updated with strong hashing.");
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast("Session Terminated", "Remote login session revoked and token invalidated.");
  };

  const handleSavePreferences = () => {
    showToast("Preferences Applied", "System UI settings updated for current user.");
  };

  return (
    <div className="space-y-6 pb-12 font-sans relative max-w-5xl">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/90 pb-4 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
            Account & System Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your IMD meteorologist profile, notification channels, security policies, and workspace settings.
          </p>
        </div>

        <Badge variant="outline" className="text-emerald-800 bg-emerald-50 border-emerald-200 text-xs w-fit">
          <Shield className="w-3 h-3 mr-1 text-emerald-600" />
          Government Access: Cleared
        </Badge>
      </div>

      {/* 2. SETTINGS TABS (shadcn Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-200/80 p-1 rounded-xl w-full sm:w-fit flex flex-wrap">
          <TabsTrigger value="profile" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
            <Bell className="w-3.5 h-3.5" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>System Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* ================= TAB 1: PROFILE ================= */}
        <TabsContent value="profile" className="space-y-4 pt-1">
          <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 font-heading">
                  Analyst Profile & Credentials
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Government personnel directory identification and operational clearance.
                </CardDescription>
              </div>

              <Button
                size="sm"
                variant={isEditingProfile ? "default" : "outline"}
                onClick={() => {
                  if (isEditingProfile) {
                    handleSaveProfile();
                  } else {
                    setIsEditingProfile(true);
                  }
                }}
                className={`text-xs h-8 ${
                  isEditingProfile
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-slate-700 border-slate-200"
                }`}
              >
                {isEditingProfile ? (
                  <>
                    <Save className="w-3.5 h-3.5 mr-1" />
                    <span>Save Profile</span>
                  </>
                ) : (
                  <span>Edit Profile</span>
                )}
              </Button>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-2 border-blue-600/30">
                    <AvatarImage src="/avatar-officer.png" />
                    <AvatarFallback className="bg-blue-900 text-white font-bold text-lg font-heading">
                      RS
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => showToast("Avatar Upload", "Photo upload dialog simulated.")}
                    className="absolute bottom-0 right-0 p-1 bg-white text-slate-700 rounded-full border border-slate-300 shadow-xs hover:bg-slate-100"
                    title="Change Photo"
                  >
                    <Camera className="w-3 h-3 text-slate-600" />
                  </button>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{profileName}</h3>
                    <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-[10px]">
                      Gazetted Officer
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{profileRole}</p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Govt ID: IMD-DEL-40192 • Station: Mausam Bhawan, Lodhi Road
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    Full Official Name
                  </label>
                  {isEditingProfile ? (
                    <Input
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="text-xs h-9 bg-slate-50/60"
                    />
                  ) : (
                    <div className="h-9 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-800">
                      {profileName}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    Government Email Address
                  </label>
                  {isEditingProfile ? (
                    <Input
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="text-xs h-9 bg-slate-50/60"
                    />
                  ) : (
                    <div className="h-9 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-800">
                      {profileEmail}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    Department / Division
                  </label>
                  {isEditingProfile ? (
                    <Input
                      value={profileDept}
                      onChange={(e) => setProfileDept(e.target.value)}
                      className="text-xs h-9 bg-slate-50/60"
                    />
                  ) : (
                    <div className="h-9 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-800">
                      {profileDept}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    Operational Role
                  </label>
                  {isEditingProfile ? (
                    <Input
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      className="text-xs h-9 bg-slate-50/60"
                    />
                  ) : (
                    <div className="h-9 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-800">
                      {profileRole}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TAB 2: NOTIFICATIONS ================= */}
        <TabsContent value="notifications" className="space-y-4 pt-1">
          <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <CardTitle className="text-sm font-bold text-slate-900 font-heading">
                Weather Alerts & Dispatch Channels
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Configure automated emergency broadcast criteria and incident routing.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Toggle 1: Email Alerts */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-slate-800 block">
                    Email Bulletins & Severe Advisories
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Receive immediate email dispatches when convective storms cross Red Alert thresholds.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    emailAlerts ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      emailAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: SMS Alerts for Severe Events */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-slate-800 block">
                    SMS Flash Alerts for High-Hazard Events
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Direct SMS push to duty officer mobile device for flash floods and cyclones (&gt;65 km/h).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    smsAlerts ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      smsAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Daily Summary Digest */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-slate-800 block">
                    Daily 08:00 IST Morning Synoptic Digest
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Automated overview of all verified overnight citizen reports and radar precipitation maps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDailyDigest(!dailyDigest)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    dailyDigest ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      dailyDigest ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 4: In-App Audio Pings */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-slate-800 block">
                    In-App Audio Chime for Critical Submissions
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Play audio sound when new high-confidence reports arrive in the Verification Queue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAudioPings(!audioPings)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    audioPings ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      audioPings ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSaveNotifications}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-4 shadow-xs"
                >
                  Save Notification Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TAB 3: SECURITY ================= */}
        <TabsContent value="security" className="space-y-4 pt-1">
          {/* Change Password Card */}
          <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <CardTitle className="text-sm font-bold text-slate-900 font-heading">
                Authentication & Password Security
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Update account passwords and manage two-factor authentication (2FA).
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-5">
              {/* 2FA Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/80">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-950">
                      Two-Factor Authentication (2FA)
                    </span>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Requires a TOTP verification code from IMD Authenticator app on sign in.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    showToast(
                      twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
                      twoFactorEnabled ? "Two factor auth turned off." : "Authenticator app paired."
                    );
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    twoFactorEnabled ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Password Fields */}
              <form onSubmit={handleChangePassword} className="space-y-3.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">Current Password</label>
                    <div className="relative">
                      <Input
                        type={showCurrentPass ? "text" : "password"}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="text-xs h-9 pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">New Password</label>
                    <div className="relative">
                      <Input
                        type={showNewPass ? "text" : "password"}
                        placeholder="Minimum 10 chars"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="text-xs h-9 pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700">Confirm New Password</label>
                    <Input
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-xs h-9"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="text-xs h-9 text-slate-800 border-slate-300 font-semibold"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Active Sessions List Card */}
          <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <CardTitle className="text-sm font-bold text-slate-900 font-heading">
                Active Operational Sessions ({sessions.length})
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Devices authorized to inspect and verify meteorological data.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-2.5">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70 gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      {sess.device.includes("iPad") ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{sess.device}</span>
                        {sess.isCurrent && (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">
                            Current Session
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {sess.browser} • IP: {sess.ip} • {sess.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <span className="text-[11px] text-slate-400 font-mono">{sess.lastActive}</span>
                    {!sess.isCurrent && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRevokeSession(sess.id)}
                        className="h-7 text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= TAB 4: SYSTEM PREFERENCES ================= */}
        <TabsContent value="system" className="space-y-4 pt-1">
          <Card className="border-slate-200/90 bg-white shadow-2xs rounded-xl overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <CardTitle className="text-sm font-bold text-slate-900 font-heading">
                Workspace & Display Settings
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Personalize localization, telemetry sync frequency, and default landing views.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Language Selector */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    Interface Language (भाषा)
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="English (en-IN)">English (India)</option>
                    <option value="Hindi (hi-IN)">हिन्दी (Hindi)</option>
                    <option value="Marathi (mr-IN)">मराठी (Marathi)</option>
                    <option value="Bengali (bn-IN)">বাংলা (Bengali)</option>
                    <option value="Tamil (ta-IN)">தமிழ் (Tamil)</option>
                  </select>
                </div>

                {/* Default Dashboard View Selector */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-blue-600" />
                    Default Landing Dashboard
                  </label>
                  <select
                    value={defaultDashboardView}
                    onChange={(e) => setDefaultDashboardView(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Overview">Dashboard Overview</option>
                    <option value="Verification Queue">Verification Queue</option>
                    <option value="Map View">Geospatial Map View</option>
                    <option value="Live Feed">Live Telemetry Feed</option>
                  </select>
                </div>

                {/* Telemetry Polling Rate */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-600" />
                    Telemetry Polling Frequency
                  </label>
                  <select
                    value={telemetryRefreshRate}
                    onChange={(e) => setTelemetryRefreshRate(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="5s">Every 5 seconds (Real-time)</option>
                    <option value="10s">Every 10 seconds (Recommended)</option>
                    <option value="30s">Every 30 seconds</option>
                    <option value="60s">Every 60 seconds (Low Bandwidth)</option>
                  </select>
                </div>

                {/* Theme Selector */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-blue-600" />
                    Theme Mode (UI Display)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setThemePreference("light")}
                      className={`h-9 px-3 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        themePreference === "light"
                          ? "bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light Theme</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setThemePreference("dark")}
                      className={`h-9 px-3 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        themePreference === "dark"
                          ? "bg-slate-900 border-slate-900 text-white font-bold shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Dark Theme</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Button
                  onClick={handleSavePreferences}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-4 shadow-xs"
                >
                  Save System Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 flex items-start gap-3 max-w-sm animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 flex-1">
            <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
            <p className="text-[11px] text-slate-500 leading-normal">{toast.description}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
