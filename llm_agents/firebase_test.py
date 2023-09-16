import firebase_admin
from firebase_admin import db
import json

cred_obj = firebase_admin.credentials.Certificate('./firebase_key.json')
default_app = firebase_admin.initialize_app(cred_obj, {'databaseURL' : "https://emergencydispatcherpro-default-rtdb.firebaseio.com/"})

ref = db.reference("/")

example = {
    "Cases" : {
    "0" : {
        "location" : "10925 Linda Vista Lane",
        "dispatched" : "police",
        "situation" : "domestic dispute, 2 injured"
    },
    "1" : {
        "location" : "12345 Example Avenue",
        "dispatched" : "firefighters",
        "situation" : "fire",
    }
    }


}

example = json.dumps(example)
loaded_example = json.loads(example)

ref.set(loaded_example)



print(ref.get())