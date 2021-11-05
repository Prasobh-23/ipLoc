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
};

//getLoc is a function used for making an npm package
const getLocationNpm = async (param) => {
  /* istanbul ignore next */
  if (VALID_IPV4_REGEX.test(param) && !PRIVATE_IP_REGEX.test(param)) {
    const URL = `http://ip-api.com/json/${param}`;
    try {
      const RESPONSE = await axios.get(URL);
      return RESPONSE.data;
    } catch (err) {
      console.log(err);
    }
  } else {
    return 'Invalid Ipv4 address or the ip is private';
  }
};

const isIpValid = async (IP_FROM_USER) => {
  /* istanbul ignore next */
  if (
    VALID_IPV4_REGEX.test(IP_FROM_USER) &&
    !PRIVATE_IP_REGEX.test(IP_FROM_USER)
  ) {
    getLocation(IP_FROM_USER);
  } else {
    const pulseanim = chalkAnimation.pulse(
      'You have entered an Invalid IPv4 address or the ip is private'
    );
    setTimeout(() => {
      pulseanim.stop();
    }, DELAY_IN_SECONDS);
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
      isIpValid(IP_FROM_USER);
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
exports.isIpValid = isIpValid;
exports.getLocationNpm = getLocationNpm;
