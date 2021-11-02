const inquirer = require('inquirer');
const Table = require('cli-table');
const chalkAnimation = require('chalk-animation');
const isOnline = require('is-online');
const figlet = require('figlet');
const axios = require('axios');
const countryFlagEmoji = require('country-flag-emoji');

const DELAY_IN_SECONDS = 5000;
const VALID_IPV4_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const PRIVATE_IP_REGEX =
  /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;

const getLocation = async (IP_FROM_USER) => {
  /* istanbul ignore next */
  if (
    VALID_IPV4_REGEX.test(IP_FROM_USER) &&
    PRIVATE_IP_REGEX.test(IP_FROM_USER) === false
  ) {
    const URL = `http://ip-api.com/json/${IP_FROM_USER}`;
    try {
      const RESPONSE = await axios.get(URL);
      const countryEmoji = countryFlagEmoji.get(RESPONSE.data.countryCode);
      const table = new Table();
      table.push(
        { City: RESPONSE.data.city },
        { Country: RESPONSE.data.country },
        { 'Country Emoji': countryEmoji.emoji },
        { Zip: RESPONSE.data.zip },
        { Latitude: RESPONSE.data.lat },
        { Longitude: RESPONSE.data.lon },
        { ISP: RESPONSE.data.isp }
      );
      console.log(table.toString());
    } catch (err) {
      console.log(err);
    }
  } /* istanbul ignore next */ else {
    const pulseanim = chalkAnimation.pulse(
      'You have entered an Invalid IPv4 address or the ip is private'
    );
    setTimeout(() => {
      pulseanim.stop();
    }, DELAY_IN_SECONDS);
  }
};

//getLoc is a function used for making an npm package
const getLocationNpm = async (param) => {
  /* istanbul ignore next */
  if (VALID_IPV4_REGEX.test(param) && PRIVATE_IP_REGEX.test(param) === false) {
    const URL = `http://ip-api.com/json/${param}`;
    try {
      const RESPONSE = await axios.get(URL);
      return RESPONSE.data;
    } catch (err) {
      console.log(err);
    }
  } /* istanbul ignore next */ else {
    return 'Invalid Ipv4 address or the ip is private';
  }
};

async function connectionChecker() {
  /* istanbul ignore next */
  if (await isOnline()) {
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
