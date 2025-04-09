import { Button, Spin } from "antd";
import { inspectItemOriginNode, Task } from "../../types";
import { useCallback, useState } from "react";
import { getFilteredParentObjects } from "../../utils";
import { TagsContainer } from "../tags-container";
import { Task_Building_Config } from "../../constants";
import { generatePDF } from "../../utils/printpdf";

interface ReportHeaderProps {
  info: Task;
}

export default function ReportHeader({ info }: ReportHeaderProps) {
  const [isFinished, setIsFinished] = useState(true);
  const renderProjectItems = useCallback((inspectItem: string[]) => {
    if (inspectItem) {
      const getInspectItems: inspectItemOriginNode[] = getFilteredParentObjects(
        inspectItem,
        Task_Building_Config
      );

      return <TagsContainer inspectItems={getInspectItems} />;
    }
  }, []);

  const createPDF = () => {
    setIsFinished(false);
    generatePDF("test", () => {
      setIsFinished(true);
    });
  };

  return (
    <div data-module="header">
      <div className="flex items-start pt-8 justify-between">
        <div
          data-module="header-info"
          className="flex flex-col justify-center max-w-[75%] overflow-hidden"
        >
          <span className="text-3xl font-bold">
            {info?.inspectArea.join(", ")}-Parking Area <br />
            Environment Repot
          </span>

          <span className="text-md text-gray-500 mt-5 mb-1">
            Date:{" "}
            {new Date(info?.setTime).toDateString() +
              " " +
              new Date(info?.setTime).toLocaleTimeString()}
          </span>

          <span className="text-md text-gray-500">
            Building: {info?.inspectArea.join(", ")} -Parking Area
          </span>

          <span className="text-xl mt-6 mb-4 font-extrabold text-gray-500">
            Inspection Mission:
          </span>

          <div
            data-module="inspection-tags-list"
            className="flex gap-2 flex-wrap"
          >
            {renderProjectItems(info.inspectItem)}
          </div>
        </div>

        <Spin spinning={!isFinished} tip="Generating PDF...">
          <Button
            size="large"
            type="primary"
            style={{ backgroundColor: "#0052D9" }}
            className="ml-4"
            onClick={createPDF}
          >
            Report Download
          </Button>
        </Spin>
      </div>
    </div>
  );
}
