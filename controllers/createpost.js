const express = require('express');
const postSchema = require('./../models/createpost');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var async = require('async');



exports.create = function(req, res) {
    var errorMessage = "";
    var outputJSON = "";
    //req.body.image = "";
    var postModelObj = req.body;
    let _this = this,
        directory = "./public/media/industryAudio/";
    fs.exists(directory, function(exists) {
        if (!exists) {
            fs.mkdir(directory, function(err) {
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
    // postObj(postModelObj).save(req.body, function(err, data) {
    //     if (err) {
    //         switch (err.title) {
    //             case 'ValidationError':
    //                 for (field in err.errors) {
    //                     if (errorMessage == "") {
    //                         errorMessage = err.errors[field].message;
    //                     } else {
    //                         errorMessage += ", " + err.errors[field].message;
    //                     }
    //                 } //for
    //                 break;
    //         } //switch
    //         outputJSON = {
    //             'status': 'failure',
    //             'messageId': 401,
    //             'message': errorMessage
    //         };
    //         res.jsonp(outputJSON);
    //     } //if
    //     else {
    //         if (req.body.imageObj != undefined) {

    //             let reqdata = {};
    //             reqdata._id = data._id;
    //             reqdata.image = req.body.imageObj;
    //             reqdata.field = 'icon';
    //             reqdata.folder = '';
    //             uploadCatImg(reqdata, function(responce) {
    //                 outputJSON = {
    //                     'status': 'success',
    //                     'messageId': 200,
    //                     'message': constantObj.messages.categorySuccess,
    //                     'data': data
    //                 };
    //                 res.jsonp(outputJSON);
    //             });
    //         } else {
    //             outputJSON = {
    //                 'status': 'success',
    //                 'messageId': 200,
    //                 'message': constantObj.messages.categorySuccess,
    //                 'data': data
    //             };
    //             res.jsonp(outputJSON);

    //         }

    //     }

    // });
}

var uploadCatImg = function(data, callback) {


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



var savemusicAudio = function(req, res) {
    let _this = this;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = process.env.PWD + '/public/media/industryAudio';
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
        //console.log("fields", fields);
        //console.log("fields", fields);
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
            console.log(">>>>>222222222222", myfile[myfile.length - 1])
            var fileType = resp.type;
            fileType = fileType.split('/');
            console.log("fileType222222222222222", fileType, resp.type)
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
        console.log("fields111111111",fields)
        
        postSchema(fields).save(fields, function(saveErr, savedata) {
             console.log("saveErr, savedata", saveErr, savedata);
            if (saveErr) {
                console.log("0000000000000000000")
                outputJson = {
                    status: 400,
                    message: saveErr,
                }
                return res.json(outputJson);
            } else {
                console.log("222222222222")
                outputJson = {
                    status: 200,
                    data: savedata,
                }
                return res.json(outputJson);
            }
        })


    })

}