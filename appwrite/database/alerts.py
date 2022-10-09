from appwrite.services.databases import Databases

def createAlerts(client, database):
  databases = Databases(client)
  result = databases.create_collection(database['$id'], 'unique()', 'alerts', ['read("users")'])
  return result

def createAlertAtributes(client,database,collection):
  databases =Databases(client)
  databases.create_string_attribute(database['$id'], collection['$id'], 'timeframe', 5, True)
  databases.create_string_attribute(database['$id'], collection['$id'], 'symbol', 20, True)
  databases.create_string_attribute(database['$id'], collection['$id'], 'market', 20, True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'close', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'volume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'quote', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'volume24h', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bbl', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bbm', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bbu', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bbb', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'stochk', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'stockd', True)
  databases.create_datetime_attribute(database['$id'], collection['$id'], 'date', True)
