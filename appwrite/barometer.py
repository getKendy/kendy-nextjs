from appwrite.services.databases import Databases

def createBarometer(client, database):
  databases = Databases(client)
  result = databases.create_collection(database['$id'], 'unique()', 'barometer' ['read("users")'])
  return result

def createBaroAtributes(client,database,collection):
  databases =Databases(client)
  databases.create_float_attribute(database['$id'], collection['$id'], 'fiatBtcVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'fiatBnbVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'fiatEthVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'btcAltVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'ethAltVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bnbAltVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'totalVolume', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'altBtcStrength', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'altEthStrength', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'altBnbStrength', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'btcStrength', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'ethStrength', True)
  databases.create_float_attribute(database['$id'], collection['$id'], 'bnbStrength', True)
