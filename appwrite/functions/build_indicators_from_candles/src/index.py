from appwrite.client import Client
# You can remove imports of services you don't use
# from appwrite.services.account import Account
# from appwrite.services.avatars import Avatars
# from appwrite.services.databases import Databases
from appwrite.services.functions import Functions
# from appwrite.services.health import Health
# from appwrite.services.locale import Locale
# from appwrite.services.storage import Storage
# from appwrite.services.teams import Teams
# from appwrite.services.users import Users
import json
import redis

"""
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
"""

def main(req, res):
  r = redis.Redis(host=req.variables.get('REDIS_CACHE'),
                port=req.variables.get('REDIS_PORT'),
                db=req.variables.get('REDIS_DB'))

  client = Client()
  # You can remove services you don't use
  # account = Account(client)
  # avatars = Avatars(client)
  # database = Database(client)
  functions = Functions(client)
  # health = Health(client)
  # locale = Locale(client)
  # storage = Storage(client)
  # teams = Teams(client)
  # users = Users(client)

  if not req.variables.get('APPWRITE_FUNCTION_ENDPOINT') or not req.variables.get('APPWRITE_FUNCTION_API_KEY'):
    return res.send('Environment variables are not set. Function cannot use Appwrite SDK.')
  else:
    (
    client
      .set_endpoint(req.variables.get('APPWRITE_FUNCTION_ENDPOINT', None))
      .set_project(req.variables.get('APPWRITE_FUNCTION_PROJECT_ID', None))
      .set_key(req.variables.get('APPWRITE_FUNCTION_API_KEY', None))
    )
  
  # return res.json({
  #   "areDevelopersAwesome": True,
  # })
  keys = r.keys("market*")
  for key in keys:
    market = dict(json.loads(r.get(key)))
    if market['quoteAsset'] != "BTC":
      continue


    ticker = r.get(market['baseAsset'] + market['quoteAsset'])
    if ticker is None:
      volume24h = 0
    ticker = dict(json.loads(ticker))
    volume24h = float(ticker['q'])
    return res.send(volume24h)