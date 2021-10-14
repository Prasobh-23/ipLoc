const {axios} = require("axios");
//const {getLocation} = require("./index");
import {getLocation} from ('./index.js');

jest.mock("axios");


it("returns location of an ip address", () => {
        axios.get.mockResolvedValue({
            data: {
                "status": "success",
                "country": "Australia"
                }
        });
        const query = '1.1.1.1';
        const country = getLocation(query);
        expect(country).toEqual("Australia");
});

