//const express = require('express');
//const path = require('path');
import fs from 'fs-extra';
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/app';


const app = express();
app.use('/public', express.static(path.resolve(__dirname, 'public')));

const sorter = (data, key) => {
    if(data) {
        data.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        return data.map((f) => <li key={f.id}>[{f.id}] {f.name} - {f.rating}</li>);
    }
};

app.get('/', (req, res) => {
    //res.status(200).send('This is a test from the server');
    fs.readJson('./dist/data/test.json', (err, data) => {
        if(err) console.log('Fetch error', err);
        if(data) {
            let list = data.frames.map((f) => <li key={f.id}>[{f.id}] {f.name} - {f.rating}</li>);
            res.status(200).send(ReactDOMServer.renderToString(<App data={list}/>));
        }
    });
});

app.get('/data', (req, res) => {
    res.status(200).send('This is a test from the server');
});

app.listen(8081, () => {
    console.log('server started....');
});
