import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Database, Radio, Globe, Layers, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
            About the Initiative
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            Ministry of Earth Sciences (MoES) Weather Data Grid
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            The National Weather Big Data Analytics Platform (WeatherDataX) bridges conventional meteorological observation systems with real-time digital intelligence. By synthesizing multi-source data across India, the platform enables rapid hazard detection, citizen advisory validation, and emergency response.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                <Database className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Institutional Mandate
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm leading-relaxed">
                Operated under the aegis of the Ministry of Earth Sciences and India Meteorological Department (IMD) to provide authoritative, tamper-resistant, and high-frequency weather observations for public safety and research.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Verification Protocol
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm leading-relaxed">
                Crowdsourced reports and social media reports undergo algorithmic cross-validation with INSAT-3DR satellite imagery, Doppler radar velocity maps, and proximate automated weather stations before dissemination.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
