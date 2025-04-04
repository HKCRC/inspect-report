import { inspectItemOriginNode, SENSOR_LEVEL } from "../types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

export function calculateHeightInChart(y: number, excellentRange: number[], goodRange: number[], title: string, isShowUnStandard = false) {
    // 解析区间阈值
    const V_ex = excellentRange?.[1];
    const V_ex_start = excellentRange?.[0];
    const V_go = goodRange?.[1];
    const V_go_start = goodRange?.[0];
    
    let renderedValue = y; // 默认原值
    let currentRange;

    // 判断逻辑优先级：Excellent → Good → 超标
    if (typeof V_ex === 'number' && y <= V_ex && y >= V_ex_start) {
        // Excellent区间计算：H = (y/V_ex)*60
        if (isShowUnStandard) {
            renderedValue = 30 + ((y / (V_ex)) * 30);
        } else {
            renderedValue = (y / V_ex) * 60;
        }
        currentRange = SENSOR_LEVEL.Excellent;
    } else if (typeof V_ex === 'number' && typeof V_go === 'number' && y <= V_go && y >= V_go_start) {
        // Good区间计算：H = 60 + (y-V_ex)/(V_go-V_ex)*40
        const getVal = Math.min(((y - V_ex) / (V_go - V_ex)), (y - V_ex_start) / (V_go_start - V_ex_start))
        renderedValue = 60 + getVal * 40;
        // console.error(renderedValue, 'renderedValue', y , 'y')
        currentRange =  SENSOR_LEVEL.Good;
    } else if (typeof V_go === 'number' && y < V_go_start) {
        // 超标区间计算：H = (y/V_ex)*30
        renderedValue = (y / V_go_start) * 30;
        currentRange = SENSOR_LEVEL.Exceeding;
    } else  {
        // 超标区间计算：H = 100 + 20*(1 - e^-(y-V_go)/V_go) 且不超过120
        const exponent = -(y - V_go) / V_go;
        renderedValue = 100 + 20 * (1 - Math.exp(exponent));
        renderedValue = Math.min(renderedValue, 120); // 限制上限
        currentRange = SENSOR_LEVEL.Exceeding;
    }

    return {
        renderedValue: Number(renderedValue.toFixed(2)), // 保留两位小数
        originalValue: y,
        range: currentRange ?? undefined  as SENSOR_LEVEL | undefined,
        title
    };
}


/**
 * 过滤出包含 isShowParent 标记的完整配置对象
 * @param {string[]} backendIds 后台返回的ID数组
 * @param {Array} config 系统配置数据
 * @returns {Object[]} 符合条件的完整配置对象数组
 */
export function getFilteredParentObjects(backendIds: string[], config: inspectItemOriginNode[]) {
    // 创建快速查找的ID映射
    const idNodeMap = new Map();
    
    // 递归构建映射（遇到 isShowParent 停止深入）
    const buildMap = (nodes: inspectItemOriginNode[]) => {
        nodes.forEach(node => {
            idNodeMap.set(node.id, node);
            if (node.children && !node.isShowParent) {
                buildMap(node.children);
            }
        });
    };
  
    buildMap(config); // 初始化映射
  
    // 过滤并返回完整对象
    return backendIds
        .map(id => idNodeMap.get(id))                // 获取完整对象
        .filter(node => node?.isShowParent);         // 验证标记存在
  }
  