import {
  Client as Appwrite,
  Account,
  Avatars,
  Databases,
  Functions,
  ID,
  Permission,
  Query,
  Role,
  Teams,
  Locale,
} from "appwrite";


const initAppwrite = (project: string, endpoint: string) => {
  const client = new Appwrite();
  client
    .setEndpoint(endpoint)
    .setProject(project);

  const account = new Account(client);
  const databases = new Databases(client);
  const avatars = new Avatars(client);
  const teams = new Teams(client);
  const serverless = new Functions(client);
  const locale = new Locale(client);
  
  return {
    account,
    avatars,
    databases,
    teams,
    ID,
    Role,
    Permission,
    Query,
    serverless,
    locale,
  };
};

const sdk = initAppwrite(
  process.env.APPWRITE_PROJECT as string,
  process.env.APPWRITE_ENDPOINT as string
);

type JWT = () => Promise<string | null>

const setJWT = (jwt: string) => {
  const jwtExpires = Date.now() + 15 * 60 * 1000;

  window?.localStorage.setItem('jwt', jwt);
  window?.localStorage.setItem('jwt_expires', jwtExpires.toString());
};

export const getJWT:JWT = async () => {
  const jwt = window?.localStorage.getItem('jwt');
  const jwtExpires = window?.localStorage.getItem('jwt_expires');
  if (jwt && Number(jwtExpires) > Date.now()) {
    return jwt;
  }
  try {
    setJWT((await sdk.account.createJWT()).jwt);
    return await getJWT();
  } catch (error) {
    console.log('jwt', error);
    return null;
  }
};

export default sdk

