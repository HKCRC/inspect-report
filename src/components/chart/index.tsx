import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { CHART_CATEGORY_CONFIG } from "../../constants";
import { calculateHeightInChart } from "../../utils";
import { SENSOR_CHART_TYPE, SENSOR_LEVEL } from "../../types";

interface ChartProps {
  title: string;
  data: { [key: string]: number | string };
  type: SENSOR_CHART_TYPE;
}

export const Chart = ({
  title,
  data,
  type = SENSOR_CHART_TYPE["IAQ Parameters"],
}: ChartProps) => {
  const [state, setState] = useState({
    series: [
      {
        name: "",
        data: [] as number[],
      },
    ],
    options: {},
  });

  //   const [renderedValue, setRenderedValue] = useState<
  //     | {
  //         renderedValue: number;
  //         originalValue: number;
  //         range: SENSOR_LEVEL | undefined;
  //       }[]
  //     | null
  //   >(null);

  const calculateHeight = (data: { [key: string]: number | string }) => {
    let parameterData = null;
    const allResult: {
      renderedValue: number;
      originalValue: number;
      range: SENSOR_LEVEL | undefined;
      title: string;
    }[] = [];
    CHART_CATEGORY_CONFIG[type].forEach((item) => {
      if (
        item.key in data &&
        data[item.key as keyof typeof data] !== undefined &&
        item.standard !== undefined
      ) {
        parameterData = data[item.key as keyof typeof data];
        const result = calculateHeightInChart(
          Number(parameterData),
          [item.standard.Excellent.start, item.standard.Excellent.end],
          [item.standard.Good.start, item.standard.Good.end],
          item.name
        );
        allResult.push(result);
      }
    });
    return allResult;
  };

  const getSeriesData = () => {
    const allResult = calculateHeight(data);

    const titleArr = allResult.map((item) => item.title);
    const originalValueArr = allResult.map((item) => item.originalValue);

    // 按照SENSOR_LEVEL创建不同的系列
    const levels = Array.from(
      new Set(allResult.filter((item) => item.range).map((item) => item.range))
    ) as SENSOR_LEVEL[];

    // 为每个SENSOR_LEVEL创建一个系列数据
    const seriesData = levels.map((level) => {
      // 创建与titleArr长度相同的数组，默认值为null
      const data = new Array(titleArr.length).fill(null);

      // 填充对应level的数据
      allResult.forEach((item, index) => {
        if (item.range === level) {
          data[index] = item.renderedValue;
        }
      });

      return {
        name: level,
        data: data,
      };
    });
    return {
      series: seriesData,
      xaxis: titleArr,
      originalValueArr,
    };
  };

  useEffect(() => {
    const chartData = getSeriesData();
    console.error(chartData);
    setState({
      series: chartData.series,
      options: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: false, // 关闭右上角的工具栏
          },
        },
        colors: chartData.series.map((series) => {
          switch (series.name) {
            case "Excellent":
              return "#7DB1FF";
            case "Good":
              return "#FFB362";
            case "Surpass":
              return "#FC9090";
            default:
              return "#999999"; // 默认颜色
          }
        }),
        annotations: {
          yaxis: [
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
          ],
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%", // 调整柱子宽度
            endingShape: "rounded",
            borderRadius: 0,
            borderRadiusApplication: "end",
            distributed: false, // 设置为true会将每个柱子视为单独的类别
            dataLabels: {
              position: "top", // 将标签放在顶部

              hideOverflowingLabels: false, // 防止隐藏溢出标签
              minHeight: 0, // 允许最小高度值
            },
            minHeight: 0,
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
            const seriesIndex = opts.seriesIndex;
            const dataPointIndex = opts.dataPointIndex;

            // 检查当前值是否为null
            if (val === null) return "";

            // 只在有值的柱子顶部显示原始值
            // 只在第一个系列上显示原始值，避免重复
            if (
              seriesIndex === 0 ||
              (seriesIndex > 0 &&
                chartData.series[seriesIndex - 1].data[dataPointIndex] === null)
            ) {
              return chartData.originalValueArr[dataPointIndex];
            }
            return "";
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
                if (seriesName === "Excellent") {
                  return "#7DB1FF";
                } else if (seriesName === "Good") {
                  return "#FFB362";
                } else if (seriesName === "Surpass") {
                  return "#FC9090";
                }
                return "#000000";
              },
            ],
          },
          offsetY: -20,
          hideOverflowingLabels: false, // 确保不会隐藏溢出的标签
          minHeight: 0, // 允许最小高度为0
          allowOverlap: true, // 允许标签重叠
          orientation: "vertical",
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
          position: "left",
          offsetY: 65,
          offsetX: -80,
          showForSingleSeries: true, // 添加此行，确保单系列时也显示图例
          onItemClick: {
            toggleDataSeries: false, // 可选：防止点击图例时切换系列的显示/隐藏
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: false,
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
  }, []);

  return (
    <div className="mt-8 relative">
      <div className="absolute top-5 left-0">
        <p className="text-lg font-bold">{title}</p>
        <div className="w-20 h-2 mt-1 bg-[#0052D9]"></div>
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
