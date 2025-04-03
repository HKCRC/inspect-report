import {
  Button,
  Carousel,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  message,
  Popover,
  Row,
} from "antd";
import { Chart } from "../../../components/chart";
import PhysicalInfo from "../../../components/physical-info";
import ReportHeader from "../../../components/report-header";
import { InspectAreaView } from "../../../components/inspect-area";
import {
  IAQSingleData,
  SENSOR_CHART_TYPE,
  TaskDetailResponseType,
} from "../../../types";
import { API_URL, CHART_CATEGORY_CONFIG } from "../../../constants";
import { ScrollableTabs } from "../../scroll-tab";
import { useEffect, useRef, useState } from "react";

type IAQReportProps = {
  taskId: string;
};

export default function IAQReport({ taskId }: IAQReportProps) {
  const [currentFloor, setCurrentFloor] = useState<string | undefined>(
    undefined
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<TaskDetailResponseType | null>(null);
  const [floorBsDataCollection, setFloorBsDataCollection] = useState<
    Record<number, IAQSingleData[]>
  >({});
  const [iaqData, setIaqData] = useState<IAQSingleData[]>([]);
  const [floorBsDataCollectionCopy, setFloorBsDataCollectionCopy] = useState<
    Record<number, IAQSingleData[]>
  >({});
  const [selectPick, setSelectPick] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/report/detail?taskId=${taskId}`);
      const { data } = await res.json();
      setData(data as TaskDetailResponseType);
      setIaqDataOrgin(data.data);
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
            [key]: item[key],
          });
        }
        newArr.push({
          floor: item.floor,
          spot: item.spot,
          area: item.area,
          taskId: item.taskId,
        });
      });
    }

    return newArr;
  };

  return (
    <main className="bg-[#DFECFF] min-h-screen">
      {contextHolder}
      <div className="max-w-[1035px] mx-auto p-8">
        <ReportHeader />
        <div
          data-module="content"
          className="border-4 border-[#0052D9] rounded-2xl bg-white mt-8 py-6"
        >
          <div className="px-8">
            <p className="text-3xl font-bold mb-5">2F-Parking Area Map</p>
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <div className="flex gap-2">
                <div className="flex flex-col w-11/12">
                  <p className="text-lg font-normal mb-3">
                    Inspection Point Location
                  </p>
                  <InspectAreaView />
                </div>
              </div>

              <div className="flex gap-2 w-11/12">
                <div className="flex flex-col">
                  <p className="text-lg font-normal mb-2">Field Photo-Pt. 1 </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Carousel: {
                          arrowSize: 36,
                          arrowOffset: 10,
                        },
                      },
                    }}
                  >
                    <Carousel
                      style={{
                        width: "39vw",
                        maxWidth: 426,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                      dots={false}
                      prevArrow={
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="9291"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M232.7556 792.08607c71.714322 71.78186 170.742732 116.227118 280.026718 116.227118l0 0 0 0c109.282962 0 208.303186-44.445258 280.026718-116.227118 71.704089-71.800279 116.111484-170.937161 116.111484-280.334733l0 0 0 0 0 0c0-109.398596-44.407396-208.534454-116.111484-280.334733l0 0c-71.724555-71.222111-170.743756-115.669416-280.026718-115.669416l0 0c-109.282962 0-208.312396 44.447305-280.026718 115.669416-71.14434 71.800279-115.542526 170.936137-115.542526 280.334733C117.21205 621.148909 161.610236 720.28579 232.7556 792.08607L232.7556 792.08607zM196.324876 194.956204C277.712511 114.049522 389.272329 63.893192 512.782318 63.893192l0 0c123.500778 0 235.637742 50.15633 316.447209 131.063011 80.827887 81.484849 130.908492 193.140858 130.908492 316.796156 0 123.634832-50.079582 235.888452-130.908492 316.795133-80.809467 80.906681-192.947454 131.043568-316.447209 131.043568-123.509988 0-235.068783-50.135864-316.457442-131.043568C115.505175 747.640812 65.416384 635.386168 65.416384 511.751337 65.416384 388.097062 115.505175 276.441053 196.324876 194.956204L196.324876 194.956204zM591.314928 272.448112c4.552689 4.552689 7.407714 11.401678 7.407714 18.229177 0 3.413749-0.559748 6.829546-1.697665 10.262738-1.157359 2.835581-3.433192 5.691629-5.710049 7.966439L406.913105 511.751337l184.401824 203.402573c2.276856 2.276856 4.552689 5.131881 5.710049 7.987928 1.137916 2.835581 1.697665 6.268774 1.697665 9.683547 0 7.40669-2.855024 13.676487-7.407714 18.2302l0 0c-4.551666 4.552689-10.803044 7.966439-18.210757 7.966439-3.412726 0-6.828522-1.137916-9.66308-2.276856-3.415796-1.136893-6.27082-2.835581-8.547677-5.690606l0 0L353.979522 529.981537c-2.276856-2.276856-3.984754-5.132904-5.691629-7.966439-1.137916-3.433192-1.706875-6.848988-1.706875-10.263761 0-3.433192 0.568958-6.829546 1.706875-9.68457 1.705851-3.433192 3.414773-5.709025 5.691629-8.565073l200.913892-221.054605 0 0c2.276856-2.296299 5.131881-3.992941 8.547677-5.691629 2.835581-1.157359 6.250354-1.717108 9.66308-1.717108l0 0C580.511885 265.039375 586.762239 267.87598 591.314928 272.448112L591.314928 272.448112z"
                            fill="#ffffff"
                            p-id="9292"
                          ></path>
                        </svg>
                      }
                      nextArrow={
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="9501"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M792.797779 792.08607c71.14434-71.800279 115.542526-170.937161 115.542526-280.334733 0-109.398596-44.398186-208.534454-115.542526-280.334733-71.713298-71.222111-170.742732-115.669416-280.025695-115.669416l0 0c-109.282962 0-208.303186 44.447305-280.026718 115.669416l0 0c-71.704089 71.800279-116.111484 170.936137-116.111484 280.334733l0 0 0 0 0 0c0 109.397572 44.407396 208.534454 116.111484 280.334733 71.724555 71.78186 170.743756 116.227118 280.026718 116.227118l0 0 0 0C622.055047 908.313188 721.084481 863.868953 792.797779 792.08607L792.797779 792.08607zM829.228503 194.956204c80.8197 81.484849 130.909515 193.140858 130.909515 316.796156 0 123.634832-50.088792 235.888452-130.909515 316.795133-81.387635 80.906681-192.947454 131.043568-316.456419 131.043568-123.500778 0-235.637742-50.135864-316.447209-131.043568C115.495966 747.640812 65.416384 635.386168 65.416384 511.751337c0-123.655298 50.079582-235.310284 130.908492-316.796156C277.13332 114.049522 389.271306 63.893192 512.772085 63.893192l0 0C636.281049 63.893192 747.840868 114.049522 829.228503 194.956204L829.228503 194.956204zM434.239474 272.448112c4.551666-4.572132 10.803044-7.408737 18.210757-7.408737l0 0c3.412726 0 6.828522 0.559748 9.66308 1.717108 3.415796 1.697665 6.27082 3.39533 8.547677 5.691629l0 0 200.913892 221.054605c2.276856 2.856048 3.984754 5.130857 5.691629 8.565073 1.137916 2.855024 1.706875 6.250354 1.706875 9.68457 0 3.413749-0.568958 6.829546-1.706875 10.263761-1.706875 2.834558-3.414773 5.689582-5.691629 7.966439L470.659965 751.055584l0 0c-2.276856 2.854001-5.131881 4.552689-8.547677 5.690606-2.835581 1.137916-6.250354 2.276856-9.66308 2.276856-7.407714 0-13.659091-3.413749-18.210757-7.966439l0 0c-4.552689-4.553713-7.407714-10.82351-7.407714-18.2302 0-3.414773 0.559748-6.847965 1.697665-9.683547 1.157359-2.856048 3.433192-5.711072 5.710049-7.987928l184.401824-203.402573L434.239474 308.907489c-2.276856-2.275833-4.552689-5.131881-5.710049-7.966439-1.137916-3.433192-1.697665-6.848988-1.697665-10.262738C426.830737 283.84979 429.685761 277.000801 434.239474 272.448112L434.239474 272.448112z"
                            fill="#ffffff"
                            p-id="9502"
                          ></path>
                        </svg>
                      }
                      arrows
                      infinite={true}
                    >
                      <div className="w-full">
                        <img
                          className="w-full"
                          src="https://inspect-hkcrc-1330283638.cos.ap-hongkong.myqcloud.com/task_73687a6e-30df-40bd-b1d1-89cfa5782f33/2F_A1.jpeg"
                        />
                      </div>
                      <div className="w-full">
                        <img
                          className="w-full"
                          src="https://inspect-hkcrc-1330283638.cos.ap-hongkong.myqcloud.com/task_73687a6e-30df-40bd-b1d1-89cfa5782f33/2F_A2.jpeg"
                        />
                      </div>
                    </Carousel>
                  </ConfigProvider>
                </div>
              </div>
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
                          ].map((item, index) => (
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
                  parseInt(currentFloor?.replace("tab", "") || "0")
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

          <PhysicalInfo />

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
                    data={sliceKeyToNewArr(
                      itemType.key as keyof IAQSingleData,
                      floorBsDataCollectionCopy[
                        parseInt(currentFloor?.replace("tab", "") || "0")
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
                    data={sliceKeyToNewArr(
                      itemType.key as keyof IAQSingleData,
                      floorBsDataCollectionCopy[
                        parseInt(currentFloor?.replace("tab", "") || "0")
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
