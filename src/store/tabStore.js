import create from 'zustand';

const useTabStore = create((set) => ({
  activeTab: 'home',
  setActiveTab: (activeTab) => set(() => ({ activeTab })),
}));

export default useTabStore;
