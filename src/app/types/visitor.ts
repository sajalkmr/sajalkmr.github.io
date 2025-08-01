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

// Enhanced type definitions for strict mode compliance
export interface StrictVisitorData {
  id: string;
  country: string;
  city: string;
  timestamp: Date;
  coordinates: [number, number];
}

export interface StrictProjectData {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image: string;
}

// Component prop types for strict typing
export interface VisitorMapProps {
  isDarkMode: boolean;
}

export interface VisitorLogProps {
  isDarkMode: boolean;
  onVisitorCountChange?: (count: number) => void;
}

export interface VisitorCounterProps {
  isDarkMode: boolean;
  initialCount?: number;
}

export interface ClientMapProps {
  locations: VisitorLocation[];
  currentVisitorLocation?: VisitorLocation;
  isDarkMode: boolean;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}
