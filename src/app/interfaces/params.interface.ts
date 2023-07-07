import { AggregateValue, ColocatedType, DisplayValue } from "app/types";

//query params
export interface DisplayParams {
  coloring?: string; // name of coloring used
  invert?: boolean; // true if should invert colors
  bincount?: number; // number of bins
  binmin?: number; // binning minimum
  binmax?: number; // binning maximum
  displayValue?: DisplayValue; // type of value displayed
  colocatedType?: ColocatedType; // type of colocation
  aggregateValue?: AggregateValue; // type of value aggregation
  channels?: string; // channel codes displayed
  absValue?: boolean; // true if should use absolute value for calculations
}
