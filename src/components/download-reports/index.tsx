import DataTable from "../data-table";
import DataTable2 from "../data-table/index2";
import { useEffect, useState } from "react";
import { IAQSingleData, TaskDetailResponseType } from "../../types";
import { Empty, message } from "antd";
import { API_URL } from "../../constants";
import { useSearchParams } from "react-router-dom";

interface DownloadReportsProps {
  propsData?: TaskDetailResponseType | undefined;
}

const DownloadReports = ({ propsData }: DownloadReportsProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [module, setModule] = useState<IAQSingleData[]>([]);
  const [data, setData] = useState<TaskDetailResponseType | undefined>(
    undefined
  );
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");

  useEffect(() => {
    if (propsData) {
      sliceToMultipleModules(propsData.data);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/report/detail?taskId=${taskId}`);
      const { data }: { data: TaskDetailResponseType } = await res.json();
      setData(data);
      sliceToMultipleModules(data.data);
    } catch (error) {
      messageApi.error("Failed to fetch data");
      console.error(error);
    }
  };

  const sliceToMultipleModules = (modules: string) => {
    try {
      const moduleAll = JSON.parse(modules);
      setModule(moduleAll);
    } catch (error) {
      messageApi.error("Failed to parse modules");
      return [];
    }
  };

  if (!data) {
    return <Empty />;
  }
  return (
    <div style={{ display: propsData ? "none" : "block" }}>
      {contextHolder}
      {module.map((module, idx) => {
        return (
          <div id={idx.toString()} key={idx}>
            <DataTable2 data={data} module={module} idx={idx} />
            <DataTable data={data} module={module} idx={idx} />
          </div>
        );
      })}
    </div>
  );
};

export default DownloadReports;
