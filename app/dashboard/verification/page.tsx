"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            AI Verification Queue
          </h2>
          <p className="text-xs text-slate-500">
            Review and audit reports flagged for low confidence, duplicate clustering, or fake media.
          </p>
        </div>
        <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200 text-xs">
          14 Pending Items
        </Badge>
      </div>

      <Card className="border-slate-200 bg-white p-8 text-center space-y-3">
        <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
        <CardTitle className="text-lg font-bold text-slate-900">
          Analyst Review Queue
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 max-w-md mx-auto">
          Inspection interface for duty meteorologists to approve, reject, or elevate emergency warnings.
        </CardDescription>
      </Card>
    </div>
  );
}
