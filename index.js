let inquirer = require('inquirer');
var Table = require('cli-table');
const chalkAnimation = require('chalk-animation');
const isOnline = require('is-online');
var figlet = require('figlet');
const axios = require('axios');
const countryFlagEmoji = require("country-flag-emoji");
const DELAY = 5000;

const getLocation = async(IP_FROM_USER) => {/* istanbul ignore next */
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(IP_FROM_USER)){                                                         
        let URL = 'http://ip-api.com/json/' + IP_FROM_USER ;
            try{
                const RESPONSE = await axios.get(URL);
                let countryEmoji = countryFlagEmoji.get(RESPONSE.data.countryCode);
                var table = new Table();
                table.push(
                        { 'City': RESPONSE.data.city }
                    , { 'Country': RESPONSE.data.country }
                    , { 'Country Emoji': countryEmoji.emoji }
                    , { 'Zip': RESPONSE.data.zip }
                    , { 'Latitude': RESPONSE.data.lat }
                    , { 'Longitude': RESPONSE.data.lon }
                    , { 'ISP': RESPONSE.data.isp });
                    console.log(table.toString());                             
                }catch (err){console.log(err);}   
        }
    else/* istanbul ignore next */ {
            let pulseanim = chalkAnimation.pulse("You have entered an Invalid IP address ");
            setTimeout(() => {
                pulseanim.stop();
                }, DELAY);
       }            
}    

//getLoc is a function used for making an npm package
const getLoc = async(param) => {
    /* istanbul ignore next */
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(param)){
        let URL = 'http://ip-api.com/json/' + param ;
            try{
                const RESPONSE = await axios.get(URL);
                return RESPONSE.data;}
            catch (err){console.log(err);}   
        }
    else/* istanbul ignore next */ {return 'Invalid Ipv4 address';}
    }


async function onlineChecker(){ 
    /* istanbul ignore next */
	if(await isOnline()){                     
        inquirer.prompt([{                    
            type : 'input', 
            message: "Enter your IP address : ",
            name : 'IP_ADDRESS'}])
            .then((answer) => {
            const IP_FROM_USER = answer.IP_ADDRESS; 
            getLocation(IP_FROM_USER);
            });}
    else{
        figlet('Offline !', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.log(err);
                return;}
            console.log(data)
            let pulseanim = chalkAnimation.pulse("You are offline! Please check your internet connectivity");
            setTimeout(() => {
                pulseanim.stop();
            }, DELAY);});
        }   
}

exports.getLocation = getLocation;
exports.onlineChecker = onlineChecker;
exports.getLoc = getLoc;

