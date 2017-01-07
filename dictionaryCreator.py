#!/usr/bin/python

from pymongo import MongoClient
import json


def create_father_category(dbin, name, father=None):
    result = dbin.Category.insert_one({
        "name": name.upper()
    })

    if father is not None:
        dbin.Category.update(
            {"_id": father.inserted_id},
            {
                "$push": {
                    "children": result.inserted_id
                }
            }
        )

    return result


def create_child_category(dbin, name, father):
    result = dbin.Category.insert_one({
        "name": name.upper()
    })

    dbin.Category.update(
        {"_id": father.inserted_id},
        {
            "$push": {
                "children": result.inserted_id
            }
        }
    )


def create_tree(dbin, tree_data, father=None):
    if type(tree_data) is dict:
        for leaf in tree_data:
            new_father = create_father_category(dbin, leaf, father)
            create_tree(dbin, tree_data[leaf], new_father)
    elif type(tree_data) is list:
        for leaf in tree_data:
            create_tree(dbin, leaf, father)
    else:
        create_child_category(dbin, tree_data, father)

client = MongoClient()
db = client.paegft

with open('dictionary.json') as json_file:
    data = json.load(json_file)

for element in data['dictionary']:
    create_tree(db, element)
