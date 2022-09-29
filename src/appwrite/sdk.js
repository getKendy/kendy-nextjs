import {
  Client, Account, Databases, Functions,
} from 'appwrite';

const sdk = new Client();

sdk
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT);

export const account = new Account(sdk);
export const databases = new Databases(sdk, process.env.REACT_APP_APPWRITE_GETKENDY_DATA);
export const serverless = new Functions(sdk);

export default sdk;
