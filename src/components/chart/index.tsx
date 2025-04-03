import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { CHART_CATEGORY_CONFIG } from "../../constants";
import { calculateHeightInChart } from "../../utils";
import { IAQSingleData, SENSOR_CHART_TYPE, SENSOR_LEVEL } from "../../types";

interface ChartProps {
  title: string;
  data: IAQSingleData[];
  type: SENSOR_CHART_TYPE;
  isShowUnStandard?: boolean;
}

export const Chart = ({
  title,
  data,
  type = SENSOR_CHART_TYPE["IAQ Parameters"],
  isShowUnStandard = false,
}: ChartProps) => {
  const [state, setState] = useState({
    series: [
      {
        name: "",
        data: [] as number[],
      },
    ],
    options: {} as ApexOptions,
  });

  const calculateHeight = (dataArray: IAQSingleData[]) => {
    const allResult: {
      [key: string]: {
        renderedValue: number;
        originalValue: number;
        range: SENSOR_LEVEL | undefined;
        title: string;
      }[];
    } = {};
    // 对每个数据项执行计算
    dataArray.forEach((dataItem) => {
      const currentFloor = dataItem.floor;
      let key = `Floor ${currentFloor}`;
      if (dataItem.area !== 0) {
        key = `Area ${dataItem.area}`;
      } else if (dataItem.spot !== 0) {
        key = `Spot ${dataItem.spot}`;
      } else {
        key = `Floor ${currentFloor}`;
      }

      CHART_CATEGORY_CONFIG[type].forEach((configItem) => {
        if (
          configItem.key in dataItem &&
          dataItem[configItem.key as keyof typeof dataItem] !== undefined &&
          configItem.standard !== undefined
        ) {
          const parameterData =
            dataItem[configItem.key as keyof typeof dataItem];
          const result = calculateHeightInChart(
            Number(parameterData),
            [
              configItem.standard.Excellent.start,
              configItem.standard.Excellent.end,
            ],
            [configItem.standard.Good.start, configItem.standard.Good.end],
            configItem.name
          );

          if (!allResult[key]) {
            allResult[key] = [];
          }
          allResult[key].push({
            renderedValue: result.renderedValue,
            originalValue: result.originalValue,
            range: result.range,
            title: configItem.name,
          });
        }
      });
    });

    return allResult;
  };

  const renderStandardYaxis = () => {
    if (isShowUnStandard) {
      return [
        {
          y: 0,
          y2: 30,
          borderColor: "#FFE4E4",
          fillColor: "#FFE4E4",
          opacity: 0.3,
          width: "100%",
        },
        {
          y: 30,
          y2: 60,
          borderColor: "#E4EFFF",
          fillColor: "#E4EFFF",
          opacity: 0.3,
          width: "100%",
        },
        {
          y: 60,
          y2: 100,
          borderColor: "#FFF2E4",
          fillColor: "#FFF2E4",
          opacity: 0.3,
          width: "100%",
        },
        {
          y: 100,
          y2: 120,
          borderColor: "#FFE4E4",
          fillColor: "#FFE4E4",
          opacity: 0.3,
          width: "100%",
        },
      ];
    }
    return [
      {
        y: 0,
        y2: 60,
        borderColor: "#E4EFFF",
        fillColor: "#E4EFFF",
        opacity: 0.3,
        width: "100%",
      },
      {
        y: 60,
        y2: 100,
        borderColor: "#FFF2E4",
        fillColor: "#FFF2E4",
        opacity: 0.3,
        width: "100%",
      },
      {
        y: 100,
        y2: 120,
        borderColor: "#FFE4E4",
        fillColor: "#FFE4E4",
        opacity: 0.3,
        width: "100%",
      },
    ];
  };

  const getSeriesData = () => {
    if (!data) return;

    const allResult = calculateHeight(data);

    const anyKey = Object.keys(allResult)[0];

    const titleArr = allResult?.[anyKey]?.map((item) => item.title);
    const originalValueArr = allResult?.[anyKey]?.map(
      (item) => item.originalValue
    );

    const seriesData: ApexAxisChartSeries = [];

    Object.keys(allResult).forEach((key) => {
      const currentItem = allResult[key];
      const allGoals: ApexAxisChartSeries[0]["data"][] = [];
      currentItem.map((item) => {
        const newObj = {
          x: item.title,
          y: item.renderedValue,
          goals: [
            {
              name: item.range as SENSOR_LEVEL,
              value: item.renderedValue,
              strokeHeight: 0,
              strokeColor: "transparent",
            },
          ],
          columnWidthOffset: 1,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allGoals.push(newObj as any);
      });
      seriesData.push({
        name: key,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: allGoals as any,
      });
    });

    return {
      series: seriesData,
      xaxis: titleArr,
      originalValueArr,
    };
  };

  useEffect(() => {
    const chartData = getSeriesData();

    if (!chartData) return;

    setState({
      series: chartData.series,
      options: {
        chart: {
          type: "bar",
          toolbar: {
            show: false, // 关闭右上角的工具栏
          },
        },
        colors: chartData.series.map(() => {
          // 返回一个函数，该函数将根据数据点的goals.name属性返回相应的颜色
          return function ({
            dataPointIndex,
            seriesIndex,
            w,
          }: {
            dataPointIndex: number;
            seriesIndex: number;
            w: unknown;
          }) {
            // 获取当前数据点
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataPoint = (w as any).config.series[seriesIndex].data[
              dataPointIndex
            ];

            // 检查是否有goals属性及name
            if (dataPoint && dataPoint.goals && dataPoint.goals.length > 0) {
              const level = dataPoint.goals[0].name;

              // 根据等级返回对应的颜色
              switch (level) {
                case SENSOR_LEVEL.Excellent:
                  return "#7DB1FF"; // 蓝色
                case SENSOR_LEVEL.Good:
                  return "#FFB362"; // 黄色
                case SENSOR_LEVEL.Exceeding:
                  return "#FC9090"; // 红色
                default:
                  return "#999999"; // 默认灰色
              }
            }

            return "#999999"; // 默认灰色
          };
        }),
        annotations: {
          yaxis: renderStandardYaxis(),
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%", // 调整单个柱子宽度
            borderRadius: 0,
            borderRadiusApplication: "end",
            distributed: false, // 改为false，让我们可以自定义每个柱子的颜色
            dataLabels: {
              position: "top", // 将标签放在顶部
              hideOverflowingLabels: false, // 防止隐藏溢出标签
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#e0e0e0",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: true, // 显示X轴分割线
            },
          },
          yaxis: {
            lines: {
              show: true, // 显示Y轴分割线
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },

        dataLabels: {
          enabled: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (val: number, opts: any) => {
            // 获取当前数据点的索引和系列索引
            const dataPointIndex = opts.dataPointIndex;

            // 检查当前值是否为null
            if (val === null) return "";

            // 只在有值的柱子顶部显示原始值
            // 只在第一个系列上显示原始值，避免重复
            return chartData.originalValueArr[dataPointIndex];
          },
          style: {
            fontSize: "12px",
            colors: [
              (opts: {
                seriesIndex: number;
                dataPointIndex: number;
                w: {
                  globals: {
                    labels: string[];
                    seriesNames: string[];
                    colors: string[];
                  };
                };
              }) => {
                const seriesName = opts.w.globals.seriesNames[opts.seriesIndex];
                if (seriesName === SENSOR_LEVEL.Excellent) {
                  return "#7DB1FF";
                } else if (seriesName === SENSOR_LEVEL.Good) {
                  return "#FFB362";
                } else if (seriesName === SENSOR_LEVEL.Exceeding) {
                  return "#FC9090";
                }
                return "#000000";
              },
            ],
          },
          offsetY: -20,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: chartData.xaxis,
        },
        yaxis: {
          title: {
            text: "Height",
            style: {
              fontSize: "12px",
              color: "#000000",
              fontWeight: "bold",
            },
          },
          min: 0, // 设置y轴最小值为0
          max: 120, // 设置y轴最大值为120
          tickAmount: 6, // 设置刻度数量，这样会在0-120之间显示适当数量的刻度
          labels: {
            formatter: function (val: number) {
              return val.toFixed(0); // 确保显示整数刻度
            },
            offsetX: -5, // 向左移动刻度
          },
        },
        legend: {
          show: true,
          position: "left",
          offsetY: 65,
          offsetX: -80,
          horizontalAlign: "left",
          customLegendItems: [
            `${SENSOR_LEVEL.Exceeding} Class`,
            `${SENSOR_LEVEL.Good} Class`,
            `${SENSOR_LEVEL.Excellent} Class`,
          ],
          showForSingleSeries: true,
          showForNullSeries: true,
          showForZeroSeries: true,
          markers: {
            fillColors: ["#FC9090", "#FFB362", "#7DB1FF"],
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: true,
          //   shared: true, // 确保设置为 true
          //   intersect: false, // 确保设置为 false
          //   // 使用自定义tooltip格式
          //   custom: function ({
          //     series,
          //     dataPointIndex,
          //     w,
          //   }: {
          //     series: number[][];
          //     dataPointIndex: number;
          //     w: {
          //       globals: {
          //         labels: string[];
          //         seriesNames: string[];
          //         colors: string[];
          //       };
          //     };
          //   }) {
          //     // 获取原始值
          //     const originalValue = chartData.originalValueArr[dataPointIndex];
          //     // 获取X轴类别（项目名称）
          //     const xAxisLabel = w.globals.labels[dataPointIndex];

          //     // 创建所有系列的信息
          //     let seriesContent = "";

          //     // 遍历所有系列，检查在当前dataPointIndex位置是否有值
          //     for (let i = 0; i < series.length; i++) {
          //       const value = series[i][dataPointIndex];
          //       if (value !== null && value !== undefined) {
          //         const seriesName = w.globals.seriesNames[i];
          //         seriesContent += `<div><span style="color: ${
          //           w.globals.colors[i]
          //         };">●</span> ${seriesName}: ${value.toFixed(2)}</div>`;
          //       }
          //     }

          //     // 如果没有任何系列有值，返回空字符串
          //     if (seriesContent === "") return "";

          //     return `<div class="apexcharts-tooltip-box" style="padding: 8px; background: #fff; border: 1px solid #ccc; border-radius: 4px;">
          //                 <div style="font-weight: bold; margin-bottom: 5px;">${xAxisLabel}</div>
          //                 ${seriesContent}
          //                 <div style="font-weight: bold; margin-top: 5px;">Original Value: ${originalValue}</div>
          //               </div>`;
          //   },
        } as ApexOptions,
      },
    });
  }, [data]);

  return (
    <div className="relative">
      <div className="absolute top-5 left-0">
        <p className="text-lg font-bold">{title}</p>
        <div className="w-20 h-1.5 mt-1 bg-[#0052D9]"></div>
      </div>

      <ApexCharts
        height={342}
        options={state.options}
        style={{
          marginLeft: 50,
        }}
        series={state.series}
        type="bar"
      />
    </div>
  );
};
