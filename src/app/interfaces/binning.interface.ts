// describes color options for binnings
export interface ColorOption {
  name: string;
  title: string;
  colors: string[];
  outliers: string[];
}

export interface Binning {
  min: number;
  max: number;
  count: number;
}

export interface Data {
  min: number;
  max: number;
  count: number;
}
