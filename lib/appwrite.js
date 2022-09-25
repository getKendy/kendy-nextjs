import Appwrite from 'node-appwrite';
import { Client } from 'appwrite';

export const initAppwriteServer = () => {
  const sdk = new Appwrite.Client();
  sdk
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID;
    .setKey(process.env.APPWRITE_SERVER_API_KEY);

  return sdk;
};

export const initAppwriteClient = () => {
  const sdk = new Client();
  sdk
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID); // Your project ID;
  // .setKey(process.env.APPWRITE_SERVER_API_KEY);

  return sdk;
};
