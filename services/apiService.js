const axios = require("axios");

const GEO_API_KEY = "f912e6b9233a4ca69eb9fe65b2a769b0";
const CURRENCY_API_KEY = "fe9162d72d7247e2bee9c3ca";

async function getCoordinates(place) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${GEO_API_KEY}`;
  const res = await axios.get(url);

  if (!res.data.results.length) {
    throw new Error("Location not found");
  }

  return res.data.results[0].geometry;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function convertCurrency(amount, currency) {
  if (currency === "USD") return amount;

  const url = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/USD`;
  const res = await axios.get(url);

  return amount * res.data.conversion_rates[currency];
}

module.exports = {
  getCoordinates,
  calculateDistance,
  convertCurrency
};