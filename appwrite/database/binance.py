from appwrite.services.databases import Databases

def createApi(client, database):
  databases = Databases(client)
  result = databases.create_collection(database['$id'], 'unique()', 'api', document_security=True)
  return result

def createApiAtributes(client,database,collection):
  databases =Databases(client)
  databases.create_string_attribute(database['$id'], collection['$id'], 'apiKey', 255, True)
  databases.create_string_attribute(database['$id'], collection['$id'], 'apiSecret', 255, True)
  