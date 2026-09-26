"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            System Settings & Ingestion Configurations
          </h2>
          <p className="text-xs text-slate-500">
            Configure Kafka streaming thresholds, AI confidence cutoffs, and alert webhooks.
          </p>
        </div>
        <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
          TLS 1.3 Active
        </Badge>
      </div>

      <Card className="border-slate-200 bg-white p-8 text-center space-y-3">
        <Settings className="w-10 h-10 text-slate-600 mx-auto" />
        <CardTitle className="text-lg font-bold text-slate-900">
          Platform Administration
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 max-w-md mx-auto">
          Manage API keys, automated thresholds, telemetry frequencies, and user permissions.
        </CardDescription>
      </Card>
    </div>
  );
}
