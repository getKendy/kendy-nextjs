import { Client, Account, Databases, Functions } from 'appwrite';

const sdk = new Client();

sdk.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(sdk);
export const databases = new Databases(sdk, process.env.NEXT_PUBLIC_APPWRITE_GETKENDY_DATA);
export const serverless = new Functions(sdk);

export const setJWT = (jwt) => {
  const jwtExpires = Date.now() + 15 * 60 * 1000;

  window?.localStorage.setItem('jwt', jwt);
  window?.localStorage.setItem('jwt_expires', jwtExpires.toString());
};

export const getJWT = async () => {
  const jwt = window?.localStorage.getItem('jwt');
  const jwtExpires = window?.localStorage.getItem('jwt_expires');
  if (jwt && Number(jwtExpires) > Date.now()) {
    return jwt;
  }
  try {
    setJWT((await account.createJWT()).jwt);
    return await getJWT();
  } catch (error) {
    console.log('jwt', error);
    return null;
  }
};

export default sdk;
