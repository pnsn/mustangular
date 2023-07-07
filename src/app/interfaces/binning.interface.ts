// describes color options for binnings
export interface ColorOption {
  name: string;
  title: string;
  colors: string[];
  outliers: string[];
  background?: string;
}

// Bin settings
export interface Binning {
  min: number;
  max: number;
  count: number;
}

// Data Settings
export interface Data {
  min: number;
  max: number;
  count: number;
}

// Channel options
export interface Channels {
  active: string[];
  available: string[];
}
