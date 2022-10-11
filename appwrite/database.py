from appwrite.client import Client
from appwrite.services.databases import Databases

from database.barometer import createBarometer, createBaroAtributes
from database.alerts import createAlerts, createAlertAtributes

from database.binance import createApi, createApiAtributes

client = Client()

(client
  .set_endpoint('') # Your API Endpoint
  .set_project('') # Your project ID
  .set_key('') # Your secret API key
)

#### GetKendy data
GetKendy = {}
databases = Databases(client)
foundDatabases = databases.list()
for result in foundDatabases['databases']:
  if result['name'] == 'GetKendy':
    GetKendy = result
    
if GetKendy != {}:
  print('found')
  print(GetKendy)
else:
  print('not found')
  GetKendy = databases.create('unique()', 'GetKendy')
  

barometer = createBarometer(client, GetKendy)
createBaroAtributes(client, GetKendy, barometer)

alert = createAlerts(client, GetKendy)
createAlertAtributes(client, GetKendy, alert)


### Binance data
Binance = {}
databases = Databases(client)
foundDatabases = databases.list()
for result in foundDatabases['databases']:
  if result['name'] == 'Binance':
    Binance = result
    
if Binance != {}:
  print('found')
  print(Binance)
else:
  print('not found')
  Binance = databases.create('unique()', 'Binance')
  
api = createApi(client, Binance)
createApiAtributes(client, Binance, api)
