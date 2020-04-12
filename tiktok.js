const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const https = require('https');
const url = require("url");
const path = require("path");

const urls = [
	'https://www.tiktok.com/@buibichphuongofficial/video/6810972736698109186',
	'https://www.tiktok.com/@datmong87/video/6810763040158452994'
];

// const filename = 'mamamuda';
let counter = 0;
urls.forEach(link => {
    console.log("link: " + link);
    counter = counter + 1;
    const options = {
        headers: {
            'content-type': 'text/html; charset=utf-8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        }
    };

    request(link, options, function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        const $ = cheerio.load(body);
        const video = $('.jsx-3382097194.video-player');
        // console.log(links)
        const linkdownload = $(video).attr('src');
        const parsed = url.parse(linkdownload);
        const filename = path.basename(parsed.pathname);
        const file = fs.createWriteStream("downloads/" + filename + ".mp4");
        const request = https.get(linkdownload, function (response) {
            console.log("linkdl: " + linkdownload);
            console.log("filename: " + filename);
            console.log("link: "+link);
            response.pipe(file);
        });
    });

});