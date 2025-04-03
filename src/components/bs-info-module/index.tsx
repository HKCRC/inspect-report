import { Divider } from "antd";
import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { BsSingleData } from "../../types";

interface BsInfoModuleProps {
  bsData: BsSingleData[];
  floorBsDataCollection: Record<number, BsSingleData[]>;
  currentFloor: string | undefined;
}

export default function BsInfoModule({
  bsData,
  floorBsDataCollection,
  currentFloor,
}: BsInfoModuleProps) {
  const [rate, setRate] = useState(0);
  const [currentShowData, setCurrentShowData] = useState<BsSingleData | null>(
    null
  );
  const [state, setState] = useState({
    series: [
      {
        name: "",
        data: [] as number[],
      },
    ],
    options: {},
  });

  const [chartData, setChartData] = useState<BsSingleData[]>([]);

  useEffect(() => {
    setRate(bsData?.[0]?.buildQualifiedRate || 0);
    if (currentFloor) {
      const floorInt = parseInt(currentFloor.replace("tab", ""));
      setCurrentShowData(floorBsDataCollection[floorInt]?.[0] || null);
      setChartData(floorBsDataCollection[floorInt] || []);
      setRate(floorBsDataCollection[floorInt]?.[0]?.buildQualifiedRate || 0);
    }
  }, [bsData, currentFloor, floorBsDataCollection]);

  const selectCurrentRadialBar = (index: number) => {
    console.error(index);
    console.error(chartData);
    setCurrentShowData(chartData[index] || null);
  };

  useEffect(() => {
    setState({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      series: chartData.map((item) => item.buildQualifiedRate),
      options: {
        chart: {
          height: 390,
          type: "radialBar",
          events: {
            dataPointSelection: (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              _event: any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              _chartContext: any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              config: any
            ) => {
              selectCurrentRadialBar(config.dataPointIndex);
            },
          },
          selection: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            distributed: true,
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 5,
              size: "50%",
              background: "transparent",
              image: undefined,
              position: "front",
            },
            track: {
              show: true,
              margin: 0, // 轨道边距为0
              strokeWidth: "100%", // 轨道宽度100%
              opacity: 1,
              background: "#f2f2f2",
            },
            dataLabels: {
              value: {
                show: true,
                color: "#000",
                fontSize: "20px",
                offsetY: 12,
                fontWeight: 600,
              },
              total: {
                show: true,
                label: "",
                offsetY: 15,
                fontSize: "20px",
                fontWeight: 600,
                formatter: () => {
                  return rate + "%";
                },
              },
            },
          },
        },
        colors: ["#1ab7ea", "#8acff5", "#b4e2fb"],
        labels: bsData.map((item) => item.floor.toString()),
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    });
  }, [bsData, chartData, rate]);

  return (
    <div className="w-full">
      <Divider
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 30,
          marginTop: 5,
        }}
      />

      <div className="gap-4 px-8">
        <div className="mt-5 mb-8">
          <p className="text-md font-blob">Overall Information</p>
          <p className="text-[#3D3D3D] opacity-60 text-sm mt-1">
            Detection Area
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col border-1 border-[#C8C8C8] rounded-xl p-4 justify-center">
              <p className="text-sm font-blob min-h-[40px] text-[#3D3D3D] opacity-60">
                Detection Area
              </p>

              <div className="flex flex-row  mt-2 ">
                <span className="text-[#3D3D3D] text-[32px] lg:text-[44px] font-bold">
                  {currentShowData?.detectionArea || "NA"}
                  <i className="text-sm not-italic text-[#3D3D3D] opacity-60 font-normal ml-2">
                    m2
                  </i>
                </span>
              </div>
            </div>

            <div className="flex flex-col border-1 border-[#C8C8C8] rounded-xl p-4 justify-center">
              <p className="text-sm font-blob min-h-[40px] text-[#3D3D3D] opacity-60">
                Number of Constructions
              </p>

              <div className="flex flex-row mt-2 ">
                <span className="text-[#3D3D3D] text-[32px] lg:text-[44px] font-bold">
                  {currentShowData?.buildNumber || "NA"}
                  <i className="text-sm not-italic text-[#3D3D3D] opacity-60 font-normal ml-2">
                    pcs
                  </i>
                </span>
              </div>
            </div>

            <div className="flex flex-col border-1 border-[#C8C8C8] rounded-xl p-4 justify-center">
              <p className="text-sm font-blob min-h-[40px] text-[#3D3D3D] opacity-60">
                Qualified Count
              </p>

              <div className="flex flex-row mt-2 items-center">
                <span className="text-[#3D3D3D] text-[32px] lg:text-[44px] font-bold">
                  {currentShowData?.buildQualifiedNumber || "NA"}
                  <i className="text-sm not-italic text-[#3D3D3D] opacity-60 font-normal ml-2">
                    pcs
                  </i>
                </span>
              </div>
            </div>

            <div className="flex flex-col border-1 border-[#C8C8C8] rounded-xl p-4 justify-center">
              <p className="text-sm font-blob min-h-[40px] text-[#3D3D3D] opacity-60">
                UnQualified Count
              </p>

              <div className="flex flex-row  mt-2 items-center">
                <span className="text-[#3D3D3D] text-[32px] lg:text-[44px] font-bold">
                  {currentShowData?.buildUnqualifiedNumber || "NA"}
                  <i className="text-sm not-italic text-[#3D3D3D] opacity-60 font-normal ml-2">
                    pcs
                  </i>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-1 border-[#C8C8C8] rounded-xl p-4">
            <p className="text-md font-blob text-[#3D3D3D] opacity-60">
              Qualified Rate
            </p>

            <ApexCharts
              options={state.options}
              series={state.series}
              type="radialBar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
