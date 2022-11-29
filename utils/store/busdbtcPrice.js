import create from 'zustand';

const useBusdBtcStore = create((set) => ({
  busdBtcPrice: 0,
  setBusdBtcPrice: (price) => set(() => ({ busdBtcPrice: price })),
}));

export default useBusdBtcStore;
