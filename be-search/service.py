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

@app.route('/search/all')
def searchAll():
    res = es.search(index="reddit", body={"query": {"match_all": {}}})
    return res

if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    app.debug = True
    http_server = WSGIServer(('', 8000), app)
    http_server.serve_forever()