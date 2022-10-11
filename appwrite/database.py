from appwrite.client import Client
from appwrite.services.databases import Databases

from database.barometer import createBarometer, createBaroAtributes
from database.alerts import createAlerts, createAlertAtributes

from database.binance import createApi, createApiAtributes

client = Client()

(client
  .set_endpoint('http://10.20.31.67/v1') # Your API Endpoint
  .set_project('632f552c4ce9c579196e') # Your project ID
  .set_key('741c852cafbb77d0cc69062bfd871945c7d63030402b6811017dba482b188cd8848787a406bf18e0bc1d211d686bc76ee116017439961d0c9fffc0ce23e57639f16cd30dcc03bf9440673a5ad9d3c5e5fd5930bf543b2c6be44093ea8ee8a4aecb37af350e75189913784e2ac6feadece14bad9c2aeab48fd676f62ab48a4f9c') # Your secret API key
)

#### GetKendy data
# GetKendy = {}
# databases = Databases(client)
# foundDatabases = databases.list()
# for result in foundDatabases['databases']:
#   if result['name'] == 'GetKendy':
#     GetKendy = result
    
# if GetKendy != {}:
#   print('found')
#   print(GetKendy)
# else:
#   print('not found')
#   GetKendy = databases.create('unique()', 'GetKendy')
  

# barometer = createBarometer(client, GetKendy)
# createBaroAtributes(client, GetKendy, barometer)

# alert = createAlerts(client, GetKendy)
# createAlertAtributes(client, GetKendy, alert)


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
