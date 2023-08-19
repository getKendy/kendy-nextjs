/* eslint-disable import/no-unresolved */
const sdk = require('node-appwrite');
const { Spot } = require('@binance/connector');

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
  // // You can remove services you don't use
  // const account = new sdk.Account(client);
  // const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  // const functions = new sdk.Functions(client);
  // const health = new sdk.Health(client);
  // const locale = new sdk.Locale(client);
  // const storage = new sdk.Storage(client);
  // const teams = new sdk.Teams(client);
  // const users = new sdk.Users(client);

  if (!req.variables.APPWRITE_FUNCTION_ENDPOINT || !req.variables.APPWRITE_FUNCTION_PROJECT_ID) {
    res.send('Environment variables are not set. Function cannot use Appwrite SDK.');
  } else {
    client
      .setEndpoint(req.variables.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(req.variables.APPWRITE_FUNCTION_PROJECT_ID)
      .setJWT(req.payload);
  }
  const data = await database.listDocuments(req.variables.APPWRITE_DATABASEID, req.variables.APPWRITE_COL_APIID);
  const { apiKey, apiSecret } = data.documents[0];
  const binanceClient = new Spot(apiKey, apiSecret);
  binanceClient
    .userAsset()
    .then((response) => res.json(response.data))
    .catch((error) => res.json(error));

  // res.json({
  //   api: data,
  // });
};
