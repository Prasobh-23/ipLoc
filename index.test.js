const axios = require("axios");
const {getLocation} = require("./index");

jest.mock("axios");

it("returns location of an ip address", () => {
        axios.get.mockResolvedValue({
            data: {
                "country": "Australia"
                }
        });
        getLocation('1.1.1.1').then((country) => {
            expect(country).toEqual("Australia").done();
            
        })
        
});
