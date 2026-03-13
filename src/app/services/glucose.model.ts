export interface Glucose {
  id: string;
  value: number;
  measurementType: string;
  note: string;
  measuredAt: Date;
  createdAt: Date;
}

export interface GlucoseCreate {
  value: number;
  measurementType: string;
  note: string;
}

export interface GlucoseRespose {
  success: boolean;
  data: Glucose;
}
