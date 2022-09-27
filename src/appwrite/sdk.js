import {
  Client, Account, Databases, Functions,
} from 'appwrite';

const sdk = new Client();

sdk
  .setEndpoint('http://10.20.31.67/v1')
  .setProject('632f552c4ce9c579196e');

export const account = new Account(sdk);
export const databases = new Databases(sdk, '632f59b1cb57bc71508c');
export const serverless = new Functions(sdk);

export default sdk;
