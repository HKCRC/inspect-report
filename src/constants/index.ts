import { Mode, SENSOR_CHART_TYPE, SENSOR_LEVEL } from "../types";
import floorPng from "../assets/area/floor.png";
import cover1Png from "../assets/area/allcover.png";
import cover2Png from "../assets/area/cover1.png";
import cover3Png from "../assets/area/cover2.png";
import cover4Png from "../assets/area/cover3.png";
import cover5Png from "../assets/area/cover4.png";
import point1Png from "../assets/area/point1.png";
import point2Png from "../assets/area/point2.png";
import point3Png from "../assets/area/point3.png";

export const API_URL = "http://129.226.138.87:7002"

export const CHART_CATEGORY_CONFIG = {
    [SENSOR_CHART_TYPE["Physical Parameters"]]: [
        {
            name: "Temperatre",
            unit: "°C",
            key: "temperature",
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
            standard: undefined
        },
        {
            name: "PM10",
            unit: "μg/m³",
            key: "pm10",
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
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
        ],
        [Mode.spot]: [
            {
                id: "1F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "1F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,
            },
            {
                id: "1F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,
            },
        ]
    },
    '2F': {
        id: "2F",
        key: "FLOOR_2F",
        value: "2",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
       ],
       [Mode.spot]: [
            {
                id: "2F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "2F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,
            },
            {
                id: "2F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,
            },
        ]     
    },
    '3F': {
        id: "3F",
        key: "FLOOR_3F",
        value: "3",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
       ],
       [Mode.spot]: [
            {
                id: "3F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "3F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,
            },
            {
                id: "3F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,
            },
        ]
    },
    '4F': {
        id: "4F",
        key: "FLOOR_4F",
        value: "4",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
       ],
       [Mode.spot]: [
            {
                id: "4F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,      
            },
            {
                id: "4F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,  
            },
            {
                id: "4F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,  
            },
        ]
    },
    '5F': {
        id: "5F",
        key: "FLOOR_5F",
        value: "5",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
       ],
       [Mode.spot]: [
            {
                id: "5F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "5F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,
            },
            {
                id: "5F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,
            },
        ]
    },
    '6F': {
        id: "6F",
        key: "FLOOR_6F",
        value: "6",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
               imgUrl: cover2Png,
           },
            {
               id: "Area_02",
               key: "areaB",
               type: Mode.area,
               value: "2",
               imgUrl: cover3Png,
           },
           {
               id: "Area_03",
               key: "areaC",
               type: Mode.area,
               value: "3",
               imgUrl: cover4Png,
           },
            {
               id: "Area_04",
               key: "areaD",
               type: Mode.area,
               value: "4",
               imgUrl: cover5Png,
           },
       ],
       [Mode.spot]: [
            {
                id: "6F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "6F",
                key: "spot2",
                type: Mode.spot,
                value: "2", 
                imgUrl: point2Png,
            },
            {
                id: "6F",
                key: "spot3",
                type: Mode.spot,
                value: "3", 
                imgUrl: point3Png,
            }
        ]
    },
    '7F': {
        id: "7F",
        key: "FLOOR_7F",
        value: "7",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
               imgUrl: cover2Png,
           },
            {
               id: "Area_02",
               key: "areaB",
               type: Mode.area,
               value: "2",
               imgUrl: cover3Png,
           },
           {
               id: "Area_03",
               key: "areaC",
               type: Mode.area,
               value: "3",
               imgUrl: cover4Png,
           },
            {
               id: "Area_04",
               key: "areaD",
               type: Mode.area,
               value: "4",
               imgUrl: cover5Png,
           },
       ],
       [Mode.spot]: [
            {
                id: "7F",
                key: "spot1",
                type: Mode.spot,
                value: "1", 
                imgUrl: point1Png,
            },
            {
                id: "7F",
                key: "spot2",
                type: Mode.spot,
                value: "2", 
                imgUrl: point2Png,
            },
            {
                id: "7F",
                key: "spot3",
                type: Mode.spot,
                value: "3", 
                imgUrl: point3Png,
            }
        ]
    },
    '8F': {
        id: "8F",
        key: "FLOOR_8F",
        value: "8",
        type: Mode.global,
        imgUrl: floorPng,
        mask: cover1Png,
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
                imgUrl: cover2Png,
            },
             {
                id: "Area_02",
                key: "areaB",
                type: Mode.area,
                value: "2",
                imgUrl: cover3Png,
            },
            {
                id: "Area_03",
                key: "areaC",
                type: Mode.area,
                value: "3",
                imgUrl: cover4Png,
            },
             {
                id: "Area_04",
                key: "areaD",
                type: Mode.area,
                value: "4",
                imgUrl: cover5Png,
            },
       ],
       [Mode.spot]: [
            {
                id: "8F",
                key: "spot1",
                type: Mode.spot,
                value: "1",
                imgUrl: point1Png,
            },
            {
                id: "8F",
                key: "spot2",
                type: Mode.spot,
                value: "2",
                imgUrl: point2Png,  
            },
            {
                id: "8F",
                key: "spot3",
                type: Mode.spot,
                value: "3",
                imgUrl: point3Png,
            }
        ]
    },
}

export const COS_URL = "https://inspect-hkcrc-1330283638.cos.ap-hongkong.myqcloud.com"

export enum RADIX_COLOR_MAP {
    Orange = "orange",
    Blue = "blue",
    Pink = "pink",
    Ruby = "ruby",
    Jade = "jade",
    Lime = "lime",
    Purple = "purple",
    Brown = "brown",
    Crimson = "crimson",
    Cyan = "cyan",
    Gold = "gold",
    Gray = "gray",
    Green = "green",
    Indigo = "indigo",
    Plum = "plum",
    Red = "red",
    Teal = "teal",
    Tomato = "tomato",
    Violet = "violet"
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
                isShowParent: true,
                color: RADIX_COLOR_MAP.Cyan,
                id: "L1_1",
                mqttKey: "HVAC_Duct",
            },
            {
                value: "EL-Trunking",
                title: "EL-Trunking",
                isShowParent: true,
                key: "0-0-2",
                color: RADIX_COLOR_MAP.Green,
                id: "L1_2",
                mqttKey: "EL_Trunking",
            },
            {
                value: "FS-Pipe",
                title: "FS-Pipe",
                isShowParent: true,
                key: "0-0-3",
                color: RADIX_COLOR_MAP.Purple,
                id: "L1_3",
                mqttKey: "FS_Pipe",
            },
            {
                value: "DR-WP-Pipe",
                title: "DR-WP-Pipe",
                isShowParent: true,
                key: "0-0-4",
                id: "L1_4",
                color: RADIX_COLOR_MAP.Red,
                mqttKey: "DR_WP_Pipe",
            },
            {
                value: "EL-Lighting",
                title: "EL-Lighting",
                isShowParent: true,
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
                key: "0-1-2",
                id: "L2_2",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Pink,
                mqttKey: "Lux_Level",
            },
            {
                value: "Noise Level",
                title: "Noise Level",
                key: "0-1-3",
                id: "L2_3",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Ruby,
                mqttKey: "Noise_Level",
            },
            {
                value: "Temperature",
                title: "Temperature",
                key: "0-1-4",
                id: "L2_4",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Jade,
                mqttKey: "Temperature",
            },
            {
                value: "R. Humidity",
                title: "R. Humidity",
                key: "0-1-5",
                id: "L2_5",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Lime,
                mqttKey: "R_Humidity",
            },
            {
                value: "Air Flow",
                title: "Air Flow",
                key: "0-1-6",
                id: "L2_6",
                isShowParent: true,
                color: RADIX_COLOR_MAP.Purple,
                mqttKey: "Air_Flow",
            }
        ]
    },
]