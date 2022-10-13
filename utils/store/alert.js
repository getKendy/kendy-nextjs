import create from 'zustand';

const useAlertStore = create((set) => ({
  lastAlert: null,
  addAlert: (alert) => set(() => ({ lastAlert: alert })),

}));

export default useAlertStore;
