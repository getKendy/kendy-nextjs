import { Client, Account, Databases, Functions } from 'appwrite';

const sdk = new Client();

sdk.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(sdk);
export const databases = new Databases(sdk, process.env.NEXT_PUBLIC_APPWRITE_GETKENDY_DATA);
export const serverless = new Functions(sdk);

export default sdk;
