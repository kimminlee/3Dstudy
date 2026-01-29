import { create } from 'zustand';

interface EnergyState {
  energyLevel: number; // 0 ~ 100 사이의 값
  setEnergyLevel: (level: number) => void;
}

/**
 * useEnergyStore
 * - 시스템의 에너지 출력을 관리합니다.
 * - UI(Slider)와 3D(회전 속도 및 색상) 양쪽에서 이 상태를 구독합니다.
 */
const useEnergyStore = create<EnergyState>((set) => ({
  energyLevel: 50, // 초기값 50%
  setEnergyLevel: (level) => set({ energyLevel: level }),
}));

export default useEnergyStore;