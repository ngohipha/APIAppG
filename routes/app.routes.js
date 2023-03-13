const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/product.controller");
const userController = require("../controllers/user.controller");
const sliderController = require("../controllers/slider.controller");
const relatedProductController = require("../controllers/related_product.controller");
const cartController = require("../controllers/cart.controller");
const { authenticateToken } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

// Create a new Product
router.post("/category", categoryController.create);

// Retrieve all Products
router.get("/category", categoryController.findAll);

// Retrieve a single Product with id
router.get("/category/:id", categoryController.findOne);

// Update a Product with id
router.put("/category/:id", categoryController.update);

//  Delete a Product with id
router.delete("/category/:id", categoryController.delete);

router.post("/product", productController.create);

// Retrieve all Products
router.get("/product", productController.findAll);

// Retrieve a single Product with id
router.get("/product/:id", productController.findOne);

// Update a Product with id
router.put("/product/:id", productController.update);

//  Delete a Product with id
router.delete("/product/:id", productController.delete);

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/slider", sliderController.create);

// Retrieve all Products
router.get("/slider", sliderController.findAll);

// Retrieve a single Product with id
router.get("/slider/:id", sliderController.findOne);

// Update a Product with id
router.put("/slider/:id", sliderController.update);

//  Delete a Product with id
router.delete("/slider/:id", sliderController.delete);

router.post("/relatedProduct", relatedProductController.create);
router.delete("/relatedProduct/:id", relatedProductController.delete);

router.post("/cart", [authenticateToken], cartController.create);
router.get("/cart", [authenticateToken], cartController.findAll);
router.delete("/cart", [authenticateToken], cartController.delete);

module.exports = router;
