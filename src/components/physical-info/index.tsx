import { useEffect, useState } from "react";
import { CHART_CATEGORY_CONFIG } from "../../constants";
import {
  AfterCalculatedData,
  IAQSingleData,
  SENSOR_CHART_TYPE,
  SENSOR_LEVEL,
} from "../../types";
import { calculateHeightInChart, cn } from "../../utils";

interface PhysicalInfoProps {
  data: IAQSingleData;
}

const levelMap = {
  [SENSOR_LEVEL.Excellent]: "#7DB1FF",
  [SENSOR_LEVEL.Good]: "#FFB362",
  [SENSOR_LEVEL.Exceeding]: "#FC9090",
};

interface EnhancedAfterCalculatedData extends AfterCalculatedData {
  // 新增属性
  unit: string; // 或其他类型
}

export default function PhysicalInfo({ data }: PhysicalInfoProps) {
  const [physicalData, setPhysicalData] = useState<
    EnhancedAfterCalculatedData[]
  >([]);

  const originData = [
    ...CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Other Parameters"]],
    ...CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Physical Parameters"]],
  ];

  useEffect(() => {
    const allResult: EnhancedAfterCalculatedData[] = [];
    originData.forEach((configItem) => {
      if (
        configItem.key in data &&
        data[configItem.key as keyof typeof data] !== undefined &&
        configItem.standard !== undefined
      ) {
        const parameterData = data[configItem.key as keyof typeof data];

        const result = calculateHeightInChart(
          Number(parameterData),
          [
            configItem.standard.Excellent.start,
            configItem.standard.Excellent.end,
          ],
          [configItem.standard.Good.start, configItem.standard.Good.end],
          configItem.name
        );

        allResult.push({
          renderedValue: result.renderedValue,
          originalValue: result.originalValue,
          range: result.range,
          title: configItem.name,
          unit: configItem.unit,
        });
      }
    });
    setPhysicalData(allResult);
  }, [data]);

  return (
    <div>
      <div className="container flex flex-row justify-between gap-4 px-8">
        <div className="flex flex-col mr-16">
          <p className="text-lg font-bold">
            Other Physical <br />
            Parameters
          </p>
          <span className="w-20 h-1.5 mt-1 bg-[#0052D9] "></span>

          <div className="flex flex-col gap-2 mt-8">
            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#0052D9]"></span>
              <p className="text-xs font-normal ml-1">Excellent Class</p>
            </div>

            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#FFB362]"></span>
              <p className="text-xs font-normal ml-1">Good Class</p>
            </div>

            <div className="flex flex-row items-center">
              <span className="w-2.5 h-2.5 bg-[#FC9090]"></span>
              <p className="text-xs font-normal ml-1">Exceeding Class</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 flex-1 sm:group-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5">
          {physicalData.map((item) => (
            <div className="flex flex-col border-1 border-[#000000] rounded-xl p-4 ">
              <p className="text-md font-blob">{item.title}</p>

              <div className="flex flex-row justify-center my-5 items-center">
                <span
                  style={{
                    color: levelMap[item.range as keyof typeof levelMap],
                  }}
                  className={cn(`text-[44px] font-bold`)}
                >
                  {item.originalValue}
                  <i className="text-sm not-italic text-[#000000] font-normal ml-1">
                    ({item.unit})
                  </i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
