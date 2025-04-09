import React, { useEffect, useState } from "react";
import {
  EnvironmentalDataTableType,
  IAQDataTableType,
  IAQSingleData,
  SENSOR_CHART_TYPE,
  TaskDetailResponseType,
} from "../../types";
import { calculateHeightInChart, isAreaOrSpot } from "../../utils";
import { CHART_CATEGORY_CONFIG } from "../../constants";

type DataTableProps = {
  data: TaskDetailResponseType;
  module: IAQSingleData;
  idx: number;
};

const DataTable = ({ module }: DataTableProps) => {
  const [iaqData, setIaqData] = useState<IAQDataTableType[]>([]);
  const [environmentalData, setEnvironmentalData] = useState<
    EnvironmentalDataTableType[]
  >([]);

  const collectIAQData = () => {
    const data: IAQDataTableType[] = [];
    CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["IAQ Parameters"]].map((item) => {
      if (module[item.key as keyof IAQSingleData] && item.standard) {
        const currentItem = module[item.key as keyof IAQSingleData];
        const { range } = calculateHeightInChart(
          Number(currentItem),
          [item.standard.Excellent.start, item.standard.Excellent.end],
          [item.standard.Good.start, item.standard.Good.end],
          ""
        );
        data.push({
          measurement: item.measurementItems,
          excellentClass: item?.standard.Excellent.end.toString(),
          goodClass: item.standard.Good.end.toString(),
          parameter: currentItem.toString(),
          qualified: range,
        });
      }
    });
    setIaqData(data);
  };

  const collectEnvironmentalData = () => {
    const data: EnvironmentalDataTableType[] = [];
    CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Other Parameters"]]
      .concat(CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Physical Parameters"]])
      .map((item) => {
        if (module[item.key as keyof IAQSingleData] && item.standard) {
          const currentItem = module[item.key as keyof IAQSingleData];
          const { range } = calculateHeightInChart(
            Number(currentItem),
            [item.standard.Excellent.start, item.standard.Excellent.end],
            [item.standard.Good.start, item.standard.Good.end],
            ""
          );
          data.push({
            mission: item.measurementItems,
            excellentClass: `${item.standard.Excellent.start} ≤ ${item.unit} ≤ ${item.standard.Excellent.end}`,
            goodClass: `${item.standard.Good.start} ≤ ${item.unit} < ${item.standard.Good.end} or ${item.standard.Good.end} < ${item.unit} ≤ ${item.standard.Excellent.end}`,
            parameter: currentItem.toString(),
            qualified: range,
          });
        }
      });
    setEnvironmentalData(data);
  };

  useEffect(() => {
    collectIAQData();
    collectEnvironmentalData();
  }, [module]);

  return (
    <section className="min-h-screen bg-white" data-module="printableTable">
      <div className="max-w-[1200px] mx-auto py-8">
        <div>
          <div
            id="printableTable"
            className="w-full min-w-[1035px] px-14 py-6 text-gray-800"
          >
            <div className="flex flex-col mb-6">
              <span className="w-10 h-1 bg-[#0052D9] mb-2"></span>
              <h1 className="font-medium text-2xl">Section Detail</h1>
            </div>

            <div className="mt-8 mb-20">
              <h2 className="text-left font-medium text-lg mb-4">
                {module.floor}F, {isAreaOrSpot(module).str}
              </h2>

              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Inspect Mission
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Measurement Items
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Excellent Class
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Good Class
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Parameter
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Qualified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {iaqData.map((item, index) => (
                    <React.Fragment key={index}>
                      {index === 0 && (
                        <tr>
                          <td
                            rowSpan={11}
                            className="border border-[#666666] p-3 text-center text-xl lign-middle"
                          >
                            IAQ
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.measurement}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.excellentClass}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.goodClass}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.parameter}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.qualified}
                          </td>
                        </tr>
                      )}
                      {index > 0 && (
                        <tr>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.measurement}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.excellentClass}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.goodClass}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.parameter}
                          </td>
                          <td className="border border-[#666666] p-3 text-center">
                            {item.qualified}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-12">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Inspect Mission
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Excellent Class
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Good Class
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Parameter
                    </th>
                    <th className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium">
                      Qualified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {environmentalData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-[#666666] p-3 text-center font-medium">
                        {item.mission}
                      </td>
                      <td className="border border-[#666666] p-3 text-center">
                        {item.excellentClass}
                      </td>
                      <td className="border border-[#666666] p-3 text-center">
                        {item.goodClass}
                      </td>
                      <td className="border border-[#666666] p-3 text-center">
                        {item.parameter}
                      </td>
                      <td className="border border-[#666666] p-3 text-center">
                        {item.qualified}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
