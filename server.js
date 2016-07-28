/**
 * Created by rafail on 7/21/16.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');


var Employee = require(path.join(__dirname, 'db', 'employeeModel'));
var conf_dir = path.join(__dirname, 'config');
var conf_file = path.join(conf_dir, 'config.json');
var options = {
    key  : fs.readFileSync(path.join(__dirname, 'ssl','server.key')),
    cert : fs.readFileSync(path.join(__dirname, 'ssl','server.crt'))
};

var server_config = JSON.parse(
    fs.readFileSync(conf_file, 'utf8')
);

mongoose.connect(server_config.data_base);

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


router.use(function (req, res, next) {
    next();
});





//GET EMPLOYEES
router.route('/get')
    .get(function (req, res) {
        Employee.find(function(err, employee){
            if (err){
                res.send(err);
            } else {
                res.send(employee);
            }
        });
    });


//DELETE EMPLOYEE
router.route('/del/:id')
    .delete(function (req, res) {
        Employee.remove({
            _id: req.params.id
        }, function(err, emp){
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted' });
            }
        })
    });


//ADD NEW EMPLOYEE
router.route('/add')
    .post(function(req, res) {
        var employee = new Employee();
        employee.first_name = req.body.first_name;
        employee.last_name = req.body.last_name;
        employee.e_mail = req.body.e_mail;
        employee.opt1 = req.body.opt1;
        employee.opt2 = req.body.opt2;
        employee.opt3 = req.body.opt3;
        employee.opt4 = req.body.opt4;
        employee.opt5 = req.body.opt5;
        employee.save(function(err){
            if (err) {
                res.send(err);
            } else {
                console.log(req.json);
                res.json({message: 'Successfully saved new employee'});
            }
        });
    });


//UPDATE
router.route('/update/:id')
    .put(function (req, res) {
        Employee.findById(req.params.id, function(err, employee) {
            if (err) {
                res.send(err);
            } else {
                employee.first_name = req.body.first_name;
                employee.last_name = req.body.last_name;
                employee.e_mail = req.body.e_mail;
                employee.opt1 = req.body.opt1;
                employee.opt2 = req.body.opt2;
                employee.opt3 = req.body.opt3;
                employee.opt4 = req.body.opt4;
                employee.opt5 = req.body.opt5;
                employee.save(function(err){
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(employee);
                        res.json({message: 'Successfully updated employee'});
                    }
                });
            }
        });
    });



app.use('/api',router);

app.listen(server_config.port, function(){
    console.log("Started. PORT: ", server_config.port);
});

/*https.createServer(options, app).listen(server_config.port, function () {
    console.log('Started! PORT: ', server_config.port);
});*/

