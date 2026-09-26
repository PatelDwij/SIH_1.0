"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Map as MapIcon,
  ShieldCheck,
  FileText,
  Settings,
  CloudRainWind,
  LogOut,
  User,
  Bell,
  Search,
  Calendar as CalendarIcon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Radio,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { auth, onAuthStateChanged, signOutUser, type User as FirebaseUser } from "@/lib/firebase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Sidebar states
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Topbar date picker state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 8, 25));
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  // Notification popover state
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // User menu popover
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Live Feed", href: "/dashboard/live-feed", icon: Activity, badge: "Live" },
    { label: "Map View", href: "/dashboard/map", icon: MapIcon },
    { label: "Verification Queue", href: "/dashboard/verification", icon: ShieldCheck, badge: "14" },
    { label: "Reports", href: "/dashboard/reports", icon: FileText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const notifications = [
    {
      id: 1,
      title: "Red Alert: Heavy Influx in Mumbai Suburban",
      time: "4 mins ago",
      type: "critical",
    },
    {
      id: 2,
      title: "AI Queue: 82 new crowdsourced entries verified",
      time: "12 mins ago",
      type: "info",
    },
    {
      id: 3,
      title: "INSAT-3DR: Satellite imagery scan updated",
      time: "28 mins ago",
      type: "system",
    },
  ];

  // Route Protection & Firebase Auth State
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUser(user);
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await signOutUser();
    router.push("/");
  };

  const userDisplayName = currentUser?.displayName || "Analyst - IMD Delhi";
  const userEmail = currentUser?.email || "analyst.weather@imd.gov.in";
  const userInitials = currentUser?.displayName
    ? currentUser.displayName
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#071324] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-white shadow-xl ring-1 ring-blue-400/30">
            <CloudRainWind className="w-6 h-6 text-sky-300 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
            <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
            <span>Verifying IMD Credentials...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 text-slate-900">
      {/* 1. Mobile Sidebar Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 2. Left Sidebar (Collapsible on Desktop, Off-canvas on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#071324] text-slate-200 border-r border-[#152744] transition-all duration-200 lg:static ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#152744] shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 text-white shrink-0 shadow-sm ring-1 ring-blue-500/30">
              <CloudRainWind className="w-5 h-5 text-sky-300" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-150">
                <span className="text-base font-bold text-white tracking-tight leading-tight truncate">
                  WeatherData<span className="text-sky-400">X</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight truncate">
                  IMD Analytics Console
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-[#112440] transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile sidebar"
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-[#112440]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Operational Status Tag */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-[#13233e] bg-[#0b1b33]/60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>National Grid Status</span>
              </span>
              <span className="font-semibold text-emerald-400">Optimal</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              1,480+ Ground Nodes Synced
            </p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "text-slate-300 hover:bg-[#112440] hover:text-white"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-sky-300"
                  }`}
                />
                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      item.badge === "Live"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-[#152744] bg-[#050e1a]">
          <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <PopoverTrigger asChild>
              <button
                className={`w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-[#112440] transition-colors ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <Avatar size="sm" className="ring-1 ring-blue-500/40">
                  <AvatarFallback className="bg-blue-700 text-white font-bold text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      {userDisplayName}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {userEmail}
                    </p>
                  </div>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="top"
              align="start"
              className="w-56 p-1.5 bg-white border border-slate-200 shadow-xl rounded-xl text-slate-800"
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{userDisplayName}</p>
                <p className="text-[11px] text-slate-500">{userEmail}</p>
                <Badge variant="outline" className="mt-1 text-[9.5px] text-emerald-700 bg-emerald-50 border-emerald-200">
                  CERT-In Level 3 Auth
                </Badge>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Analyst Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Sign Out / Lock Session</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </aside>

      {/* 3. Main Dashboard Body Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 shadow-2xs z-30">
          {/* Left: Mobile hamburger & Dynamic Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#0a192f] tracking-tight font-heading">
                Dashboard Overview
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                National Weather Big Data Analytics Console • IMD Central Grid
              </p>
            </div>
          </div>

          {/* Right: Search, Date Picker, Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-56 lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search report ID, city, or hazard..."
                className="pl-9 h-9 bg-slate-50 text-xs border-slate-200 focus-visible:ring-blue-600 rounded-lg"
              />
            </div>

            {/* Date Range Picker (Popover + Calendar) */}
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-medium px-2.5 sm:px-3"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">25 Sep 2026</span>
                  <span className="sm:hidden">Date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setDatePopoverOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Notification Bell with Badge */}
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 text-slate-600 hover:bg-slate-100 rounded-lg"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-80 p-0 bg-white border border-slate-200 shadow-xl rounded-xl"
              >
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Severe Hazard Alerts</span>
                    <Badge variant="destructive" className="text-[10px] h-4 px-1.5">
                      3 New
                    </Badge>
                  </div>
                  <span className="text-[10.5px] text-blue-600 hover:underline cursor-pointer">
                    Clear All
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer text-xs">
                      <div className="flex items-start gap-2">
                        {n.type === "critical" ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        ) : (
                          <Activity className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-slate-800 leading-snug">{n.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100 text-center bg-slate-50">
                  <Link
                    href="/dashboard/verification"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    View Verification Queue &rarr;
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Avatar mirrored in Topbar */}
            <div className="flex items-center pl-1">
              <Avatar size="sm" className="ring-1 ring-slate-200 cursor-pointer" onClick={() => setUserMenuOpen(true)}>
                <AvatarFallback className="bg-blue-700 text-white font-bold text-xs">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
