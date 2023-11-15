const inquirer = require('inquirer');
const Table = require('cli-table');
const chalkAnimation = require('chalk-animation');
const isOnline = require('is-online');
const figlet = require('figlet');
const axios = require('axios');
const countryFlagEmoji = require('country-flag-emoji');
const { validator } = require('./modules/validation');

const DELAY_IN_SECONDS = 5000;

const getLocation = async (IP_FROM_USER) => {
  const validate = await validator(IP_FROM_USER);
  if (validate.ipv4 === true && validate.private === false) {
    /* istanbul ignore next */
    const URL = `http://ip-api.com/json/${IP_FROM_USER}`;
    /* istanbul ignore next */
    try {
      const RESPONSE = await axios.get(URL);
      const { city, country, zip, lat, lon, isp, countryCode } = RESPONSE.data;
      const countryEmoji = countryFlagEmoji.get(countryCode);
      const table = new Table();
      table.push(
        { City: city },
        { Country: country },
        { 'Country Emoji': countryEmoji.emoji },
        { Zip: zip },
        { Latitude: lat },
        { Longitude: lon },
        { ISP: isp }
      );
      console.log(table.toString());
    } catch (err) {
      console.log(err);
    }
  } else {
    const pulseanim = chalkAnimation.pulse(`${validate.result}`);
    setTimeout(() => {
      pulseanim.stop();
    }, DELAY_IN_SECONDS);
  }
};

//getLoc is a function used for making an npm package
const getLocationNpm = async (param) => {
  /* istanbul ignore next */
  const validate = await validator(param);
  if (validate.ipv4 === true && validate.private === false) {
    const URL = `http://ip-api.com/json/${param}`;
    try {
      const RESPONSE = await axios.get(URL);
      return RESPONSE.data;
    } catch (err) {
      console.log(err);
    }
  } else {
    return validate.result;
  }
};

const takeUserInput = async () => {
  /* istanbul ignore next */
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter your IP address : ',
        name: 'IP_ADDRESS',
      },
    ])
    .then((answer) => {
      const IP_FROM_USER = answer.IP_ADDRESS;
      getLocation(IP_FROM_USER);
    });
};

async function connectionChecker() {
  /* istanbul ignore next */
  if (await isOnline()) {
    takeUserInput();
  } else {
    figlet('Offline !', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.log(err);
        return;
      }
      console.log(data);
      const pulseanim = chalkAnimation.pulse(
        'You are offline! Please check your internet connectivity'
      );
      setTimeout(() => {
        pulseanim.stop();
      }, DELAY_IN_SECONDS);
    });
  }
}

exports.getLocation = getLocation;
exports.connectionChecker = connectionChecker;
exports.getLocationNpm = getLocationNpm;
