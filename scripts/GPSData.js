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

async function getGPSData() {
    // Configure OAuth2 access token for authorization: oauth2
    defaultClient.defaultHeaders={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT'};
    var oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    // Create an instance of the API class
    var api = new ArduinoIotClient.PropertiesV2Api();
    var id = "a69b9f59-4fec-4123-beef-ba978f9f8a54"; // {String} The id of the thing
    var pidLatitude = "f4dd54d2-586a-4c0b-938a-d79491d8d80a"; // The id of the thing Latitude
    var pidLongitude = "7b8f03a7-4eb4-4acd-b58e-2f0373d17069"; // The id of the thing Longitude
    var pidDate = "87849cb4-b829-4d83-a893-3262e5898026"; // The id of the thing Date
    var pidVelocity = "51f2da6a-756a-4b5c-9bfc-ffecb5cd47cb"; // The id of the thing Velocity
    var pidTime = "4a032658-0771-4aa5-8483-3ed39defc59d"; // The id of the thing Time

    async function getProperty(id, pid) {
        try {
            const data = await api.propertiesV2Show(id, pid);
            console.log(`API called successfully. ${data.name} Obtained`);
            return data.last_value;
        } catch (error) {
            console.error(`Error getting property ${pid}:`, error);
        }
    }

    const [latitude, longitude, date, velocity, time] = await Promise.all([
        getProperty(id, pidLatitude),
        getProperty(id, pidLongitude),
        getProperty(id, pidDate),
        getProperty(id, pidVelocity),
        getProperty(id, pidTime)
    ]);

    const gpsData = [latitude, longitude, date, velocity, time];

    return gpsData;
}
// Mover código a archivo Control.tsx para poder usar los datos
// import { getGPSData } from '../../scripts/GPSData';
// La función arroja un array con la siguiente estructura
// gpsData = [latitud,longitud,fecha, velocidad, hora]
// para emplear cada valor usar gpsData[1], gpsData[2] etc...
// (async () => {
//     try {
//         const gpsData = await getGPSData();
//         // Use the returned data
//         console.log(`GPS Data Array: ${JSON.stringify(gpsData)}`);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

module.exports = { getGPSData };