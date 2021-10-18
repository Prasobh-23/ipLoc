#!/usr/bin/env node

let inquirer = require('inquirer');
var Table = require('cli-table');
const chalkAnimation = require('chalk-animation');
const isOnline = require('is-online');
var figlet = require('figlet');
const axios = require('axios');

const getLocation = async(ipaddres) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddres)){
        let url = 'http://ip-api.com/json/' + ipaddres ;
            try{
                const response = await axios.get(url);
                let city = response.data.city;
                let country = response.data.country;
                let countryCode = response.data.countryCode;
                let zip = response.data.zip;
                let latitude = response.data.lat;
                let longitude = response.data.lon;
                let ISP = response.data.isp;
                var table = new Table();
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
                
                catch (err){
                    console.log(err);
                     }   
        }
        else/* istanbul ignore next */ {
            let pulseanim = chalkAnimation.pulse("You have entered an Invalid IP address ");
            setTimeout(() => {
                pulseanim.stop();
                }, 5000);  
            }            
            
}    

async function onCheck(){
    /* istanbul ignore next */
	if(await isOnline()){
        inquirer.prompt([{   
            type : 'input', 
            message: "Enter your IP address : ",
            name : 'ipaddress'}])
            .then((answer) => {
            const ipaddres = answer.ipaddress; 
            getLocation(ipaddres);
            });
        }
    else{
        figlet('Offline !', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.log(err);
                return;
            }
            console.log(data)
            let pulseanim = chalkAnimation.pulse("You are offline! Please check your internet connectivity");
            setTimeout(() => {
                pulseanim.stop();
            }, 5000);
        });
    }
}
onCheck();
exports.getLocation = getLocation;


