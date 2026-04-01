const express = require("express");
const router = express.Router();

const {
  getCoordinates,
  calculateDistance,
  convertCurrency
} = require("../services/apiService");

// Aircraft data
const aircraftData = {
  Airbus: { A320: 2.5, A321: 2.8, A350: 5.5 },
  Boeing: { B737: 2.7, B787: 5.8, B777: 6.2 },
  ATR: { ATR72: 1.6 }
};

// Home
router.get("/", (req, res) => {
  res.render("index", { aircraftData });
});

// Calculate
router.post("/calculate", async (req, res, next) => {
  try {
    const { from, to, manufacturer, aircraft, currency } = req.body;

    if (!from || !to) {
      throw new Error("Please enter both locations");
    }

    const fromCoords = await getCoordinates(from);
    const toCoords = await getCoordinates(to);

    const distance = calculateDistance(
      fromCoords.lat,
      fromCoords.lng,
      toCoords.lat,
      toCoords.lng
    );

    const burnRate = aircraftData[manufacturer][aircraft];
    const costUSD = distance * burnRate;

    const finalCost = await convertCurrency(costUSD, currency);

    res.render("result", {
        cost: finalCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }),
    currency,
    distance: Math.round(distance),

    fromLat: fromCoords.lat,
    fromLng: fromCoords.lng,
    toLat: toCoords.lat,
    toLng: toCoords.lng
});

  } catch (err) {
    next(err);
  }
});

module.exports = router;