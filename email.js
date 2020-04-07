var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require('handlebars');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'example@gmail.com', // add your user name
        pass: 'password'           // add your Password
    }
});

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

router.post('/sendEmail', function (req, res) {
    var data = req.body
    if (data.type == "home") {
        readHTMLFile(__dirname + '/HomeEmailTemplate.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                heading: "Inquiry Details",
                email_id: data.email,
                phone_no: data.phone
            };
            data.html = template(replacements);
            transporter.sendMail(data, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.json({ result: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({ result: info.response });
                }
            });
        });
    } else {
        readHTMLFile(__dirname + '/ContactUsEmailTemplate.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                heading: "Inquiry Details",
                name: data.name,
                email_id: data.email,
                phone_no: data.phone,
                paragraph: data.paragraph
            };
            data.html = template(replacements);
            transporter.sendMail(data, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.json({ result: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({ result: info.response });
                }
            });
        });
    }
   

})

module.exports = router
