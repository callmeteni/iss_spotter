const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
    if (error) {
        console.log("It didn't work", error);
    } else {
        console.log("It worked! Returned IP:", ip);
    }
});

fetchCoordsByIp((error, coords) => {
    if (error) {
        console.log("It didn't work to fetch IP", error);
    } else {
        console.log("It worked! Returned coordinates:", coords);
    }
});


const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    }

    console.log('It worked! Returned flyover times:', passTimes);
});

const printPassTimes = function(passTimes) {
    for (const pass of passTimes.response) {
      const datetime = new Date(0); // Convert risetime to milliseconds
      const formattedDatetime = datetime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      });
      const duration = pass.duration;
      console.log(`Next pass at ${formattedDatetime} for ${duration} seconds!`);
    }
  };
  
  

nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
});