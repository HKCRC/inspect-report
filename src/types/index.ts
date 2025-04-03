import { Floor_Config } from "../constants";

export enum Mode {
    global = "global",
    spot = "spot",
    area = "area"
  }

  export enum SENSOR_LEVEL {
    "Excellent" = "Excellent",
    "Good" = "Good",
    "Exceeding" = "Exceeding",
    "Invalid" ="Invalid",
}

export enum SENSOR_CHART_TYPE {
  "Physical Parameters" = "Physical Parameters",
  "IAQ Parameters" = "IAQ Parameters",
  "Other Parameters" = "Other Parameters"
}


export interface TaskType {
  id: number
  taskId: string
  created: string
  inspectItem: string[]
  taskTitle: string
  status: number
  inspectArea: string[]
  mode: string
  userDefineArea: number[][],
  deviceId: string
  setDate: string
  setTime: string
  informPerson: unknown[]
  enable: boolean
  createdAt: string
  Collection: unknown[]
}

export type FloorConfigKey = keyof typeof Floor_Config;


export type inspectItemOriginNode = {
  id: string;
  key: string;
  title: string;
  value: string;
  isShowParent?: boolean,
  color?: string
  children?: inspectItemOriginNode[]; // 直接递归引用自身类型
};


export interface TaskDetailResponseType {
  id: number;
  taskId: string;
  data: string;
  createdAt: string;
  deviceId: string;
  reportUrl: string;
  buildingStructureId: string;
  status: number;
  task: Task;
}

export interface Task {
  id: number;
  taskId: string;
  created: string;
  inspectItem: string[];
  taskTitle: string;
  status: number;
  inspectArea: string[];
  mode: string;
  userDefineArea: number[][];
  deviceId: string;
  setDate: string;
  setTime: string;
  informPerson: string[]
  enable: boolean;
  isSendEmail: boolean;
  createdAt: string;
  inspectImg: InspectImg;
}

export type InspectImg = {
  [key: string]: SensorResultImgType[];
}

export interface SensorResultImgType {
  id: number;
  taskId: string;
  imgUrl: string;
  inspectType: number;
  floor: number;
  area: number;
  spot: number;
  createdAt: string;
}

export interface BsSingleData {
  floor: number;
  spot: number;
  area: number;
  detectionArea: number;
  buildNumber: number;
  buildQualifiedNumber: number;
  buildUnqualifiedNumber: number;
  buildQualifiedRate: number;
}

export interface IAQSingleData {
  floor: number;
  area: number;
  spot: number;
  taskId: string;
  temperature: number;
  humidity: number;
  airflow: number;
  co2: number;
  co: number;
  o3: number;
  tvoc: number;
  pm2_5: number;
  pm10: number;
  no2: number;
  hcho: number;
  rn: number;
  lux: number;
  noise: number;
}




export interface AfterCalculatedData {
  renderedValue: number;
  originalValue: number;
  range: SENSOR_LEVEL | undefined;
  title: string;
}
