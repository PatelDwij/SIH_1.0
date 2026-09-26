"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map, Layers } from "lucide-react";

export default function MapViewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Geospatial Weather Map
          </h2>
          <p className="text-xs text-slate-500">
            Interactive multi-hazard radar layers, AWS station pins, and crowd-sourced heatmaps across India.
          </p>
        </div>
        <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 text-xs">
          39 Radars Connected
        </Badge>
      </div>

      <Card className="border-slate-200 bg-white p-8 text-center space-y-3">
        <Map className="w-10 h-10 text-blue-600 mx-auto" />
        <CardTitle className="text-lg font-bold text-slate-900">
          GIS Map Layer View
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 max-w-md mx-auto">
          Sub-kilometer precipitation overlays, cyclone tracking corridors, and heatwave contours.
        </CardDescription>
      </Card>
    </div>
  );
}
