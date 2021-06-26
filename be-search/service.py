from flask_cors import CORS
from flask import Flask, url_for, request, jsonify
import socket
from elasticsearch import Elasticsearch
from datetime import datetime
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
from statistics import mean

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
    interval = request.args.get('interval', default="day", type=str)

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
            },
            "aggs": {
                "upvotes_stats": {"extended_stats": {"field": "score"}},
                "comments_stats": {"extended_stats": {"field": "num_comments"}},
                "date_histogram": {"date_histogram": {"field": "date", "interval": interval}}
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
            },
            "aggs": {
                "upvotes_stats": {"extended_stats": {"field": "score"}},
                "comments_stats": {"extended_stats": {"field": "num_comments"}},
                "date_histogram": {"date_histogram": {"field": "date", "interval": interval}}
            }
        }

    response = es.search(index="reddit", body=query)
    return response

@app.route('/sentiment')
def sentiment():
    now = datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")

    searchQuery = request.args.get('searchquery', default="", type=str)
    orderBy = request.args.get('orderby', default="_score", type=str)
    subredditFilter = request.args.get('subredditfilter', default=None, type=str)
    startDate = request.args.get('startdate', default="1970-01-01 00:00:00", type=str)
    endDate = request.args.get('enddate', default=date_time, type=str)
    minScore = request.args.get('minscore', default=0, type=int)
    minComments = request.args.get('mincomments', default=0, type=int)
    interval = request.args.get('interval', default="day", type=str)

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
            },
            "aggs": {
                "upvotes_stats": {"extended_stats": {"field": "score"}},
                "comments_stats": {"extended_stats": {"field": "num_comments"}},
                "date_histogram": {"date_histogram": {"field": "date", "interval": interval}}
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
            },
            "aggs": {
                "upvotes_stats": {"extended_stats": {"field": "score"}},
                "comments_stats": {"extended_stats": {"field": "num_comments"}},
                "date_histogram": {"date_histogram": {"field": "date", "interval": interval}}
            }
        }

    response = es.search(index="reddit", body=query)

    results = []

    for row in response['hits']['hits']:
        pol_score = SIA().polarity_scores(row['_source']['title'])
        results.append(pol_score)

    for row in response['hits']['hits']:
        pol_score = SIA().polarity_scores(row['_source']['body'])
        results.append(pol_score)

    positive = mean([row['pos'] for row in results])
    neutral = mean([row['neu'] for row in results])
    negative = mean([row['neg'] for row in results])
    compound = mean([row['compound'] for row in results])

    return jsonify(positive=positive, neutral=neutral, negative=negative, compound=compound)

if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    app.debug = True
    http_server = WSGIServer(('', 8000), app)
    http_server.serve_forever()
