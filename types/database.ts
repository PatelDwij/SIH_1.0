/**
 * Database Schema Definitions for WeatherDataX Platform
 * Aligned with Supabase PostgreSQL tables and Firebase Auth integration
 */

export type ReportSource = "twitter" | "citizen" | "aws" | "satellite" | string;
export type MediaType = "image" | "video";
export type VerificationStatus = "pending" | "verified" | "flagged";

export type WeatherEventType =
  | "rainfall"
  | "thunderstorm"
  | "flood"
  | "heatwave"
  | "fog"
  | "dust_storm"
  | "strong_wind"
  | string;

export type UserRole =
  | "analyst"
  | "senior_meteorologist"
  | "duty_officer"
  | "admin"
  | "citizen"
  | string;

/**
 * WeatherReport Table Interface
 */
export interface WeatherReport {
  id: string;
  created_at: string;
  event_type: WeatherEventType;
  location_city: string;
  location_state: string;
  latitude: number;
  longitude: number;
  description: string;
  source: ReportSource;
  media_url: string | null;
  media_type: MediaType | null;
  trust_score: number; // 0 to 100
  verification_status: VerificationStatus;
  reporter_id: string | null;
  verified_by: string | null;
  verified_at: string | null;
}

/**
 * Types for Inserting and Updating WeatherReport records
 */
export type WeatherReportInsert = Omit<WeatherReport, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type WeatherReportUpdate = Partial<Omit<WeatherReport, "id">>;

/**
 * UserProfile Table Interface
 */
export interface UserProfile {
  id: string; // Foreign key matching auth.users.id
  email: string;
  display_name: string;
  role: UserRole;
  department: string;
  station_id: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Types for Inserting and Updating UserProfile records
 */
export type UserProfileInsert = Omit<UserProfile, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type UserProfileUpdate = Partial<Omit<UserProfile, "id">>;

/**
 * Full Database definitions compatible with Supabase Client generic typing
 */
export interface Database {
  public: {
    Tables: {
      weather_reports: {
        Row: WeatherReport;
        Insert: WeatherReportInsert;
        Update: WeatherReportUpdate;
        Relationships: [];
      };
      user_profiles: {
        Row: UserProfile;
        Insert: UserProfileInsert;
        Update: UserProfileUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
