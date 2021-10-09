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
                        let rainanim = chalkAnimation.radar("Thank you for using this APP");
                        setTimeout(() => {
                        rainanim.stop();
                        }, 5000);
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

