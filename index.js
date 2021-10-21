let inquirer = require('inquirer');
var Table = require('cli-table');
const chalkAnimation = require('chalk-animation');
const isOnline = require('is-online');
var figlet = require('figlet');
const axios = require('axios');
const countryFlagEmoji = require("country-flag-emoji");

const getLocation = async(ipaddres) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddres)){
        //The above if condition is used to check wheather it is a valid ip or not. Regex is used.
        let url = 'http://ip-api.com/json/' + ipaddres ;
            try{
                const response = await axios.get(url);
                let city = response.data.city;
                let country = response.data.country;
                let countryCode = response.data.countryCode;
                let countryEmoji = countryFlagEmoji.get(countryCode);
                let zip = response.data.zip;
                let latitude = response.data.lat;
                let longitude = response.data.lon;
                let ISP = response.data.isp;
                var table = new Table();
                table.push(
                        { 'City': city }
                    , { 'Country': country }
                    , { 'Country Emoji': countryEmoji.emoji }
                    , { 'Zip': zip }
                    , { 'Latitude': latitude }
                    , { 'Longitude': longitude }
                    , { 'ISP': ISP }
                    );
                    console.log(table.toString());    
                //collecting info from the api and pusing it to a table and consoling it.                
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

const getLoc = async(param) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(param)){
        let url = 'http://ip-api.com/json/' + param ;
            try{
                const response = await axios.get(url);
                return response.data;
            }
            catch (err){
                console.log(err);
                 }   
        }
    else/* istanbul ignore next */ {
            return 'Invalid Ipv4 address';
            }
    }

async function onCheck(){ 
    /* istanbul ignore next */
	if(await isOnline()){                     //isOnline is a npm package which is used to check wheather the host is connected to internet or not
        inquirer.prompt([{                    //inquirer is a npm package which is used to take input from the user while working as a CLI application
            type : 'input', 
            message: "Enter your IP address : ",
            name : 'ipaddress'}])
            .then((answer) => {
            const ipaddres = answer.ipaddress; 
            getLocation(ipaddres);
            });
        }
    else{
        figlet('Offline !', function(err, data) {   //figlet is a npm package which used to show some animation
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

//here we export our three functions inorder to use it as a CLI application and npm package
exports.getLocation = getLocation;
exports.onCheck = onCheck;
exports.getLoc = getLoc;

