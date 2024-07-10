'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/users', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');
    
    connection.execute(`INSERT INTO users_tbl 
     (name, tel, username, password, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?);`, [req.body.name, req.body.tel, req.body.username, mypass, Date.now(), Date.now()])
        .then(() => {
            console.log('ok');
            res.sendStatus(201).send('Insert Successful!')
        }).catch((err) => {
            console.log(err);
        });
    res.end();
});

//-----------------------------read--------------------------------------
wrRoute.get('/users', function (req, res, next) {
    connection.execute(`SELECT * FROM users_tbl;`)
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM users_tbl WHERE name=? AND password=?;',
    [req.body.username, mypass])
    .then((result) => {
        var data = result[0];
        console.log(data);
        if (data.length === 0) {
           res.sendStatus(400);
        } else {
           res.sendStatus(200);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 
 });
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;
 //exports module(router) *จำเป็นมาก*