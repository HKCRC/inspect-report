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
            unit: "Lux",
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