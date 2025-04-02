import { Button } from "antd";
import { TaskDetailResponseType } from "../../types";

type BsReportHeaderProps = {
  taskTime: TaskDetailResponseType["task"]["setTime"];
  taskFloor: TaskDetailResponseType["task"]["inspectArea"];
};

export default function BsReportHeader({
  taskTime,
  taskFloor,
}: BsReportHeaderProps) {
  return (
    <div data-module="header">
      <div className="flex items-start pt-8 justify-between">
        <div
          data-module="header-info"
          className="flex flex-col justify-center max-w-[75%] overflow-hidden"
        >
          <span className="text-3xl font-bold">
            {taskFloor.join(", ")} - Parking Area <br />
            Building Service Report
          </span>

          <div className="grid grid-cols-2 mt-5 mb-6 gap-2">
            <span className="text-sm text-[#888888] font-normal pr-5">
              Date:{" "}
              {new Date(taskTime).toDateString() +
                " " +
                new Date(taskTime).toLocaleTimeString()}
            </span>

            <span className="text-sm text-[#888888] font-normal  pr-5">
              Building: Chaiwan Office Building
            </span>

            <span className="text-sm text-[#888888] font-normal  pr-5">
              Location: {taskFloor.join(", ")}
            </span>

            <span className="text-sm text-[#888888] font-normal  pr-5">
              Category: Building Service
            </span>
          </div>
        </div>

        <Button
          color="primary"
          variant="outlined"
          style={{
            borderRadius: "50px",
            color: "#0052D9",
            padding: "16px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.48)",
          }}
          icon={
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9318"
              width="16"
              height="16"
              style={{ marginTop: 4, marginRight: 2 }}
            >
              <path
                d="M853.333333 853.333333a42.666667 42.666667 0 0 1 0 85.333334H170.666667a42.666667 42.666667 0 0 1 0-85.333334h682.666666zM512 85.504a42.666667 42.666667 0 0 1 42.666667 42.666667v515.370666l204.373333-204.373333a42.666667 42.666667 0 0 1 63.914667 56.277333l-3.584 4.010667-277.376 277.546667a42.666667 42.666667 0 0 1-56.32 3.584l-4.010667-3.541334-277.12-276.650666a42.666667 42.666667 0 0 1 56.234667-63.957334l4.010666 3.541334L469.333333 644.096V128.170667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                fill="#0052D9"
                p-id="9319"
              ></path>
            </svg>
          }
        >
          Download File
        </Button>
      </div>
    </div>
  );
}
