// eslint-disable-next-line import/no-unresolved
const sdk = require('node-appwrite');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

// eslint-disable-next-line func-names
module.exports = async function (req, res) {
  const client = new sdk.Client();
  // You can remove services you don't use
  const account = new sdk.Account(client);
  // const avatars = new sdk.Avatars(client);
  const databases = new sdk.Databases(client);
  // const functions = new sdk.Functions(client);
  // const health = new sdk.Health(client);
  // const locale = new sdk.Locale(client);
  // const storage = new sdk.Storage(client);
  // const teams = new sdk.Teams(client);
  // const users = new sdk.Users(client);
  // const jwt = JSON.parse(req.payload);
  // res.json(jwt);
  const payload = JSON.parse(req.payload);
  const { token, apiKey, apiSecret } = payload;
  // res.json({ token, apiKey, apiSecret })
  if (!req.variables.APPWRITE_FUNCTION_ENDPOINT || !req.variables.APPWRITE_FUNCTION_PROJECT_ID) {
    res.send('Environment variables are not set. Function cannot use Appwrite SDK.');
  } else {
    client
      .setEndpoint(req.variables.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(req.variables.APPWRITE_FUNCTION_PROJECT_ID)
      .setJWT(token);
  }

  const curUser = await account.get();
  const docs = await databases.listDocuments(req.variables.APPWRITE_DATABASEID, req.variables.APPWRITE_COL_APIID);
  if (docs.total === 0) {
    // Create new
    await databases.createDocument(
      req.variables.APPWRITE_DATABASEID,
      req.variables.APPWRITE_COL_APIID,
      'unique()',
      { apiKey, apiSecret, userId: curUser.$id },
      [
        sdk.Permission.read(sdk.Role.user(curUser.$id)),
        sdk.Permission.update(sdk.Role.user(curUser.$id)),
        sdk.Permission.delete(sdk.Role.user(curUser.$id)),
      ]
    );
  } else {
    // Update current
    await databases.updateDocument(
      req.variables.APPWRITE_DATABASEID,
      req.variables.APPWRITE_COL_APIID,
      docs.documents[0].$id,
      { apiKey, apiSecret }
    );
  }

  if (docs.total > 1) {
    for (let i = 1; i < docs.documents.length; i += 1) {
      databases.deleteDocument(
        req.variables.APPWRITE_DATABASEID,
        req.variables.APPWRITE_COL_APIID,
        docs.documents[i].$id
      );
    }
  }

  res.send('ok');
};
