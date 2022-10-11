import create from 'zustand';

const useJwtStore = create((set) => ({
  jwt: { token: null, age: '' },
  setJwt: (token) => set(() => ({ jwt: { token, age: new Date() } })),
}))

export default useJwtStore;
