import { SENSOR_LEVEL } from "../types";

export function calculateHeightInChart(y: number, excellentRange: number[], goodRange: number[], title: string) {
    // 解析区间阈值
    const V_ex = excellentRange?.[1];
    const V_go = goodRange?.[1];
    
    let renderedValue = y; // 默认原值
    let currentRange;

    // 判断逻辑优先级：Excellent → Good → 超标
    if (typeof V_ex === 'number' && y <= V_ex) {
        // Excellent区间计算：H = (y/V_ex)*60
        renderedValue = (y / V_ex) * 60;
        currentRange = SENSOR_LEVEL.Excellent;
    } else if (typeof V_ex === 'number' && typeof V_go === 'number' && y <= V_go) {
        // Good区间计算：H = 60 + (y-V_ex)/(V_go-V_ex)*40
        renderedValue = 60 + ((y - V_ex) / (V_go - V_ex)) * 40;
        currentRange =  SENSOR_LEVEL.Good;
    } else  {
        // 超标区间计算：H = 100 + 20*(1 - e^-(y-V_go)/V_go) 且不超过120
        const exponent = -(y - V_go) / V_go;
        renderedValue = 100 + 20 * (1 - Math.exp(exponent));
        renderedValue = Math.min(renderedValue, 120); // 限制上限
        currentRange = SENSOR_LEVEL.Surpass;
    }

    return {
        renderedValue: Number(renderedValue.toFixed(2)), // 保留两位小数
        originalValue: y,
        range: currentRange ?? undefined  as SENSOR_LEVEL | undefined,
        title
    };
}