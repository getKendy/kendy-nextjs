from appwrite.services.databases import Databases
from appwrite.permission import Permission
from appwrite.role import Role

def createBalance(client, database):
  databases = Databases(client)
  result = databases.create_collection(database['$id'], 'unique()', 'balances', document_security=True)
  return result

def createBalanceAtributes(client,database,collection):
  databases =Databases(client)
  databases.create_string_attribute(database['$id'], collection['$id'], 'userId', 255, True)
  databases.create_datetime_attribute(database['$id'],collection['$id'],'date',True)
  databases.create_string_attribute(database['$id'], collection['$id'], 'asset', 255, True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'free', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'freeze', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'ipoable', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'locked', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'withdrawing', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'btcValuation', True)
