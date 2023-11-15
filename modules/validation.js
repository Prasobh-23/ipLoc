const VALID_IPV4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const PRIVATE_IP_REGEX = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;


const validator = async (param) => {
    /* istanbul ignore next */

    let result = {}


    if (!VALID_IPV4_REGEX.test(param)) {
        result = {
            result: "Invalid IP address. Please provide an IPV4 address",
            ipv4: false,
            private: ""
        }
    } else if (PRIVATE_IP_REGEX.test(param)) {
        result = {
            result: "The IP address is private. Please provide a public IP address",
            ipv4: "",
            private: true
        }
    } else if (!VALID_IPV4_REGEX.test(param) && PRIVATE_IP_REGEX.test(param)) {
        result = {
            result: "This is an invalid IPV4 address",
            ipv4: false,
            private: true
        }
    } else {
        result = {
            result: "This is a valid Ip address",
            ipv4: true,
            private: false
        }
    }

    return result;
};


exports.validator = validator;