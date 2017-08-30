'use strict';

/*
 Copyright 2016 Justin Keller

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

////
// CONFIGURATION SETTINGS
////

var _Server = require('./Server');

var _Server2 = _interopRequireDefault(_Server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var http = require('http');
var io = require('socket.io');
var cors = require('cors');

var app = express();

app.use(cors());

var server = http.createServer(app);

var s = new _Server2.default();
s.trackTicker();

app.post('/:ticket', function (req, res) {
    s.concat(req.params.ticket.split(','));
    console.log(req.params.ticket.split(','));
    res.send({
        message: 'Tickers registered'
    });
});

app.get('/:ticket', function (req, res) {
    var quotes = [],
        ticks = req.params.ticket.split(','),
        quote = s.getQuotes();

    ticks.forEach(function (ticker) {
        if (quote[ticker] !== null && quote[ticker] !== undefined) {
            quotes.push(quote[ticker]);
        }
    });

    res.send({ quotes: quotes });
});

server.listen(process.env.PORT || 4000);