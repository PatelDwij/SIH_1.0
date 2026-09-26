"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Meteorological Reports & Dispatches
          </h2>
          <p className="text-xs text-slate-500">
            Export automated daily summaries, hazard dossiers, and multi-agency briefings.
          </p>
        </div>
        <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 text-xs">
          Daily Dossier Ready
        </Badge>
      </div>

      <Card className="border-slate-200 bg-white p-8 text-center space-y-3">
        <FileText className="w-10 h-10 text-blue-600 mx-auto" />
        <CardTitle className="text-lg font-bold text-slate-900">
          Generated Weather Bulletins
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 max-w-md mx-auto">
          Automated PDF and data export for NDMA, state disaster cells, and media releases.
        </CardDescription>
      </Card>
    </div>
  );
}
