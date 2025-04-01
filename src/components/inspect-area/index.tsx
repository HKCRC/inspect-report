import { Flex } from "antd";
import { motion } from "framer-motion";
import { Floor_Config } from "../../constants";
import { FloorConfigKey, Mode } from "../../types";
import useCurrentShowAreaStore from "../../store";
import { useEffect, useState } from "react";

export const InspectAreaView = () => {
  const { currentShowAreaStore, taskChooseArea } = useCurrentShowAreaStore();

  const { floor, area, spot } = currentShowAreaStore;

  const [currentShowArea, setCurrentShowArea] = useState<
    {
      url: string;
    }[]
  >([]);

  useEffect(() => {
    const multiManualSelectIndex = floor;
    if (multiManualSelectIndex) {
      setCurrentShowAreAction(multiManualSelectIndex);
    }
  }, [area, spot, floor]);

  const setCurrentShowAreAction = (index: FloorConfigKey) => {
    let type = Mode.global;
    if (area !== 0) {
      type = Mode.area;
    }
    if (spot !== 0) {
      type = Mode.spot;
    }
    const currentChooseAreaMap = taskChooseArea?.get(index as FloorConfigKey);

    if (type && [Mode.area, Mode.spot].includes(type)) {
      const getCurrentModeShowConfig =
        Floor_Config[index as FloorConfigKey][type as Mode.area | Mode.spot];

      const currentShowAreaResult = getCurrentModeShowConfig
        .filter((item) => {
          return currentChooseAreaMap?.includes(item.value);
        })
        .map((item) => {
          return {
            url: item.imgUrl,
          };
        });

      if (
        !currentShowAreaResult.length ||
        currentShowAreaResult.find((item) => item.url.indexOf("floor") < 0)
      ) {
        currentShowAreaResult.unshift({
          url: Floor_Config[index as FloorConfigKey].imgUrl,
        });
      }
      setCurrentShowArea(currentShowAreaResult);
    } else {
      const getCurrentModeShowConfig = Floor_Config[index as FloorConfigKey];
      const tmp: { url: string }[] = [
        { url: getCurrentModeShowConfig.imgUrl },
        { url: currentChooseAreaMap ? getCurrentModeShowConfig.mask : "" },
      ];
      setCurrentShowArea(tmp);
    }
  };

  return (
    <Flex className="relative mt-5 min-h-96 rounded-3xl bg-[#f9f9f9] h-full">
      {currentShowArea.length ? (
        currentShowArea.map((item) => (
          <motion.img
            className="absolute left-0 top-0 w-full max-w-[500px]"
            key={item.url}
            src={item.url}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.5 }}
          />
        ))
      ) : (
        <motion.img
          className="absolute left-0 top-0 w-full max-w-[500px]"
          key={Floor_Config["1F"].imgUrl}
          src={Floor_Config["1F" as FloorConfigKey].imgUrl}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -50 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Flex>
  );
};
