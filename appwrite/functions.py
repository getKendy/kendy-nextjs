from appwrite.client import Client
from appwrite.services.functions import Functions

client = Client()

(client
  .set_endpoint('') # Your API Endpoint
  .set_project('') # Your project ID
  .set_key('') # Your secret API key
)

# app_env_api = ''    #  Backend FastAPI IP
# api = ''            #  http://<ip>:8000/api/   # Backend
# redis_cache = ''    #  IP
# redis_port = ''
# redis_db = ''                 # 0
endpoint = ''       #  Appwrite
projectId = ''
api_key = ''
binanceId = ''       # databaseId
col_apiId = ''
col_balancesId = ''
kucoinId = ''
col_apiKuId = ''

functions = Functions(client)


functions.create_variable('StoreApi', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('StoreApi', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('StoreApi', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('StoreApi', 'APPWRITE_COL_APIID', col_apiId)

functions.create_variable('CheckApi', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('CheckApi', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('CheckApi', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('CheckApi', 'APPWRITE_COL_APIID', col_apiId)

functions.create_variable('GetBinanceBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('GetBinanceBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('GetBinanceBalance', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('GetBinanceBalance', 'APPWRITE_COL_APIID', col_apiId)

functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_API_KEY', api_key)
functions.create_variable('DailyBalance', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('DailyBalance', 'APPWRITE_COL_APIID', col_apiId)

functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_API_KEY', api_key)
functions.create_variable('SaveDailyBalance', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('SaveDailyBalance', 'APPWRITE_COLID', col_balancesId)

functions.create_variable('StoreKuApi', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('StoreKuApi', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('StoreKuApi', 'APPWRITE_DATABASEID', kucoinId)
functions.create_variable('StoreKuApi', 'APPWRITE_COL_APIID', col_apiKuId)
