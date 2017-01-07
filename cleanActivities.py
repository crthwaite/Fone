#!/usr/bin/python

from pymongo import MongoClient

client = MongoClient()
db = client.paegft

cursor = db.Transaction.find()

for document in cursor:
    activity = document["peerActivity"]
    activityClean = activity.strip()
    db.Transaction.update(
        {"_id": document['_id']},
        {
            "$set": {
                "peerActivityClean": activityClean
            }
        }
    )