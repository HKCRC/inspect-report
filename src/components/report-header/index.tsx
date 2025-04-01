import { Button, Tag } from "antd";

export default function ReportHeader() {
  return (
    <div data-module="header">
      <div className="flex items-start pt-8 justify-between">
        <div
          data-module="header-info"
          className="flex flex-col justify-center max-w-[75%] overflow-hidden"
        >
          <span className="text-3xl font-bold">
            2F-Parking Area Environment Repot
          </span>

          <span className="text-md text-gray-500 mt-5 mb-1">
            Date: 2025-03-31
          </span>

          <span className="text-md text-gray-500">
            Building: 2F-Parking Area
          </span>

          <span className="text-xl mt-6 mb-4 font-extrabold text-gray-500">
            Inspection Mission:
          </span>

          <div
            data-module="inspection-tags-list"
            className="flex gap-1 flex-wrap"
          >
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="magenta"
            >
              Luxury
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="red"
            >
              Safety
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="volcano"
            >
              Environment
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="orange"
            >
              Health
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="gold"
            >
              Economy
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="lime"
            >
              Comfort
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="green"
            >
              Safety
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="cyan"
            >
              Cyan
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="blue"
            >
              Blue
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="geekblue"
            >
              Geekblue
            </Tag>
            <Tag
              style={{ padding: "8px 15px", borderRadius: "6px" }}
              color="purple"
            >
              Purple
            </Tag>
          </div>
        </div>

        <Button size="large" type="primary" className="ml-4">
          Report Download
        </Button>
      </div>
    </div>
  );
}
