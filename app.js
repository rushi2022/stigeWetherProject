const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(rqs,res)
{

const apikey = "8870d0cdcbb61e66bdbcedfcf7e89f5c";
const city = rqs.body.cityName;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {

            const wetherData = JSON.parse(data);
            const temp = wetherData.main.temp
            const wetherDis = wetherData.weather[0].description
            res.write("<h1>The tempratur in " + city+" "+  temp + " celcius.</h1>");
            const icon = wetherData.weather[0].icon
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<img src=" + imageurl + ">");
        });
    });
});













app.listen(3000, function () {
    console.log("Server is host on port no 3000");
});

