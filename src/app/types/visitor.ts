export interface VisitorLocation {
  country: string;
  city?: string;
  lat: number;
  lon: number;
  count: number;
}

export interface VisitorInfo {
  ip: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  os: string;
  browser: string;
  timestamp: number;
}
