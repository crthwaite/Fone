#!/usr/bin/python

from pymongo import MongoClient

client = MongoClient()
db = client.paegft

cursor = db.Transaction.find()
for document in cursor:
    date = document['operationDate']
    day = date.day
    month = date.month
    year = date.year
    db.Transaction.update_one(
        {"_id": document['_id']},
        {
            "$set": {
                "operationDay" : day,
                "operationMonth" : month,
                "operationYear" : year
            }
        }
    )
