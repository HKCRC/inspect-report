import { Floor_Config } from "../constants";

export enum Mode {
    global = "global",
    spot = "spot",
    area = "area"
  }

  export enum SENSOR_LEVEL {
    "Excellent" = "Excellent",
    "Good" = "Good",
    "Surpass" = "Surpass",
    "Invalid" ="Invalid"
}

export enum SENSOR_CHART_TYPE {
  "Physical Parameters" = "Physical Parameters",
  "IAQ Parameters" = "IAQ Parameters",
  "Other Parameters" = "Other Parameters"
}


export type FloorConfigKey = keyof typeof Floor_Config;
