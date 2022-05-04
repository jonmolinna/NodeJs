const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "whole foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Trader Joes",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Albertsons",
    miles: 2.8,
  },
  {
    id: 4,
    store: "Paris",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Metro",
    miles: 1.8,
  },
];

// Middleware
router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send(401);
});

// Query Parameters
// http://localhost:9000/api/markets/v1?id=2
router.get("/", (req, res) => {
  const { id } = req.query;
  const idMarket = parseInt(id);

  if (!isNaN(parseInt(idMarket))) {
    const market = supermarkets.find((item) => item.id === parseInt(id));
    res.json(market);
  } else {
    res.json(supermarkets);
  }
});

module.exports = router;
