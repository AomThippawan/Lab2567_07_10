'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/users/:uid', function (req, res, next) {
    connection.execute(`UPDATE users_tbl SET name=?, tel=?, updated_at=? WHERE id=?;`,
    [req.body.name, req.body.tel, Date.now(), req.params.uid])
    .then(() => {
        console.log('ok');
    }).catch((err) => {
        console.log(err);
    });
      res.status(200).send('Update Successfully!');
 });

 //------------------------------------delete---------------------------------------------
udRoute.delete('/users/:uid', function (req, res, next) {
    connection.execute("DELETE FROM Users_tbl WHERE id=?;",
     [req.params.uid])
    .then(() => {
        console.log('ok');
    }).catch((err) => {
        console.log(err);
    });
      res.end();
 });
 
udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
})
 module.exports = udRoute;