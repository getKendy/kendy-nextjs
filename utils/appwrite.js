import Appwrite from 'node-appwrite';

// eslint-disable-next-line import/prefer-default-export
export const initAppwrite = () => {
  const sdk = new Appwrite.Client();
  sdk
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.APPWRITE_API_KEY);
  return sdk;
};
