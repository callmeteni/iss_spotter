const { fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then(body => console.log(body));

  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body));

  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));

  nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });