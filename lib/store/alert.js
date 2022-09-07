import create from 'zustand'

const useAlertStore = create((set) => ({
    lastAlert:{},
    addAlert: (alert) => set((state) => ({ lastAlert: alert})),

}))

export default useAlertStore