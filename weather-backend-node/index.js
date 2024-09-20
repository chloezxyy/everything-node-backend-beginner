const { readFile, writeFile } = require("fs").promises;

async function processWeatherData() {
  try {
    const data = await readFile("./data/weather_stations.txt", "utf8");

    // process data
    const dataArray = JSON.stringify(data).split("\\n").slice(2);

    // get the unique city and count
    const cityTemp = dataArray.reduce((acc, cur) => {
      const [city, temp] = cur.split(";");
      const cityIndex = acc.findIndex((item) => item.city === city);
      if (cityIndex === -1) {
        acc.push({
          city,
          totalTemp: Number(temp),
          count: 1,
        });
      } else {
        acc[cityIndex].totalTemp += Number(temp);
        acc[cityIndex].count += 1;
      }
      return acc;
    }, []);

    // get the av temp by city
    /*
    { city: 'Santiago', totalTemp: 29.245099999999994, count: 10 },
    { city: 'Xingtai', totalTemp: 37.0659, count: 1 },
    *
    { city: 'Santiago', avTemp: 29.245099999999994/10 },
    { city: 'Xingtai', avTemp: 37.0659 },
    * */
    const avTempByCity = cityTemp.reduce((acc, cur) => {
      // iterate through the data and get the av temp
      acc.push({
        city: cur.city,
        avTemp: cur.totalTemp / cur.count,
      });
      return acc;
    }, []);

    let content = "";
    avTempByCity.forEach((data) => {
      const line = `${data.city}: ${data.avTemp}\n`;
      content += line;
    });
    return content;
  } catch (e) {
    console.error(e);
  }
}

async function writeWeatherData() {
  try {
    const weatherString = await processWeatherData();
    console.log({ weatherString });
  } catch (e) {}
}
writeWeatherData();
