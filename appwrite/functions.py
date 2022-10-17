from appwrite.client import Client
from appwrite.services.functions import Functions

client = Client()

(client
  .set_endpoint('https://baas.hezik.nl/v1') # Your API Endpoint
  .set_project('631db1da6e495d8a4abb') # Your project ID
  .set_key('d2d4f9cc26ec341204603d668e3835811708b82bb5c6f43d0f0ebb5b8848f37b348af0005c5ecf0af2310fd7af84212c3ed32841f2af6f0a6ce8f0a129a056bb84a62d7d3b6fe9355defa3488732e01d6b699cb66bfc6b8cc310ac8edc98bd8e8dc3ecdca50ec17f08e1c04ff9d83e35c4bcf799d8a411a561395ed32a8665e7') # Your secret API key
)

app_env_api = ''    #  Backend FastAPI IP
api = ''            #  http://<ip>:8000/api/   # Backend
redis_cache = ''    #  IP
redis_port = ''
redis_db = ''                 # 0
endpoint = 'https://baas.hezik.nl/v1'       #  Appwrite
projectId = '631db1da6e495d8a4abb'
api_key = 'd2d4f9cc26ec341204603d668e3835811708b82bb5c6f43d0f0ebb5b8848f37b348af0005c5ecf0af2310fd7af84212c3ed32841f2af6f0a6ce8f0a129a056bb84a62d7d3b6fe9355defa3488732e01d6b699cb66bfc6b8cc310ac8edc98bd8e8dc3ecdca50ec17f08e1c04ff9d83e35c4bcf799d8a411a561395ed32a8665e7'
getKendyId = '63347cb749e076dba255'     # databaseId
barometerId = '63347cf393bc3361a46c'
alertId = '63347cf68e875da33e14'
binanceId = '6345bfbbd33b870f61c9'       # databaseId
col_apiId = '6345c008c1826c80399e'
col_balancesId = '634d71cccb17a3212522'

functions = Functions(client)

# functions.create_variable('GetTicker', 'APP_ENV_API', app_env_api)

# functions.create_variable('get_database_price_for_pair', 'API', api)

# functions.create_variable('calculate_dollar_price', 'REDIS_CACHE', redis_cache)
# functions.create_variable('calculate_dollar_price', 'REDIS_PORT', redis_port)
# functions.create_variable('calculate_dollar_price', 'REDIS_DB', redis_db)
# functions.create_variable('calculate_dollar_price', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('calculate_dollar_price', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('calculate_dollar_price', 'APPWRITE_FUNCTION_API_KEY', api_key)

# functions.create_variable('update_barometer', 'REDIS_CACHE', redis_cache)
# functions.create_variable('update_barometer', 'REDIS_PORT', redis_port)
# functions.create_variable('update_barometer', 'REDIS_DB', redis_db)
# functions.create_variable('update_barometer', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('update_barometer', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('update_barometer', 'APPWRITE_FUNCTION_API_KEY', api_key)
# functions.create_variable('update_barometer', 'APPWRITE_DATABASEID', getKendyId)
# functions.create_variable('update_barometer', 'APPWRITE_BAROMETERID', barometerId)

# functions.create_variable('calculate_bitcoin_price', 'REDIS_CACHE', redis_cache)
# functions.create_variable('calculate_bitcoin_price', 'REDIS_PORT', redis_port)
# functions.create_variable('calculate_bitcoin_price', 'REDIS_DB', redis_db)
# functions.create_variable('calculate_bitcoin_price', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('calculate_bitcoin_price', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('calculate_bitcoin_price', 'APPWRITE_FUNCTION_API_KEY', api_key)

# functions.create_variable('StoreApi', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('StoreApi', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('StoreApi', 'APPWRITE_DATABASEID', binanceId)
# functions.create_variable('StoreApi', 'APPWRITE_COL_APIID', col_apiId)

# functions.create_variable('CheckApi', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('CheckApi', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('CheckApi', 'APPWRITE_DATABASEID', binanceId)
# functions.create_variable('CheckApi', 'APPWRITE_COL_APIID', col_apiId)

# functions.create_variable('GetBinanceBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('GetBinanceBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('GetBinanceBalance', 'APPWRITE_DATABASEID', binanceId)
# functions.create_variable('GetBinanceBalance', 'APPWRITE_COL_APIID', col_apiId)

# functions.create_variable('CleanAlerts', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('CleanAlerts', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('CleanAlerts', 'APPWRITE_FUNCTION_API_KEY', api_key)
# functions.create_variable('CleanAlerts', 'APPWRITE_DATABASEID', getKendyId)
# functions.create_variable('CleanAlerts', 'APPWRITE_COLID', alertId)

# functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
# functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
# functions.create_variable('DailyBalance', 'APPWRITE_FUNCTION_API_KEY', api_key)
# functions.create_variable('DailyBalance', 'APPWRITE_DATABASEID', binanceId)
# functions.create_variable('DailyBalance', 'APPWRITE_COL_APIID', col_apiId)

functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_ENDPOINT', endpoint)
functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_PROJECT_ID', projectId)
functions.create_variable('SaveDailyBalance', 'APPWRITE_FUNCTION_API_KEY', api_key)
functions.create_variable('SaveDailyBalance', 'APPWRITE_DATABASEID', binanceId)
functions.create_variable('SaveDailyBalance', 'APPWRITE_COLID', col_balancesId)