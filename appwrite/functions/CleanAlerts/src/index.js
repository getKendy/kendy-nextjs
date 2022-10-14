const sdk = require('node-appwrite');
const moment = require('moment');

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

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  // const account = new sdk.Account(client);
  // const avatars = new sdk.Avatars(client);
  const databases = new sdk.Databases(client);
  // const functions = new sdk.Functions(client);
  // const health = new sdk.Health(client);
  // const locale = new sdk.Locale(client);
  // const storage = new sdk.Storage(client);
  // const teams = new sdk.Teams(client);
  // const users = new sdk.Users(client);

  if (!req.variables.APPWRITE_FUNCTION_ENDPOINT || !req.variables.APPWRITE_FUNCTION_API_KEY) {
    res.send('Environment variables are not set. Function cannot use Appwrite SDK.');
  } else {
    client
      .setEndpoint(req.variables.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(req.variables.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(req.variables.APPWRITE_FUNCTION_API_KEY);
  }

  const db = await databases.listDocuments(req.variables.APPWRITE_DATABASEID, req.variables.APPWRITE_COLID);
  const twoDaysAgo = moment().subtract(2, 'days');
  const oldAlerts = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const doc of db.documents) {
    if (moment(doc.$createdAt) < twoDaysAgo) {
      oldAlerts.push(doc);
      databases.deleteDocument(req.variables.APPWRITE_DATABASEID, req.variables.APPWRITE_COLID, doc.$id);
    }
  }
  res.send(`deleted ${oldAlerts.length} alerts`);
};
