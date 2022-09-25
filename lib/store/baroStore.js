import create from 'zustand';

const useBarosStore = create((set) => ({
  baros: [],
  // setUser: (user) => set((state) => ({ user })),
  setBaros: (baros) => set(() => ({ baros })),
  cleanBaros: () => set({ baros: [] }),
}));

export default useBarosStore;
