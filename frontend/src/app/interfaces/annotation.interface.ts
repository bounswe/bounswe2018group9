export interface Annotation {
  id?: string,
  type: string,
  body: [{
    type: string,
    value: string
  }],
  target: [{
    source: string,
    selector: {
      type: string,
      value: string,
      refinedBy?: {
        type: string,
        start: number,
        end: number
      }
    }
  }],
  creator? : string
}
