import { useEffect, useState } from "react";
import BsInfoModule from "../../bs-info-module";
import BsReportHeader from "../../bs-report-header";
import { ScrollableTabs } from "../../scroll-tab";
import { API_URL } from "../../../constants";
import { message } from "antd";
import { BsSingleData, TaskDetailResponseType } from "../../../types";

interface BSReportProps {
  taskId: string;
}

export default function BSReport({ taskId }: BSReportProps) {
  const [currentFloor, setCurrentFloor] = useState<string | undefined>(
    undefined
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [bsData, setBsData] = useState<BsSingleData[]>([]);
  const [data, setData] = useState<TaskDetailResponseType | null>(null);
  const [floorBsDataCollection, setFloorBsDataCollection] = useState<
    Record<number, BsSingleData[]>
  >({});

  const handleTabChange = (tabId: string | number) => {
    setCurrentFloor(tabId.toString());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/report/detail?taskId=${taskId}`);
      const { data } = await res.json();
      setData(data as TaskDetailResponseType);
      setBsDataOrgin(data.data);
    } catch (error) {
      messageApi.error("Failed to fetch data");
      console.error(error);
    }
  };

  const setBsDataOrgin = (data: TaskDetailResponseType["data"]) => {
    try {
      const originData: BsSingleData[] = JSON.parse(data);

      originData.forEach((item) => {
        if (!floorBsDataCollection[item.floor]) {
          floorBsDataCollection[item.floor] = [];
        }
        floorBsDataCollection[item.floor].push(item);
      });
      setFloorBsDataCollection(floorBsDataCollection);
      setCurrentFloor(`tab${originData[0].floor}`);
      setBsData(originData);
    } catch (e) {
      messageApi.error("Failed to fetch bs data");
    }
  };

  return (
    <main className="bg-[#DFECFF] min-h-screen">
      <div className="max-w-[1035px] mx-auto p-8">
        <BsReportHeader
          taskTime={data?.task?.setTime || ""}
          taskFloor={data?.task?.inspectArea || []}
        />
        {contextHolder}
        <div data-module="content" className="rounded-2xl bg-white mt-8 py-6">
          <div className="px-8 flex flex-col">
            <p className="text-2xl font-bold mb-5">Building Service</p>
            <span className="w-10 h-1 -mt-1 bg-[#0052D9] "></span>
          </div>
          <div className="w-full max-w-[450px] mx-5 mt-5">
            <ScrollableTabs
              tabs={Object.values(floorBsDataCollection).map((item) => ({
                id: `tab${item[0].floor}`,
                label: `${item[0].floor.toString()}F`,
              }))}
              activeTab={currentFloor}
              onTabChange={handleTabChange}
              visibleTabs={4} // 固定显示4个tab
            />
          </div>
          <div className="flex">
            {bsData ? (
              <BsInfoModule
                bsData={bsData}
                floorBsDataCollection={floorBsDataCollection}
                currentFloor={currentFloor || undefined}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
