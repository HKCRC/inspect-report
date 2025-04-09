// overall information

import { useEffect, useState } from "react";
import { CHART_CATEGORY_CONFIG, COS_URL } from "../../constants";
import {
  FloorConfigKey,
  IAQSingleData,
  Mode,
  SENSOR_CHART_TYPE,
  TaskDetailResponseType,
} from "../../types";
import { getYearMonthDay, isAreaOrSpot } from "../../utils";
import { InspectAreaView } from "../inspect-area";

export default function DataTable2({
  data,
  module,
  idx = 0,
}: {
  data: TaskDetailResponseType;
  module: IAQSingleData;
  idx: number;
}) {
  const { task } = data;
  const [inspectItem, setInspectItem] = useState<string[] | undefined>(
    undefined
  );
  const getCurrentFloorImg = (module: IAQSingleData) => {
    const currentFloor = data.task.inspectImg[module.floor];
    const currentMode = isAreaOrSpot(module).mode;
    if (currentFloor?.length) {
      if (currentMode === Mode.global) {
        return currentFloor;
      }

      if (currentMode === Mode.area || currentMode === Mode.spot) {
        if (currentFloor.length)
          return currentFloor.filter(
            (item) => item[currentMode] === module[currentMode]
          );
      }
    }
    return [];
  };

  useEffect(() => {
    if (task?.inspectItem) {
      const inspectType = [];
      const iaq = CHART_CATEGORY_CONFIG[
        SENSOR_CHART_TYPE["IAQ Parameters"]
      ].filter((item) => module[item.key as keyof IAQSingleData]);
      if (iaq.length) {
        inspectType.push("IAQ");
      }

      CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Other Parameters"]]
        .concat(CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Physical Parameters"]])
        .map((item) => {
          if (module[item.key as keyof IAQSingleData]) {
            inspectType.push(item.measurementItems);
          }
        });
      setInspectItem(inspectType);
    }
  }, [module, task?.inspectItem]);

  return (
    <section className="min-h-screen bg-white" data-module="printableTable">
      <div className="max-w-[1200px] mx-auto py-8">
        <div className="py-10">
          <div
            id="printableTable"
            className="w-full min-w-[1035px] px-14 py-6 text-gray-800"
          >
            {idx === 0 ? (
              <div id="reprot_tile">
                <h1 className="text-4xl font-medium">
                  {task?.inspectArea?.join(", ")} - Parking Area <br />{" "}
                  Environment Repot
                </h1>

                <div className="my-10 bg-[#D8D8D8] h-1"></div>

                <table className="w-full border-collapse mb-20">
                  <thead>
                    <tr>
                      <th className="border border-[#666666] w-1/4 bg-[#D8D8D8] p-3  font-medium text-center">
                        Inspection Date
                      </th>
                      <th className="border border-[#666666] w-1/4 p-3 text-left font-thin">
                        {getYearMonthDay(task?.setDate)}
                      </th>
                      <th className="border border-[#666666] w-1/4 bg-[#D8D8D8] p-3  font-medium text-center">
                        Report Date
                      </th>
                      <th className="border border-[#666666] w-1/4 p-3 text-left font-thin">
                        {getYearMonthDay(data.createdAt)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                        Location
                      </th>
                      <th className="border border-[#666666] p-3 text-left font-thin">
                        {task?.inspectArea?.join(",")} Chaiwan Office Building
                      </th>
                      <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                        Inspector
                      </th>
                      <th className="border border-[#666666]  p-3 text-left font-thin">
                        {data.deviceId}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}

            <div className="flex flex-col mb-6">
              <span className="w-10 h-1 bg-[#0052D9] mb-2"></span>
              <h1 className="font-bold text-xl">
                {module.floor}F, {isAreaOrSpot(module).str} Overall Information
              </h1>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspection Point
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Inspection Mission Type
                  </th>
                  <th className="border border-[#666666] bg-[#D8D8D8] p-3  font-medium text-center">
                    Location of Inspection Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {inspectItem?.map((item, index) => (
                  <tr key={index}>
                    {index === 0 ? (
                      <td
                        rowSpan={inspectItem?.length}
                        className="border border-[#666666] p-6 text-center font-medium align-middle text-lg"
                      >
                        {isAreaOrSpot(module).str}
                      </td>
                    ) : null}
                    <td className="border border-[#666666] p-3 text-center">
                      {item}
                    </td>
                    {index === 0 ? (
                      <td
                        rowSpan={inspectItem?.length}
                        className="border h-[350px] border-[#666666] p-3 text-center"
                      >
                        <InspectAreaView
                          bgColor="bg-white"
                          currentShowAreaStoreForProps={[
                            {
                              floor: `${module.floor}F` as FloorConfigKey,
                              area: module.area,
                              spot: module.spot,
                            },
                          ]}
                        />
                      </td>
                    ) : null}
                  </tr>
                ))}

                <tr>
                  <td
                    colSpan={3}
                    className="border border-[#666666] bg-[#D8D8D8] p-3 text-center font-medium"
                  >
                    Field Photo
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="border border-[#666666] p-3">
                    <div className="flex gap-4">
                      {getCurrentFloorImg(module).length ? (
                        getCurrentFloorImg(module)?.map((item, idx) => (
                          <img
                            key={idx}
                            crossOrigin="anonymous"
                            src={`${COS_URL}/${item.imgUrl}?date=${Date.now()}`}
                            alt="Floor plan showing inspection point 2"
                            className="max-w-[300px]"
                            style={{
                              width: "300px",
                              height: "auto",
                            }}
                          />
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
