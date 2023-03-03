const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/product.controller");
const userController = require("../controllers/user.controller");

const express = require('express');
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




module.exports = router;