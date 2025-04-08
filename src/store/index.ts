


import { create } from 'zustand';
import { FloorConfigKey, Mode } from '../types';

interface TaskManagerStore {
    mode: Mode
    currentShowAreaStore: {
        floor: FloorConfigKey,
        area: number;
        spot: number;
    }[]
    selectCurrentFloorAreaOrSpot: (data: {
        floor: FloorConfigKey,
        area: number;
        spot: number;
    }[]) => void;
}

export const initTaskStore = {
    mode: Mode.global,
    currentShowArea: [{
        floor: "1F" as FloorConfigKey,
        area: 0,
        spot: 0,
    }],
}

const useCurrentShowAreaStore = create<TaskManagerStore>()(
      (set) => ({
        currentShowAreaStore: {
          ...initTaskStore.currentShowArea
        },
        mode: initTaskStore.mode,
        selectCurrentFloorAreaOrSpot: (data: {
            floor: FloorConfigKey,
            area: number;
            spot: number;
        }[]) => set({ currentShowAreaStore: data }),
      }),
  );
  

export default useCurrentShowAreaStore;