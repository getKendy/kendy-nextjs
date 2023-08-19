import type { Models } from 'appwrite'
import { create } from 'zustand'


interface UserState {
  user: {
    '$id': string,
    '$createdAt': string,
    '$updatedAt': string,
    name: string,
    registration: string,
    status: boolean,
    passwordUpdate: string,
    email: string,
    phone: string,
    emailVerification: boolean,
    phoneVerification: boolean,
    prefs: { kucoinAlerts?: boolean, binanceAlerts?: boolean, profitPerc?: string, tradePerc?: string } | Record<string, never>
  } | null
  setUser: (user: Models.User<Models.Preferences>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null }))
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