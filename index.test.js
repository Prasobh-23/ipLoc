const axios = require('axios');
const { getLocationNpm } = require('./index');

jest.mock('axios');

it('returns location of an ip address', () => {
  axios.get.mockResolvedValue({
    data: {
      country: 'Australia',
    },
  });
  getLocationNpm('1.1.1.1').then((res) => {
    const country = res.country;
    expect(country).toEqual('Australia').done();
  });
});

it('returns ip is private or not', () => {
  getLocationNpm('192.168.1.1').then((res) => {
    expect(res).toEqual('Invalid Ipv4 address or the ip is private').done();
  });
});
