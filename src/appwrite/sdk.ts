import conf from "@/conf/config";
import { KucoinAPI } from "@/utils/types";
import { Client, Account, Databases, ID, Avatars, Models, Permission, Role } from 'appwrite'

type CreateUserAccount = {
  email: string,
  password: string,
  name: string
}
type LoginUserAccount = {
  email: string,
  password: string
}


const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient)
const avatar = new Avatars(appwriteClient)
export const database = new Databases(appwriteClient)

export class AppwriteService {
  async createUserAccount({ email, password, name }:
    CreateUserAccount) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name)
      if (userAccount) {
        return this.loginUser({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {

    }
  }

  async loginUser({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password)
    } catch (error: any) {
      return error.message
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      // console.log(data)
      return Boolean(data)
    } catch (error) {
      // console.log('isLoggedIn error: ' + error)
      return false
    }
  }

  async getCurrentUser() {
    try {
      return account.get()
    } catch (error) {
      console.log('getCurrentUser error: ' + error)
    }
    return null
  }

  async getCurrentUserPrefs() {
    try {
      return account.getPrefs()
    } catch (error) {
      console.log('getCurrentUserPrefs error: ' + error)
    }
    return null
  }

  async logout() {
    try {
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('jwt_expires')
      return await account.deleteSession('current')
    } catch (error) {
      console.log("logout error: " + error)
    }
  }

  async getAvater() {
    try {
      return avatar.getInitials()
    } catch (error) { }
    return null
  }

  async setJWT(jwt: string) {
    try {
      const jwtExpires = Date.now() + 15 * 60 * 1000;
      window?.localStorage.setItem('jwt', jwt);
      window?.localStorage.setItem('jwt_expires', jwtExpires.toString());
    } catch (error) {

    }
  }

  async getJWT(): Promise<string | null> {
    try {
      const loginStatus = await this.isLoggedIn()
      if (loginStatus) {
        const jwt = window?.localStorage.getItem('jwt');
        const jwtExpires = window?.localStorage.getItem('jwt_expires');
        if (jwt && Number(jwtExpires) > Date.now()) {
          return jwt;
        }
        this.setJWT((await account.createJWT()).jwt);
        return await this.getJWT();
      } else {
        return null
      }
    } catch (error) {
      console.log('jwt', error);
      return null;
    }
  }

  async hasKucoinApi(): Promise<boolean> {
    try {
      const data = await this.getKucoinApi()
      return Boolean(data)
    } catch (error) {
      return false
    }
  }

  async getKucoinApi(): Promise<KucoinAPI | null> {
    try {
      const { documents }: { documents: Array<Models.Document & KucoinAPI> } = await database.listDocuments(conf.appwriteKucoinDb, conf.appwriteKucoinApi)
      return documents[0]
    } catch (error) {
      return null
    }
  }

  async setKucoinApi({ apiKey, apiSecret, apiPassphrase }: KucoinAPI) {
    try {
      const account = await this.getCurrentUser()
      if (!account) {
        return null
      }
      const { documents }: { documents: Array<Models.Document & KucoinAPI> } = await database.listDocuments(conf.appwriteKucoinDb, conf.appwriteKucoinApi)

      if (documents.length === 1) {
        return database.updateDocument(
          conf.appwriteKucoinDb, conf.appwriteKucoinApi, documents[0].$id,
          { apiKey, apiSecret, apiPassphrase }
        )
      }
      if (documents.length > 1) {
        documents.forEach((doc) => {
          database.deleteDocument(conf.appwriteKucoinDb, conf.appwriteKucoinApi, doc.$id)
        })
      }
      return database.createDocument(
        conf.appwriteKucoinDb, conf.appwriteKucoinApi, ID.unique(),
        { apiKey, apiSecret, apiPassphrase },
        [
          Permission.read(Role.user(account.$id)),
          Permission.update(Role.user(account.$id)),
          Permission.delete(Role.user(account.$id))
        ]
      )

    } catch (error) {
      return null
    }
  }
}

const sdk = new AppwriteService()

export default sdk;
