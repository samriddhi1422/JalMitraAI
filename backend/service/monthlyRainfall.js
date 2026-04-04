import axios from "axios";

export const getMonthlyRainfall = async (locationName,year) => {
  //  Get lat & lng
  const geoRes = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`
  );

  if (!geoRes.data.results || geoRes.data.results.length === 0) {
    throw new Error("Location not found");
  }

  const { latitude, longitude } = geoRes.data.results[0];

  //  Date range 
  const startDate = `${year}-01-01`;

const today = new Date().toISOString().slice(0, 10);
const endDate =
  year === new Date().getFullYear()
    ? today
    : `${year}-12-31`;


  //  Fetch rainfall data
  const rainRes = await axios.get(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=precipitation_sum`
  );

const dates = rainRes.data.daily.time;
  const rainfall = rainRes.data.daily.precipitation_sum;
   const monthlyRainfall = Array(12).fill(0)

   dates.forEach((date, index) => {
    const monthIndex = new Date(date).getMonth(); 
    monthlyRainfall[monthIndex] += rainfall[index];
  });
  return monthlyRainfall.map((value, index) => ({
    month: index + 1,
    rainfall: Math.round(value), 
  }));
};
