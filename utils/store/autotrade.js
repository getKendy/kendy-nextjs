import { create } from 'zustand';

const useAutotradeStore = create((set) => ({
  autotrade: false,
  coins: null,
  trades: null,
  volatility: null,
  setAutotrade: (binary) => set(() => ({ autotrade: binary })),
  setCoins: (amount) => set(() => ({ coins: amount })),
  setTrades: (amount) => set(() => ({ trades: amount })),
  setVolatility: (perc) => set(() => ({ volatility: perc })),
}));

export default useAutotradeStore;
