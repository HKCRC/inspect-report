import { useSearchParams } from "react-router-dom";
import IAQReport from "../../components/report-content/iaq-report";
import BSReport from "../../components/report-content/bs-report";
import { Empty } from "antd";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const rtype = searchParams.get("rtype");
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return (
      <Empty
        style={{ marginTop: "100px" }}
        description="Missing taskId or other params"
      />
    );
  }

  if (rtype === "iaq") {
    return <IAQReport taskId={taskId} />;
  }

  return <BSReport taskId={taskId} />;
}
