"use client";

import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-3 text-center sm:text-left">
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
            Official Directory & Support
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-heading">
            Contact MoES & IMD Weather Analytics Cell
          </h1>
          <p className="text-slate-600 text-base max-w-2xl leading-relaxed">
            Get in touch with the National Weather Big Data Analytics Platform team for API integration, research data requests, and technical operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-slate-200 bg-white p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Send Official Communication
                </CardTitle>
                <CardDescription className="text-slate-500 text-xs">
                  Inquiries regarding data sharing (NDSAP), API access, or citizen reporting grievance.
                </CardDescription>
              </CardHeader>
              <form className="space-y-4 pt-2" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <Input placeholder="Dr. Rajesh Sharma" className="bg-slate-50/50 border-slate-300 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <Input type="email" placeholder="rajesh@nic.in" className="bg-slate-50/50 border-slate-300 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Organization / Department</label>
                  <Input placeholder="State Disaster Management Authority / University / Citizen" className="bg-slate-50/50 border-slate-300 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Message / Query</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details regarding your meteorological data query or integration request..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <Button className="bg-[#0a192f] hover:bg-[#162f55] text-white gap-2">
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Transmit Query</span>
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200 bg-white">
              <CardHeader className="space-y-3">
                <CardTitle className="text-base font-bold text-slate-900">
                  Headquarters
                </CardTitle>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Ministry of Earth Sciences, Prithvi Bhavan, Lodhi Road, New Delhi - 110003</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Toll-Free Helpline:</strong>
                      <span className="text-blue-700 font-semibold">1800-180-1717</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Desk Email:</strong>
                      <span className="text-blue-700">weatherdatax@imd.gov.in</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>24x7 Operations & Critical Alert Monitoring</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
