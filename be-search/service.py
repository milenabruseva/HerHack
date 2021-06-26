from flask_cors import CORS
from flask import Flask, url_for, request
import socket
from elasticsearch import Elasticsearch
from datetime import datetime
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

@app.route('/search/all')
def searchAll():
    res = es.search(index="reddit", body={"query": {"match_all": {}}})
    return res

@app.route('/search')
def search():
    now = datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")

    searchQuery = request.args.get('searchquery', default="", type=str)
    orderBy = request.args.get('orderby', default="_score", type=str)
    subredditFilter = request.args.get('subredditfilter', default=None, type=str)
    startDate = request.args.get('startdate', default="1970-01-01 00:00:00", type=str)
    endDate = request.args.get('enddate', default=date_time, type=str)
    minScore = request.args.get('minscore', default=0, type=int)
    minComments = request.args.get('mincomments', default=0, type=int)

    if subredditFilter != None:
        query = {
            "sort": [
                {orderBy: "desc"}
            ],
            "query": {
                "bool": {
                    "must": [
                        {"multi_match": {
                            "query": searchQuery,
                            "fields": ["title", "body"]
                        }}
                    ],
                    "filter": [
                        {"term":  {"subreddit": subredditFilter}},
                        {"range": {"date": {"gte": startDate, "lte": endDate}}},
                        {"range": {"score": {"gte": minScore}}},
                        {"range": {"num_comments": {"gte": minComments}}}
                    ]
                }
            }
        }
    else:
        query = {
            "sort": [
                {orderBy: "desc"}
            ],
            "query": {
                "bool": {
                    "must": [
                        {"multi_match": {
                            "query": searchQuery,
                            "fields": ["title", "body"]
                        }}
                    ],
                    "filter": [
                        {"range": {"date": {"gte": startDate, "lte": endDate}}},
                        {"range": {"score": {"gte": minScore}}},
                        {"range": {"num_comments": {"gte": minComments}}}
                    ]
                }
            }
        }

    response = es.search(index="reddit", body=query)
    return response

if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    app.debug = True
    http_server = WSGIServer(('', 8000), app)
    http_server.serve_forever()
