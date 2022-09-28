import create from 'zustand';

const useAlertStore = create((set) => ({
  lastAlert: {},
  addAlert: (alert) => set(() => ({ lastAlert: alert })),

}));

export default useAlertStore;
