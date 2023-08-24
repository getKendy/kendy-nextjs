const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteKucoinDb: String(process.env.NEXT_PUBLIC_APPWRITE_KUCOIN_DATA),
  appwriteKucoinApi: String(process.env.NEXT_PUBLIC_APPWRITE_KUCOIN_API)
}

export default conf;
