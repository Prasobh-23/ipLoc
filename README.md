# ipLoc

>ipLoc is a CLI tool and also an npm package to gather accurate information about an IP Address such as Country, City, CountryCode, Lattitude, Longitude, Internet Service Provider, etc.
It is completely written in JavaScript ⌨️.

# Installation 📥

* git clone https://github.com/Prasobh-23/ipLoc.git


# Setup ⚙️
* cd ipLoc
* npm i package.json 
>This command will install all the npm packages required to run ipLoc

# Running CLI 🏃🏼‍♂️

* ip-fetch
>You just have to type 'ip-fetch' and hit enter

# How to use

>After you hit enter, a prompt will be displayed by asking for a valid IPv4 address. Then type in your IP address and hit enter again. It will fetch the information and display it shortly

# ScreenShot

![help](https://user-images.githubusercontent.com/67050982/137878848-c737dcba-fc5a-4856-a9bd-edc1b35f3034.png)



# npm Package

# Installation 📥

* npm i ip-fetch

# Setup ⚙️

```
const ip-fetch = require('ip-fetch');

let info;

let fun = async () =>{
    info = await ip-fetch.getLoc('type an ip here as an argument'); // example => info = await ip-fetch.getLoc('1.1.1.1');
    console.log(info);
}
fun();
//Then you will get a json object as response. If you need each element as indivual values , then you can do

console.log(info.country) // this will only print the country name
```

# name of each elements in the JSON file

status\
country\
countryCode\
region\
regionName\
city\
zip\
lat\
lon\
timezone\
isp\
org