import create from 'zustand';

const useActiveTabStore = create((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}))

export default useActiveTabStore;
