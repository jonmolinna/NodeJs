const { Router } = require("express");

const router = Router();

const groceryList = [
  {
    id: 1,
    item: "milk",
    quantity: 2,
  },
  {
    id: 2,
    item: "cereal",
    quantity: 1,
  },
  {
    id: 3,
    item: "pop-tarts",
    quantity: 1,
  },
];

// Middleware
router.use((req, res, next) => {
  console.log("Inside groceries Auth check Middleware");
  console.log("Midle groce", req.user); // req.user => biene de passport y passport local
  // if (req.session.user) next();
  if (req.user) next();
  else res.send(401);
});

// Routes
router.get("/", (req, res) => {
  res.cookie("visited", true, {
    maxAge: 60000, // 1m
  });
  res.send(groceryList);
});

router.post("/", (req, res) => {
  const { item, quantity } = req.body;
  const newGrocery = { id: groceryList.length + 1, item, quantity };
  groceryList.push(newGrocery);

  res.send(newGrocery);
});

// Route Parameters
// http://localhost:9000/api/groceries/3
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.cookies);
  const grocery = groceryList.find((item) => item.id === parseInt(id));

  res.status(200).json(grocery);
});

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;

  console.log("YOOOO", cart);

  if (!cart) {
    res.send("You have no cart session");
  } else {
    res.send(cart);
  }
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };

  const { cart } = req.session;

  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }

  res.send(201);
});

module.exports = router;
