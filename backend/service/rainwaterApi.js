import axios from "axios";

export const getAnnualRainfall = async (locationName) => {
  // 1. Geocoding: Get lat & lng
  const geoRes = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`
  );

  if (!geoRes.data.results || geoRes.data.results.length === 0) {
    throw new Error("Location not found");
  }

  const { latitude, longitude } = geoRes.data.results[0];

  // 2. Date range (last 1 year)
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - 365 * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10);

  // 3. Fetch rainfall data
  const rainRes = await axios.get(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=precipitation_sum`
  );

  const rainfallArray = rainRes.data.daily.precipitation_sum;

  // 4. Calculate total rainfall
  const annualRainfall = rainfallArray.reduce((sum, v) => sum + v, 0);

  return Math.round(annualRainfall);  // mm per year
};
