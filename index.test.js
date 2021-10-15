const axios = require("axios");
const {getLocation} = require("./index");


jest.mock("axios");

console.log(getLocation('1.1.1.1'));

it("returns location of an ip address", () => {
        axios.get.mockResolvedValue({
            data: {
                "country": "Australia"
                }
        });
        const country = getLocation('1.1.1.1');
        expect(country).toEqual("Australia");
        
});

