export interface SearchParams {
  search?: string;
  latLower?: string;
  latHigher?:string;
  longHigher?:string;
  longLower?:string;
  beforeThan?:string;
  afterThan?:string;
  lowPrice?: string;
  highPrice?: string;
  currency?: string;
}
