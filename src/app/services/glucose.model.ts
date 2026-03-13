export interface Glucose {
  id?: string;
  value: number;
  measurementType: string;
  note: string;
  measuredAt: Date;
  createdAt?: Date;
}

export interface GlucoseCreate {
  value: number;
  measurementType: string;
  note: string;
}

export interface GlucoseRespose {
  success: boolean;
  data?: Glucose;
}

export enum MeasurementType {
  FASTING = 'Em jejum',
  BEFORE_MEAL = 'Antes da Refeição',
  AFTER_MEAL = 'Depois da Refeição',
  BEFORE_SLEEP = 'Antes de Dormir'
}