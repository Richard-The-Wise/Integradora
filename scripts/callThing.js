var IotApi = require('@arduino/arduino-iot-client');
var axios = require('axios');
// export {getToken};]

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

async function run() {
    var client = IotApi.ApiClient.instance;
    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();
    
    var api = new IotApi.DevicesV2Api(client)    
    api.devicesV2List().then(devices => {
        console.log(devices);
    }, error => {
        console.log(error)
    });
}

run();