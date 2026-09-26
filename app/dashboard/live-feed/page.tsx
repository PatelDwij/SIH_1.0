"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, Radio, AlertTriangle } from "lucide-react";

export default function LiveFeedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Live Telemetry Feed
          </h2>
          <p className="text-xs text-slate-500">
            Real-time streaming ingestion from Twitter/X, IMD AWS sensors, and Citizen mobile reports.
          </p>
        </div>
        <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
          Stream Active
        </Badge>
      </div>

      <Card className="border-slate-200 bg-white p-8 text-center space-y-3">
        <Activity className="w-10 h-10 text-blue-600 mx-auto" />
        <CardTitle className="text-lg font-bold text-slate-900">
          High-Velocity Live Feed Stream
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 max-w-md mx-auto">
          Ingesting social media dispatches, radar scans, and citizen photos with sub-second websocket delivery.
        </CardDescription>
      </Card>
    </div>
  );
}
