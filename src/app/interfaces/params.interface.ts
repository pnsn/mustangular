import { AggregateValue, ColocatedType, DisplayValue } from "app/types";

//query params
export interface DisplayParams {
  coloring?: string;
  invert?: boolean;
  bincount?: number;
  binmin?: number;
  binmax?: number;
  displayValue?: DisplayValue;
  colocatedType?: ColocatedType;
  aggregateValue?: AggregateValue;
  channels?: string;
  absValue?: boolean;
}
