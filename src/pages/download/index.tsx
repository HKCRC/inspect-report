"use client";

import { useEffect } from "react";
import DownloadReports from "../../components/download-reports";
import useCurrentShowAreaStore from "../../store";

export default function Download() {
  const { selectCurrentFloorAreaOrSpot } = useCurrentShowAreaStore();

  useEffect(() => {
    selectCurrentFloorAreaOrSpot([]);
  }, []);

  return <DownloadReports />;
}
