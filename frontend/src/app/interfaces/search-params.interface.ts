export interface SearchParams {
  search?: string;
  latLower?: string;
  latHigher?:string;
  lngHigher?:string;
  lngLower?:string;
  beforeThan?:string;
  afterThan?:string;
  lowPrice?: string;
  highPrice?: string;
  currency?: string;
}
