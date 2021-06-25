from flask_cors import CORS
from flask import Flask, url_for
import socket
from elasticsearch import Elasticsearch
import pandas as pd
import json
import csv
import re

app = Flask(__name__)
CORS(app)
es = Elasticsearch(['164.90.161.100'], port=9200,  http_auth=("elastic", "changeme"))

@app.route('/')
def index():
    return "Hello from " + socket.gethostname() + "!"

@app.route('/jsonify/reddit')
def jsonifyReddit():
    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    with open("/root/reddit.csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        # Convert each row into a dictionary
        # and add it to data
        i = 0
        for rows in csvReader:
            # Assuming a column named 'No' to
            # be the primary key
            key = i
            data[key] = rows
            i = i + 1

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open("/root/reddit.json", 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
    return "Jsonifying Reddit"

@app.route('/reindex/reddit')
def reindexReddit():
    es.indices.delete(index='reddit')

    mapping = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 1
        },
        "mappings": {
            "properties": {
                "title": {
                    "type": "text"
                },
                "score": {
                    "type": "integer"
                },
                "subreddit": {
                    "type": "text"
                },
                "url": {
                    "type": "text"
                },
                "num_comments": {
                    "type": "integer"
                },
                "body": {
                    "type": "text"
                },
                "date": {
                    "type": "date",
                    "format": "yyyy-MM-dd HH:mm:ss"
                }
            }
        }
    }

    response = es.indices.create(index="reddit", body=mapping)

    jsonFile = open("/root/reddit.json", 'r').read()
    data = jsonFile.splitlines(True)
    i = 0
    json_str = ""
    docs = {}
    for line in data:
        regex_txt = "\"[0-9]+\":"
        if re.search(regex_txt, line) or re.search("{", line):
            pass
        else:
            if not re.search("},", line):
                json_str = json_str + line
            else:
                docs[i] = "{" + json_str + "}"
                json_str = ""
                print(docs[i])
                es.index(index='reddit', id=i, body=docs[i])
                i = i + 1
    return "Reindex Reddit"

if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    app.debug = True
    http_server = WSGIServer(('', 8000), app)
    http_server.serve_forever()