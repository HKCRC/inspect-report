import { Button, Checkbox, Col, Divider, message, Popover, Row } from "antd";
import { Chart } from "../../../components/chart";
import PhysicalInfo from "../../../components/physical-info";
import ReportHeader from "../../../components/report-header";
import { InspectAreaView } from "../../../components/inspect-area";
import {
  FloorConfigKey,
  IAQSingleData,
  SENSOR_CHART_TYPE,
  Task,
  TaskDetailResponseType,
} from "../../../types";
import { API_URL, CHART_CATEGORY_CONFIG } from "../../../constants";
import { ScrollableTabs } from "../../scroll-tab";
import { useEffect, useState } from "react";
import useCurrentShowAreaStore from "../../../store";
import { ImgCarousel } from "../../carousel";

type IAQReportProps = {
  taskId: string;
};

export default function IAQReport({ taskId }: IAQReportProps) {
  const [currentFloor, setCurrentFloor] = useState<string | undefined>(
    undefined
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [floorBsDataCollection, setFloorBsDataCollection] = useState<
    Record<number, IAQSingleData[]>
  >({});
  const [iaqData, setIaqData] = useState<IAQSingleData[]>([]);
  const [floorBsDataCollectionCopy, setFloorBsDataCollectionCopy] = useState<
    Record<number, IAQSingleData[]>
  >({});
  const [selectPick, setSelectPick] = useState<string[]>([]);
  const [currentPhysicalData, setCurrentPhysicalData] = useState<
    IAQSingleData | undefined
  >(undefined);
  const { selectCurrentFloorAreaOrSpot } = useCurrentShowAreaStore();
  const [taskData, setTaskData] = useState<Task | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/report/detail?taskId=${taskId}`);
      const { data } = await res.json();
      setIaqDataOrgin(data.data);
      setTaskData(data?.task);
    } catch (error) {
      messageApi.error("Failed to fetch data");
      console.error(error);
    }
  };

  const setIaqDataOrgin = (data: TaskDetailResponseType["data"]) => {
    try {
      const originData: IAQSingleData[] = JSON.parse(data);
      originData.forEach((item) => {
        if (!floorBsDataCollection[item.floor]) {
          floorBsDataCollection[item.floor] = [];
        }
        floorBsDataCollection[item.floor].push(item);
      });

      setFloorBsDataCollection(floorBsDataCollection);
      setCurrentFloor(`tab${originData[0].floor}`);
      setIaqData(originData);
      initFirstIAQData(originData[0]);
    } catch (e) {
      messageApi.error("Failed to fetch bs data");
    }
  };

  useEffect(() => {
    if (currentFloor) {
      const initData =
        floorBsDataCollection[parseInt(currentFloor.replace("tab", ""))][0];
      initFirstIAQData(initData);
    }
  }, [currentFloor, iaqData]);

  const initFirstIAQData = (originData: IAQSingleData) => {
    let key = `Floor${originData.floor}`;
    if (originData.spot !== 0) {
      key = `Spot${originData.spot}`;
    } else if (originData.area !== 0) {
      key = `Area${originData.area}`;
    } else {
      key = `Floor${originData.floor}`;
    }
    onFloorChange([key]);
  };

  const handleTabChange = (tabId: string | number) => {
    setCurrentFloor(tabId.toString());
  };

  const getKeyWord = (item: string) => {
    return item.indexOf("Spot") > -1
      ? "Spot"
      : item.indexOf("Area") > -1
      ? "Area"
      : "Floor";
  };

  const onFloorChange = (checkedValues: string[]) => {
    if (currentFloor) {
      const currentFloorInt = parseInt(currentFloor.replace("tab", ""));
      if (checkedValues.length === 0) {
        // 兜底逻辑
      } else {
        const currentShowData: IAQSingleData[] = [];
        const currentFloorData = floorBsDataCollection[currentFloorInt];
        checkedValues.forEach((choonseItem) => {
          if (choonseItem.indexOf(getKeyWord(choonseItem)) > -1) {
            const currenTargetData = currentFloorData.find(
              (item) =>
                item[
                  getKeyWord(choonseItem).toLowerCase() as keyof IAQSingleData
                ] === parseInt(choonseItem.replace(getKeyWord(choonseItem), ""))
            );
            if (currenTargetData) {
              currentShowData.push(currenTargetData);
              setInspectImgView(currentShowData);
              setCurrentPhysicalData(currenTargetData);
            }

            setSelectPick(checkedValues);
            setFloorBsDataCollectionCopy({
              ...floorBsDataCollectionCopy,
              [currentFloorInt]: currentShowData,
            });
          }
        });
      }
    }
  };

  const setInspectImgView = (data: IAQSingleData[]) => {
    const setInSpectCheckData = data.map((item) => {
      return {
        floor: `${item.floor}F` as FloorConfigKey,
        area: item.area,
        spot: item.spot,
      };
    });
    selectCurrentFloorAreaOrSpot(setInSpectCheckData);
  };

  const showSpotOrArea = (floor: number, spot: number, area: number) => {
    if (spot !== 0) {
      return `Spot${spot}`;
    }

    if (area !== 0) {
      return `Area${area}`;
    }

    return `Floor${floor}`;
  };

  const sliceKeyToNewArr = (
    key: keyof IAQSingleData,
    originArr: IAQSingleData[]
  ) => {
    const newArr: Partial<IAQSingleData>[] = [];
    if (originArr?.length) {
      originArr.forEach((item) => {
        if (item[key]) {
          newArr.push({
            floor: item.floor,
            spot: item.spot,
            area: item.area,
            taskId: item.taskId,
            [key]: item[key],
          });
        }
      });
    }

    return newArr;
  };

  return (
    <main className="bg-[#DFECFF] min-h-screen">
      {contextHolder}
      <div className="max-w-[1035px] mx-auto p-8">
        {taskData ? <ReportHeader info={taskData} /> : null}
        <div
          data-module="content"
          className="border-4 border-[#0052D9] rounded-2xl bg-white mt-8 py-6"
        >
          <div className="px-8">
            <p className="text-3xl font-bold mb-5">
              {taskData?.inspectArea.join(", ")}-Parking Area Map
            </p>
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <div className="flex gap-2">
                <div className="flex flex-col w-11/12">
                  <p className="text-lg font-normal mb-3">
                    Inspection{" "}
                    {currentPhysicalData?.spot !== 0
                      ? `Spot`
                      : currentPhysicalData?.area !== 0
                      ? `Area`
                      : `Floor`}{" "}
                    Location
                  </p>
                  <InspectAreaView />
                </div>
              </div>

              {taskData?.inspectImg && currentFloor ? (
                <div className="flex gap-2 w-11/12">
                  <div className="flex flex-col">
                    <p className="text-lg font-normal mb-2">
                      Field Photo-{" "}
                      {currentPhysicalData?.spot !== 0
                        ? `Spot ${currentPhysicalData?.spot}`
                        : currentPhysicalData?.area !== 0
                        ? `Area ${currentPhysicalData?.area}`
                        : `Floor ${currentPhysicalData?.floor}`}
                    </p>
                    <ImgCarousel
                      imgData={
                        taskData?.inspectImg[
                          parseInt(currentFloor.replace("tab", ""))
                        ]
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="w-full mt-20 ">
            <div className="flex justify-between px-8">
              <div>
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

              <Popover
                placement="bottom"
                open={openPopover}
                onOpenChange={setOpenPopover}
                content={
                  <div className="my-2 gap-5">
                    <Checkbox.Group
                      style={{ width: "100%" }}
                      onChange={onFloorChange}
                      value={selectPick}
                    >
                      <Row className="mx-2">
                        {currentFloor &&
                          floorBsDataCollection[
                            parseInt(currentFloor.replace("tab", ""))
                          ].map((item) => (
                            <Col
                              className="py-1"
                              span={12}
                              key={showSpotOrArea(
                                item.floor,
                                item.spot,
                                item.area
                              )}
                            >
                              <Checkbox
                                value={showSpotOrArea(
                                  item.floor,
                                  item.spot,
                                  item.area
                                )}
                              >
                                {showSpotOrArea(
                                  item.floor,
                                  item.spot,
                                  item.area
                                )}
                              </Checkbox>
                            </Col>
                          ))}
                      </Row>
                    </Checkbox.Group>
                  </div>
                }
                arrow={false}
              >
                <Button
                  color="primary"
                  style={{ backgroundColor: "#E4EFFF" }}
                  variant="outlined"
                  className="mr-5"
                >
                  Combined Analysis
                </Button>
              </Popover>
            </div>
            <Divider
              style={{
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 20,
                marginTop: 5,
              }}
            />
          </div>

          <div className="px-8">
            <Chart
              title="IAQ Parameters"
              data={
                floorBsDataCollectionCopy[
                  parseInt(currentFloor?.replace("tab", "") || "1")
                ]
              }
              type={SENSOR_CHART_TYPE["IAQ Parameters"]}
            />
          </div>

          <Divider
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 5,
            }}
          />

          {currentPhysicalData ? (
            <PhysicalInfo data={currentPhysicalData} />
          ) : null}

          {CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Physical Parameters"]].map(
            (itemType) => (
              <>
                <Divider
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                />
                <div className="mt-8 px-8">
                  <Chart
                    title={itemType.name}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    data={sliceKeyToNewArr(
                      itemType.key as keyof IAQSingleData,
                      floorBsDataCollectionCopy[
                        parseInt(currentFloor?.replace("tab", "") || "1")
                      ]
                    )}
                    type={SENSOR_CHART_TYPE["Physical Parameters"]}
                    isShowUnStandard={true}
                  />
                </div>
              </>
            )
          )}

          {CHART_CATEGORY_CONFIG[SENSOR_CHART_TYPE["Other Parameters"]].map(
            (itemType) => (
              <>
                <Divider
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                />
                <div className="mt-8 px-8">
                  <Chart
                    title={itemType.name}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    data={sliceKeyToNewArr(
                      itemType.key as keyof IAQSingleData,
                      floorBsDataCollectionCopy[
                        parseInt(currentFloor?.replace("tab", "") || "1")
                      ]
                    )}
                    type={SENSOR_CHART_TYPE["Other Parameters"]}
                    isShowUnStandard={true}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </main>
  );
}
