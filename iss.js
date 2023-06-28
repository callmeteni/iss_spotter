const request = require('request');

const fetchMyIP = function (callback) {
    request('http://api.ipify.org?format=json', function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            return callback(Error(msg), null);
        }
        try {
            const ip = JSON.parse(body).ip;
            callback(null, ip);
        }
        catch (error) {
            callback(error, null);
        }
    });
};

const fetchCoordsByIp = function (callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error, null);
        }
        request(`http://ipwho.is/${ip}`, function (error, response, body) {
            if (error) {
                return callback(error, null);
            }
            if (response.statusCode !== 200) {
                const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
                return callback(new Error(msg), null);
            }
            try {
                const parsed = JSON.parse(body);
                const coords = {
                    latitude: parsed.latitude,
                    longitude: parsed.longitude,
                };
                callback(null, coords);
            } catch (error) {
                console.log("This is the call back function", callback);
                callback(error, null);
            }
        });
    });
};


const fetchISSFlyOverTimes = function (coords, callback) {
    request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching ISSFlyOverTimes. Response: ${body}`;
            return callback(new Error(msg), null);
        }
        try {
            const parsed = JSON.parse(body);
            callback(null, parsed);
        } catch (error) {
            callback(error, null);
        }
    });
};

const nextISSTimesForMyLocation = function (callback) {
    fetchCoordsByIp((error, loc) => {

        if (error) {
            return callback(error, null);
        }

        fetchISSFlyOverTimes(loc, (error, nextPasses) => {
            if (error) {
                return callback(error, null);
            }
            console.log("This is next passes", nextPasses);

            callback(null, nextPasses);
        });
    });
};

module.exports = {
    fetchMyIP,
    fetchCoordsByIp,
    fetchISSFlyOverTimes,
    nextISSTimesForMyLocation,
};

