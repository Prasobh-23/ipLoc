let inquirer = require('inquirer');
let request = require('request');
var Table = require('cli-table');
const chalkAnimation = require('chalk-animation');


function getLocation(){
    inquirer.prompt([{   
        type : 'input', 
        message: "Enter your IP address : ",
        name : 'ipaddress'
    }]).then((answer) => {
        const ipaddres = answer.ipaddress;
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddres)){
            //chalkAnimation.neon("You have entered a valid IP address ");
            let url = 'http://ip-api.com/json/' + ipaddres ;
            var table = new Table();
            request({url}, function(err, resp){
                if (err){
                    console.log(err.error);
                }else{
                    let ipInfo = JSON.parse(resp.body);
                    let city = ipInfo.city;
                    let country = ipInfo.country;
                    let countryCode = ipInfo.countryCode;
                    let zip = ipInfo.zip;
                    let latitude = ipInfo.lat;
                    let longitude = ipInfo.lon;
                    let ISP = ipInfo.isp;
            
                    /* console.log("You are from " + city + " in " + country + ".\n" + "Your country code is "
                         + countryCode + ". \n" + "Your zip code is " + zip + "\nYou are exactly at latitude : " 
                         + latitude + ". " + "longitude : " + longitude + "\nYour internet provider is " + ISP); */

                    table.push(
                            { 'City': city }
                          , { 'Country': country }
                          , { 'Country Code': countryCode }
                          , { 'Zip': zip }
                          , { 'Latitude': latitude }
                          , { 'Longitude': longitude }
                          , { 'ISP': ISP }
                        );
                        
                        console.log(table.toString());
                }   
            });

            
        }else{
            let pulseanim = chalkAnimation.pulse("You have entered an Invalid IP address ");
            setTimeout(() => {
                pulseanim.stop();
            }, 5000);
            
        }
        
    });
}

getLocation();

