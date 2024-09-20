const { readFile, writeFile } = require("fs");

// get the text file
readFile("./data/weather_stations.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const dataArray = JSON.stringify(data).split("\\n");
  const dataTemp = dataArray.slice(2, dataArray.length - 1); // remove the comments

  const cityTemp = {}; // { Tokyo: 34}
  const cityCount = {}; // { Tokyo: 4}
  /*
   * cityTemp: [{ Tokyo: 45.34, count: 3}]
   * */
  dataTemp.forEach((item) => {
    const [city, temp] = item.split(";");

    // built cityTemp
    if (!cityTemp.hasOwnProperty(city)) {
      cityTemp[city] = 0;
    }
    cityTemp[city] += Number(temp);

    // built cityCount
    if (!cityCount.hasOwnProperty(city)) {
      cityCount[city] = 0;
    }
    cityCount[city] += 1;
  });

  // sort the cities alphabetically
  const sortedKeysCityTemp = Object.keys(cityTemp).sort((a, b) => {
    return a.localeCompare(b);
  });
  const sortedKeysCityCount = Object.keys(cityCount).sort((a, b) => {
    return a.localeCompare(b);
  });

  // rebuild alphabetically
  const sortedCityTemp = {};
  sortedKeysCityTemp.forEach((key) => {
    sortedCityTemp[key] = cityTemp[key];
  });

  const sortedCityCount = {};
  sortedKeysCityCount.forEach((key) => {
    sortedCityCount[key] = cityCount[key];
  });

  const averageCityTemp = {};
  for (let i = 0; i < Object.keys(sortedCityTemp).length; i++) {
    const city = Object.keys(sortedCityTemp)[i];
    const temp = Object.values(sortedCityTemp)[i];
    const count = Object.values(sortedCityCount)[i];
    averageCityTemp[city] = temp / count;
  }
  console.log({ averageCityTemp });

  // convert map into content before passing it into the writeFile method
  const content = console.log("start writing file");
  writeFile("./data/av_temp_in_cities", content, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("file written successfully");
    // wrote the averageCityTemp into a file
  });
  console.log("done writing file");
});
