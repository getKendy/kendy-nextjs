from zipapp import create_archive
from appwrite.client import Client
from appwrite.services.databases import Databases
from barometer import createBarometer, createBaroAtributes
from alerts import createAlerts, createAlertAtributes
client = Client()

(client
  .set_endpoint('') # Your API Endpoint
  .set_project('') # Your project ID
  .set_key('') # Your secret API key
)

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