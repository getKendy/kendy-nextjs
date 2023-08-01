import { create } from 'zustand';

const useAutotradeStore = create((set) => ({
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

export default useAutotradeStore;
