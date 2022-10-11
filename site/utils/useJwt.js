import useJwtStore from "./store/jwt";
import { account } from "./sdk";

async function useJWT() {
  const { jwt, setJwt } = useJwtStore();
  if (!jwt.token) {
    const newtoken = await account.createJWT();
    setJwt(newtoken.jwt)
    return newtoken.jwt
  }
  const fourteenMinuteAgo = new Date(Date.now() - 1000 * 60 * 14)
  if (jwt.age < fourteenMinuteAgo) {
    const retoken = await account.createJWT();
    setJwt(retoken.jwt)
    return retoken.jwt
  }
  return jwt.token
};

export default useJWT;
