import { create } from "zustand";

export const USER_LEVEL = {
  free: -1,
  basic: 1,
  standard: 2,
  advanced: 3,
};

interface SaasInfo {
  level?: number; // -1 免费体验客户，1 基础会员，2 中级会员，3 高级会员
  expireDate?: string;
  restNum?: number;
  available?: number; // 1 激活生效中，-1 已失效
  resourceId?: string;
}

interface UserState {
  nickname: string;
  setNickname: (nickname: string) => void;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  saasInfo: SaasInfo;
  setSaasInfo: (SaasInfo: SaasInfo) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUserStore = create<UserState>((set: any) => ({
  nickname: "",
  setNickname: (nickname: string) => set({ nickname }),

  saasInfo: {},
  setSaasInfo: (saasInfo: SaasInfo) => set({ saasInfo }),

  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
