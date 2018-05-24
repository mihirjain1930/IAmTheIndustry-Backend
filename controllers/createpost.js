const express = require('express');
const postSchema = require('./../models/createpost');
const GenreSchema = require('./../models/genre');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var async = require('async');



exports.create = function (req, res) {
    var errorMessage = "";
    var outputJSON = "";
    //req.body.image = "";
    var postModelObj = req.body;
    let _this = this,
        directory = "./public/media/industryAudio/";
    fs.exists(directory, function (exists) {
        if (!exists) {
            fs.mkdir(directory, function (err) {
                if (err) {
                    _this.res.send(500, err);
                } else {
                    savemusicAudio(req, res);
                }
            });
        } else {
            savemusicAudio(req, res);
        }
    });
}

var uploadCatImg = function (data, callback) {


    if (data.image.indexOf("base64,") != -1) {
        var Data = data.image.split('base64,');
        var content = Data[0].split(':');
        var contentType = content[1];
        var content = contentType.split('/');
        var base64Data = Data[1];
        var base64Data = base64Data;
    } else {
        var base64Data = data.image.base64;
    }
    var photoname = data._id + '_' + Date.now() + ".png";
    var buf = new Buffer(data.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var data1 = {
        Key: 'categoryImages/' + photoname,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: contentType,
        ACL: 'public-read'
    };
}



var savemusicAudio = function (req, res) {
    let _this = this;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/public/media/industryAudio';
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        var arrfile = [];
        if (!Array.isArray(files.file)) {
            arrfile.push(files.file);
        } else {
            arrfile = files.file;
        }
        var successData = [];
        var i = 0;
        var length = arrfile.length;
        async.map(files, (resp, icb) => {
            var myfile = resp.path.split('/');
            var fileType = resp.type;
            fileType = fileType.split('/');
            var fileName = resp.name;
            var baseImageUrl = path.join(__dirname + '/../public/media/industryAudio/', fileName);
            if (fileType[0] == 'audio') {
                fields.music_audio = myfile[myfile.length - 1];
            } else if (fileType[0] == 'image') {
                fields.icon = myfile[myfile.length - 1];
            } else {
                outputJson = {
                    status: 400,
                    message: "File is not valid. Please select valid file.",
                }
                return res.json(outputJson);
            }

        })
        postSchema(fields).save(fields, function (saveErr, savedata) {
            console.log("saveErr, savedata", saveErr, savedata);
            if (saveErr) {
                outputJson = {
                    status: 400,
                    message: saveErr,
                }
                return res.json(outputJson);
            } else {
                outputJson = {
                    status: 200,
                    data: savedata,
                }
                return res.json(outputJson);
            }
        })
    })
}
exports.genreList = function (req, res) {
    GenreSchema.find({ is_deleted: false, is_active: true }, { is_deleted: 0, is_active: 0, created_date: 0, modified_date: 0 }, function (err, data) {
        res.status(200).send({
            msg: "Data retrieved successfully",
            data: data
        })
    })
}