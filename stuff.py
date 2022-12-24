import requests 
from dateutil import parser
from datetime import datetime, timedelta
import pytz
from datetime import datetime


last_hour_date_time = datetime.utcnow().replace(tzinfo=pytz.utc) #- timedelta(hours = 1)

from datetime import datetime
stuff = requests.get("https://api.zeta.markets/account/Gf3sbc5Jb62jH7WcTr3WSNGDQLk1w6wcKMZXKK1SC1E6/trades?limit=1000&page=2").json()
total = {'SOL': 0, 'ETH': 0}
done = False 
while done == False:
    if len(stuff['trades']) < 500:
        done = True
    print(len(stuff['trades']))
    print(stuff['trades'][0])
    for s in stuff['trades']:
        try:
            value = s['size'] * s['price']
            dt = parser.parse(s['timestamp'])
            if dt < last_hour_date_time:# and s['underlying'] == 'ETH':
                last_hour_date_time = dt
                total[s['underlying']]=total[s['underlying']]+value  
        except Exception as e:
            print(e)
    stuff = requests.get("https://api.zeta.markets/account/Gf3sbc5Jb62jH7WcTr3WSNGDQLk1w6wcKMZXKK1SC1E6/trades?limit=1000&page=2").json()
    done = True
    
print(total)
t = total['SOL'] + total['ETH']
sid = 24 * 60 * 60 
day = datetime.utcnow().replace(tzinfo=pytz.utc) - timedelta(hours = 24)
diff = ((datetime.utcnow().replace(tzinfo=pytz.utc)- dt).seconds) / sid 
print(t)
print( t/ diff)
dayv = t / diff 
print(dayv * 24)
print(dayv * 24 * 7)