import create from 'zustand'

const useAlertStore = create((set) => ({
    alerts:[],
    addAlert: () => set((state) => ({ alerts: state.alert.push(alert)})),

}))

export default useAlertStore