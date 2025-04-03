import { Flex } from "antd";
import { motion } from "framer-motion";
import { Floor_Config } from "../../constants";
import { FloorConfigKey, Mode } from "../../types";
import useCurrentShowAreaStore from "../../store";
import { useEffect, useState } from "react";

export const InspectAreaView = () => {
  const { currentShowAreaStore } = useCurrentShowAreaStore();

  const [currentShowArea, setCurrentShowArea] = useState<
    {
      url: string;
    }[]
  >([]);

  useEffect(() => {
    if (currentShowAreaStore.length) {
      let mode: Mode = Mode.global;
      let currentFloorUrl: string = "";
      const currentShowArea = currentShowAreaStore.map((item) => {
        const { floor, area, spot } = item;
        const currentFloor = Floor_Config[floor];
        currentFloorUrl = floor;
        if (area !== 0 || spot !== 0) {
          mode = Mode.spot;
        }

        if (area !== 0) {
          const currentArea = currentFloor.area.filter(
            (item) => parseInt(item.value) === area
          );
          return {
            url: currentArea[0].imgUrl,
          };
        } else if (spot !== 0) {
          const currentSpot = currentFloor.spot.filter(
            (item) => parseInt(item.value) === spot
          );
          return {
            url: currentSpot[0].imgUrl,
          };
        } else {
          return {
            url: currentFloor.imgUrl,
          };
        }
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (mode === Mode.spot) {
        currentShowArea.unshift({
          url: Floor_Config[currentFloorUrl as FloorConfigKey].imgUrl,
        });
      } else {
        currentShowArea.push({
          url: Floor_Config[currentFloorUrl as FloorConfigKey].mask,
        });
      }
      setCurrentShowArea(currentShowArea);
    }
  }, [currentShowAreaStore]);

  return (
    <Flex className="relative mt-5 min-h-54 rounded-3xl bg-[#f9f9f9] h-full">
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
