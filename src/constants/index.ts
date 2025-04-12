import { Mode, SENSOR_CHART_TYPE, SENSOR_LEVEL } from "../types";


import floor1F from "../assets/laywer_data/1F/floor_1F.png";
import floor2F from "../assets/laywer_data/2F/floor_2F.png";
import floor3F from "../assets/laywer_data/3F/floor_3F.png";
import floor3FM from "../assets/laywer_data/3FM/floor_3FM.png";
import floor4F from "../assets/laywer_data/4F/floor_4F.png";
import floor5F from "../assets/laywer_data/5F/floor_5F.png";
import floor6F from "../assets/laywer_data/6F/floor_6F.png";
import floor7F from "../assets/laywer_data/7F/floor_7F.png";
import floor8F from "../assets/laywer_data/8F/floor_8F.png";

import Point1 from "../assets/area/point1.png";
import Point2 from "../assets/area/point2.png";
import Point3 from "../assets/area/point3.png";


import floor1FMask from "../assets/laywer_data/1F/1F coverall.png";
import floor2FMask from "../assets/laywer_data/2F/2F coverall.png";
import floor3FMask from "../assets/laywer_data/3F/3F coverall.png";
import floor3FMMask from "../assets/laywer_data/3FM/3FM coverall.png";
import floor4FMask from "../assets/laywer_data/4F/4F coverall.png";
import floor5FMask from "../assets/laywer_data/5F/5F coverall.png";
import floor6FMask from "../assets/laywer_data/6F/6F coverall.png";
import floor7FMask from "../assets/laywer_data/7F/7F coverall.png";
import floor8FMask from "../assets/laywer_data/8F/8F coverall.png";


import floor1Area1 from "../assets/laywer_data/1F/1F cover1.png";
import floor1Area2 from "../assets/laywer_data/1F/1F cover2.png";
import floor1Area3 from "../assets/laywer_data/1F/1F cover3.png";
import floor1Area4 from "../assets/laywer_data/1F/1F cover4.png";

import floor2Area1 from "../assets/laywer_data/2F/2F cover1.png";
import floor2Area2 from "../assets/laywer_data/2F/2F cover2.png";
import floor2Area3 from "../assets/laywer_data/2F/2F cover3.png";
import floor2Area4 from "../assets/laywer_data/2F/2F cover4.png";

import floor3Area1 from "../assets/laywer_data/3F/3F cover1.png";
import floor3Area2 from "../assets/laywer_data/3F/3F cover2.png";
import floor3Area3 from "../assets/laywer_data/3F/3F cover3.png";
import floor3Area4 from "../assets/laywer_data/3F/3F cover4.png";

import floor35Area1 from "../assets/laywer_data/3FM/3FM cover1.png";
import floor35Area2 from "../assets/laywer_data/3FM/3FM cover2.png";


import floor4Area1 from "../assets/laywer_data/4F/4F cover1.png";
import floor4Area2 from "../assets/laywer_data/4F/4F cover2.png";
import floor4Area3 from "../assets/laywer_data/4F/4F cover3.png";
import floor4Area4 from "../assets/laywer_data/4F/4F cover4.png";

import floor5Area1 from "../assets/laywer_data/5F/5F cover1.png";
import floor5Area2 from "../assets/laywer_data/5F/5F cover2.png";
import floor5Area3 from "../assets/laywer_data/5F/5F cover3.png";
import floor5Area4 from "../assets/laywer_data/5F/5F cover4.png";

import floor6Area1 from "../assets/laywer_data/6F/6F cover1.png";
import floor6Area2 from "../assets/laywer_data/6F/6F cover2.png";
import floor6Area3 from "../assets/laywer_data/6F/6F cover3.png";
import floor6Area4 from "../assets/laywer_data/6F/6F cover4.png";

import floor7Area1 from "../assets/laywer_data/7F/7F cover1.png";
import floor7Area2 from "../assets/laywer_data/7F/7F cover2.png";
import floor7Area3 from "../assets/laywer_data/7F/7F cover3.png";
import floor7Area4 from "../assets/laywer_data/7F/7F cover4.png";

import floor8Area1 from "../assets/laywer_data/8F/8F cover1.png";
import floor8Area2 from "../assets/laywer_data/8F/8F cover2.png";
import floor8Area3 from "../assets/laywer_data/8F/8F cover3.png";






export const API_URL = "http://129.226.138.87:7002"

export const CHART_CATEGORY_CONFIG = {
    [SENSOR_CHART_TYPE["Physical Parameters"]]: [
        {
            name: "Temperatre",
            unit: "°C",
            key: "temperature",
            measurementItems: "Temperature",
            standard: {
                Excellent: {
                    start: 20,
                    end: 23,
                },
                Good: {
                    start: 19,
                    end: 20,
                }
            },
        },
        {
            name: "Humidity",   
            unit: "%",
            key: "humidity",
            measurementItems: "R.Humidity",
            standard: {
                Excellent: {
                    start: 40,
                    end: 60,
                },
                Good: {
                    start: 30,
                    end: 40,
                }
            },
        },
        {
            name: "Air Flow",
            unit: "m³/s",
            key: "airflow",
            measurementItems: "Air Flow",
            standard: {
                Excellent: {
                    start: 0.05,
                    end: 0.1,
                },
                Good: {
                    start: 0.1,
                    end: 0.15,
                }
            },
        }
    ],
    [SENSOR_CHART_TYPE["IAQ Parameters"]]: [
        {
            name: "CO2",
            unit: "mg/m³",
            key: "co2",
            measurementItems: "Carbon Dioxide (mg/m3)",
            standard: {
                Excellent: {
                    start: 0,
                    end: 1440,
                },
                Good: {
                    start: 1440,
                    end: 1800,
                }
            },
        },
        {
            name: "CO",
            unit: "μg/m³",
            key: "co",
            measurementItems: "Carbon Monoxide (μg/m3)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 2000,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 2000,
                    end: 7000,
                }
            },
        },
        {
            name: "PM2.5",
            unit: "μg/m³",
            key: "pm2_5",
            measurementItems: "PM2.5 (μg/m3)",
            standard: undefined
        },
        {
            name: "PM10",
            unit: "μg/m³",
            key: "pm10",
            measurementItems: "Respirable Suspended Particulates PM10 (μg/m³)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 20,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 20,
                    end: 100,
                }
            },
        },
        {
            name: "NO2",
            unit: "μg/m³",
            key: "no2",
            measurementItems: "Nitrogen Dioxide (ppbv)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 40,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 40,
                    end: 150,
                }
            },
        },
        {
            name: "O3",
            unit: "μg/m³",
            key: "o3",
            measurementItems: "Ozone (ppbv)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 50,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 50,
                    end: 120,
                }
            },
        },
        {
            name: "HCHO",
            unit: "μg/m³",
            key: "hcho",
            measurementItems: "Formaldehyde (ppbv)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 30,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 30,
                    end: 100,
                }
            },
        },
        {
            name: "TVOC",
            unit: "μg/m³",
            key: "tvoc",
            measurementItems: "Total Volatile Organic Compounds (ppbv)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 200,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 200,
                    end: 600,
                }
            },
        },
        {
            name: "Rn",
            unit: "Bq/m³",
            key: "rn",
            measurementItems: "Radon (Bq/m³)",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 150,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 150,
                    end: 167,
                }
            },
        }
        
    ],
    [SENSOR_CHART_TYPE["Other Parameters"]]: [
          {
            name: "Lux Level",
            unit: "Avg",
            key: "lux",
            measurementItems: "Lux",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 300,
                    end: 500,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 200,
                    end: 300,
                },
            },
        },
        {
            name: "Noise Level",
            unit: "dB",
            key: "noise",
            measurementItems: "Noise",
            standard: {
                [SENSOR_LEVEL.Excellent]: {
                    start: 0,
                    end: 35,
                },
                [SENSOR_LEVEL.Good]: {
                    start: 35,
                    end: 45,
                },
            },
        }
    ]
}




export const Floor_Config = {
    '1F': {
        id: "1F",
        key: "FLOOR_1F",
        value: "1",
        type: Mode.global,
        imgUrl: floor1F,
        mask: floor1FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
             {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor1Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor1Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor1Area3,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: floor1Area4,
            },
        ],
        [Mode.spot]: [
            {
                id: "8F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: Point1,
            },
            {
                id: "8F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: Point2,  
            },
            {
                id: "8F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: Point3,
            }
        ]
    },
    '2F': {
        id: "2F",
        key: "FLOOR_2F",
        value: "2",
        type: Mode.global,
        imgUrl: floor2F,
        mask: floor2FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor2Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor2Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor2Area3,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: floor2Area4,
            },
       ],
       [Mode.spot]:[
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]  
    },
    '3F': {
        id: "3F",
        key: "FLOOR_3F",
        value: "3",
        type: Mode.global,
        imgUrl: floor3F,
        mask: floor3FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor3Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor3Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor3Area3,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: floor3Area4,
            },
       ],
       [Mode.spot]:[
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '3.5F': {
        id: "3.5F",
        key: "FLOOR_3.5F",
        value: "3.5",
        type: Mode.global,
        imgUrl: floor3FM,
        mask: floor3FMMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor35Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor35Area2,
            },

       ],
       [Mode.spot]:[
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '4F': {
        id: "4F",
        key: "FLOOR_4F",
        value: "4",
        type: Mode.global,
        imgUrl: floor4F,
        mask: floor4FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor4Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor4Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor4Area3,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: floor4Area4,
            },
       ],
       [Mode.spot]: [
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '5F': {
        id: "5F",
        key: "FLOOR_5F",
        value: "5",
        type: Mode.global,
        imgUrl: floor5F,
        mask: floor5FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor5Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor5Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor5Area3,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: floor5Area4,
            },
       ],
       [Mode.spot]: [
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '6F': {
        id: "6F",
        key: "FLOOR_6F",
        value: "6",
        type: Mode.global,
        imgUrl: floor6F,
        mask: floor6FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
               id: "Area_01",
               key: "areaA",
               type: Mode.area,
               value: "1",
               imgUrl: floor6Area1,
           },
            {
               id: "Area_02",
               key: "areaB",
               type: Mode.area,
               value: "2",
               imgUrl: floor6Area2,
           },
           {
               id: "Area_03",
               key: "areaC",
               type: Mode.area,
               value: "3",
               imgUrl: floor6Area3,
           },
            {
               id: "Area_04",
               key: "areaD",
               type: Mode.area,
               value: "4",
               imgUrl: floor6Area4,
           },
       ],
       [Mode.spot]: [
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '7F': {
        id: "7F",
        key: "FLOOR_7F",
        value: "7",
        type: Mode.global,
        imgUrl: floor7F,
        mask: floor7FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
               id: "Area_01",
               key: "areaA",
               type: Mode.area,
                value: "1",
               imgUrl: floor7Area1,
           },
            {
               id: "Area_02",
               key: "areaB",
               type: Mode.area,
               value: "2",
               imgUrl: floor7Area2,
           },
           {
               id: "Area_03",
               key: "areaC",
               type: Mode.area,
               value: "3",
               imgUrl: floor7Area3,
           },
            {
               id: "Area_04",
               key: "areaD",
               type: Mode.area,
               value: "4",
               imgUrl: floor7Area4,
           },
       ],
       [Mode.spot]: [
        {
            id: "8F",
            key: "spot1",
            type: Mode.spot,
            value: "1",
            imgUrl: Point1,
        },
        {
            id: "8F",
            key: "spot2",
            type: Mode.spot,
            value: "2",
            imgUrl: Point2,  
        },
        {
            id: "8F",
            key: "spot3",
            type: Mode.spot,
            value: "3",
            imgUrl: Point3,
        }
    ]
    },
    '8F': {
        id: "8F",
        key: "FLOOR_8F",
        value: "8",
        type: Mode.global,
        imgUrl: floor8F,
        mask: floor8FMask,
        map_virtual_height: 72,
        map_virtual_width: 86,
        offset: {
            left: 159,
            top: 87, 
            right: 123,
            bottom: 75,
        },
        [Mode.area]: [
            {
                id: "Area_01",
                key: "areaA",
                type: Mode.area,
                value: "1",
                imgUrl: floor8Area1,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: floor8Area2,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: floor8Area3,
            },
       ],
       [Mode.spot]: [
            {
                id: "8F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: Point1,
            },
            {
                id: "8F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: Point2,  
            },
            {
                id: "8F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: Point3,
            }
        ]
    },
}


export const COS_URL = "https://inspect-hkcrc-1330283638.cos.ap-hongkong.myqcloud.com"

export enum RADIX_COLOR_MAP {
    Orange = "#FF7F50",
    Blue = "#1E90FF",
    Pink = "#FF69B4",
    Ruby = "#E0115F",
    Jade = "#00A86B",
    Lime = "#32CD32",
    Purple = "#9370DB",
    Brown = "#A0522D",
    Crimson = "#DC143C",
    Cyan = "#00FFFF",
    Gold = "#FFD700",
    Gray = "#808080",
    Green = "#2E8B57",
    Indigo = "#4B0082",
    Plum = "#DDA0DD",
    Red = "#FF0000",
    Teal = "#008080",
    Tomato = "#FF6347",
    Violet = "#8A2BE2"
  }


export const Task_Building_Config = [
    {
        value: "Building Service",
        title: "Building Service",
        key: "0-0",
        id: "layer_L1", 
        color: RADIX_COLOR_MAP.Orange,
        children: [
            {
                value: "HVAC-Duct",
                title: "HVAC-Duct",
                key: "0-0-1",
                color: RADIX_COLOR_MAP.Cyan,
                id: "L1_1",
                mqttKey: "HVAC_Duct",
            },
            {
                value: "EL-Trunking",
                title: "EL-Trunking",

                key: "0-0-2",
                color: RADIX_COLOR_MAP.Green,
                id: "L1_2",
                mqttKey: "EL_Trunking",
            },
            {
                value: "FS-Pipe",
                title: "FS-Pipe",
                key: "0-0-3",
                color: RADIX_COLOR_MAP.Purple,
                id: "L1_3",
                mqttKey: "FS_Pipe",
            },
            {
                value: "DR-WP-Pipe",
                title: "DR-WP-Pipe",
                key: "0-0-4",
                id: "L1_4",
                color: RADIX_COLOR_MAP.Red,
                mqttKey: "DR_WP_Pipe",
            },
            {
                value: "EL-Lighting",
                title: "EL-Lighting",
                key: "0-0-5",
                color: RADIX_COLOR_MAP.Red,
                id: "L1_5",
                mqttKey: "EL_Lighting",
            }
        ],
    },
    {
        value: "Environment",
        title: "Environment",
        key: "0-1",
        id: "layer_L2", 
        children: [
            {
                value: "IAQ Inspection",
                title: "IAQ Inspection",
                key: "0-1-1",
                id: "layer_L2_1",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Blue,
                mqttKey: "IAQ_Inspection",
                children: [
                    {
                        id: "L2_1_1",
                        key: "0-1-1-1",
                        value: "CO2",
                        title: "CO2"
                    },
                    {
                        id: "L2_1_2",
                        key: "0-1-1-2",
                        value: "O3",
                        title: "O3"
                    },
                    {
                        id: "L2_1_3",
                        key: "0-1-1-3",
                        value: "PM 2.5",
                        title: "PM 2.5"
                    },
                    {
                        id: "L2_1_4",
                        key: "0-1-1-4",
                        value: "PM 10",
                        title: "PM 10"
                    },
                    {
                        id: "L2_1_5",
                        key: "0-1-1-5",
                        value: "CO",
                        title: "CO"
                    },
                    {
                        id: "L2_1_6",
                        key: "0-1-1-6",
                        value: "NO2",
                        title: "NO2"
                    },
                    {
                        id: "L2_1_7",
                        key: "0-1-1-7",
                        value: "HCHO",
                        title: "HCHO"
                    },
                    {
                        id: "L2_1_8",
                        key: "0-1-1-8",
                        value: "Rn",
                        title: "Rn"
                    }
                ]
            },
            {
                value: "Lux Level",
                title: "Lux Level",
                isShowParent: true,
                key: "0-1-2",
                id: "L2_2",
                color: RADIX_COLOR_MAP.Pink,
                mqttKey: "Lux_Level",
            },
            {
                value: "Noise Level",
                title: "Noise Level",
                isShowParent: true,
                key: "0-1-3",
                id: "L2_3",
                color: RADIX_COLOR_MAP.Ruby,
                mqttKey: "Noise_Level",
            },
            {
                value: "Temperature",
                title: "Temperature",
                isShowParent: true,
                key: "0-1-4",
                id: "L2_4",
                color: RADIX_COLOR_MAP.Jade,
                mqttKey: "Temperature",
            },
            {
                value: "R. Humidity",
                title: "R. Humidity",
                isShowParent: true,
                key: "0-1-5",
                id: "L2_5",

                color: RADIX_COLOR_MAP.Lime,
                mqttKey: "R_Humidity",
            },
            {
                value: "Air Flow",
                title: "Air Flow",
                isShowParent: true,
                key: "0-1-6",
                id: "L2_6",
                color: RADIX_COLOR_MAP.Purple,
                mqttKey: "Air_Flow",
            }
        ]
    },
]