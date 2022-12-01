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
import requests
import pandas as pd
import pandas_ta as ta
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
    else:
      ticker = dict(json.loads(ticker))
      volume24h = float(ticker['q'])

    response = requests.get(req.variables.get('API') + 'v2/tickers/' + market["id"])
    # print(response)
    if not response:
        continue
    filterTicker = response.json()
    
    if len(filterTicker) >21:
      try:
        lastTicker = filterTicker[-1]
        df = pd.DataFrame(
            filterTicker,
            columns=[
                "id",
                "date",
                "symbol",
                "market",
                "close",
                "open",
                "high",
                "low",
                "volume",
                "quote",
            ],
          )
        print(df['close'])
        # print('creating DateTime')
        df['DateTime'] = pd.to_datetime(df['date'])
        # print('creating index')
        df = df.set_index('DateTime')
        # print('dropping date')
        df = df.drop(['date'], axis=1)
        # !!!! RESAMPLE TICKERS INTO USABLE TIMEFRAMES
        # print('resample 1m / 1T')
        df = df.resample('1T', label='right', closed='right').agg({
          'open': 'first',
          'high': 'max',
          'low': 'min',
          'close': 'last',
          'volume': 'last',
          'quote': 'last'
        })

        # print(type(lastTicker))
        # print(lastTicker.quote)
        # df = filterTicker.to_timeseries(index="date")
        # print(df.tail())
        # print(len(filterTicker))
        # print(lastTicker)
        # df.ta.indicators()
        # help(ta.stoch)
        # Returns:   BB          > help(ta.bbands)
        #    pd.DataFrame: lower, mid, upper, bandwidth columns.
        # print('creating BB')

        df.ta.bbands(
          close=df["close"],
          length=20,
          std=2,
          mamode="sma",
          cumulative=True,
          append=True,
          fill='nearest',
        )
        print(df.tail())
        # print(df.columns)
        if (
          float(df.iloc[-1, df.columns.get_loc("close")])
          < float(df.iloc[-1, df.columns.get_loc("BBL_20_2.0")])
          and float(df.iloc[-1, df.columns.get_loc("BBB_20_2.0")]) >= 1.5
        ):
          # print(df["BBB_20_2.0"])
          # print(df.iloc[
          #         -1, df.columns.get_loc("symbol", "BBL_20_2.0", "BBL_20_2.0")
          #     ])
          # print(df.tail())
          # Returns:   STOCH       > help(ta.stoch)
          #     pd.DataFrame: %K, %D columns.
          df.ta.stoch(
            high=df["high"],
            low=df["low"],
            smooth_k=1,
            cumulative=True,
            append=True,
          )
          # print(df.columns)
          print(df.tail())
          # Index(['id', 'symbol', 'market', 'close', 'open', 'high', 'low', 'volume',
          # 'quote', 'BBL_20_2.0', 'BBM_20_2.0', 'BBU_20_2.0', 'BBB_20_2.0',
          # 'STOCHk_14_3_1', 'STOCHd_14_3_1'],dtype='object')
          # df.iloc[-1:]
          if float(df.iloc[-1, df.columns.get_loc("STOCHk_14_3_1")]) < 20:
              # print(df.tail())
              # print(df.columns)
            # print(
            #   str(df.iloc[-1, df.columns.get_loc("symbol")])
            #   + " found something: "
            #   + lastTicker['date']
            #   + " (UTC)  Price: "
            #   + str(df.iloc[-1, df.columns.get_loc("close")])
            #   + " -> BB: "
            #   + str(df.iloc[-1, df.columns.get_loc("BBL_20_2.0")])
            #   + " Stoch: "
            #   + str(df.iloc[-1, df.columns.get_loc("STOCHk_14_3_1")])
            # )
            data = {
              "date": lastTicker['date'],
              "symbol": df.iloc[-1, df.columns.get_loc("symbol")],
              "market": df.iloc[-1, df.columns.get_loc("market")],
              "close": round(
                df.iloc[-1, df.columns.get_loc("close")], 8
              ),
              "volume": round(
                df.iloc[-1,
                        df.columns.get_loc("volume")], 2
              ),
              "quote": round(
                df.iloc[-1, df.columns.get_loc("quote")], 2
              ),
              "bbl": round(
                df.iloc[-1,
                        df.columns.get_loc("BBL_20_2.0")], 8
              ),
              "bbm": round(
                df.iloc[-1,
                        df.columns.get_loc("BBM_20_2.0")], 8
              ),
              "bbu": round(
                df.iloc[-1,
                        df.columns.get_loc("BBU_20_2.0")], 8
              ),
              "bbb": round(
                df.iloc[-1,
                        df.columns.get_loc("BBB_20_2.0")], 1
              ),
              "stochk": round(
                df.iloc[-1,
                        df.columns.get_loc("STOCHk_14_3_1")], 0
              ),
              "stockd": round(
                df.iloc[-1,
                        df.columns.get_loc("STOCHd_14_3_1")], 0
              ),
            }
            headers = {
                "Content-Type": "application/json",
                "accept": "application/json"
              }
            requests.post(req.variables.get('API') + "v2/alert/",
              json=data, headers=headers)
      except TypeError as error:
        res.send(error)
      except KeyError as error:
        res.send(error)
  res.send('run complete')