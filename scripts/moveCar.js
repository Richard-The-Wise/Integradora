var ArduinoIotClient = require('@arduino/arduino-iot-client');
var defaultClient = ArduinoIotClient.ApiClient.instance;
const axios = require("axios").default

async function getToken() {
    var url = 'https://api2.arduino.cc/iot/v1/clients/token';
    var data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'vbp7UQ6MJVoQQMClqaMJjlOSfCqGAErS',
        client_secret: 'i5AbtdXktpvoETUmDdusTc5b3hknccM66M2fv9aGxeikkk3ZJuBQOOgHA7bT82Fw',
        audience: 'https://api2.arduino.cc/iot'
    }).toString();

    var config = {
        method: 'post',
        url: url,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    try {
        const response = await axios(config);
        // console.log(response.data['access_token'])
        return response.data['access_token'];
    }
    catch (error) {
        console.error("Failed getting an access token: " + error);
    }
}

async function movement(energize,direction) {
    // Configure OAuth2 access token for authorization: oauth2
    defaultClient.defaultHeaders={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT'};
    var oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    // Create an instance of the API class
    var api = new ArduinoIotClient.PropertiesV2Api()
    var id = "a69b9f59-4fec-4123-beef-ba978f9f8a54"; // {String} The id of the thing
    var pid = "";

    switch (direction) {
        case "UP":
            pid = "02f5934b-ac88-44bf-a98c-4bcc4264bf66"; // {String} The id of the property Forward
            break;
        case "LEFT":
            pid = "a5343249-e782-4e94-a196-1d5154ec6342"; // {String} The id of the property Left
            break;
        case "DOWN":
            pid = "cb03085b-3424-4610-aabe-d6b8565e6a0b"; // {String} The id of the property Down
            break;
        case "RIGHT":
            pid = "383ff582-a3e2-48b1-90b5-3eabff680a22"; // {String} The id of the property Right
            break;
    }
    var propertyValue = { value: energize}; // {PropertyValue} 
    // var opts = {
    // 'xOrganization': '11231' // {String} The id of the organization
    // };
    api.propertiesV2Publish(id, pid, propertyValue).then(function() {
    console.log('API called successfully.');
    }, function(error) {
    console.error(error);
    });
}

module.exports = { movement };