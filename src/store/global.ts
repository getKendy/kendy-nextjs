import { create } from 'zustand'

type AuthState = {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authStatus: false,
  setAuthStatus: (status) => set(() => ({ authStatus: status })),
}))

interface AutoTrade {
  autotrade: boolean,
  coins: number | null,
  funds: boolean,
  trades: number | null,
  volatility: number | null,
  profitPerc: number,
  tradePerc: number,
  setAutotrade: (binary: boolean) => void,
  setCoins: (amount: number) => void,
  setFunds: (binary: boolean) => void,
  setTrades: (amount: number) => void,
  setVolatility: (perc: number) => void,
  setProfitPerc: (amount: number) => void,
  setTradePerc: (amount: number) => void,
}

export const useAutotradeStore = create<AutoTrade>()((set) => ({
  autotrade: false,
  coins: null,
  funds: false,
  trades: null,
  volatility: null,
  profitPerc: 0.75,
  tradePerc: 5,
  setAutotrade: (binary) => set(() => ({ autotrade: binary })),
  setCoins: (amount) => set(() => ({ coins: amount })),
  setFunds: (binary) => set(() => ({ funds: binary })),
  setTrades: (amount) => set(() => ({ trades: amount })),
  setVolatility: (perc) => set(() => ({ volatility: perc })),
  setProfitPerc: (amount) => set(() => ({ profitPerc: amount })),
  setTradePerc: (amount) => set(() => ({ tradePerc: amount })),
}));