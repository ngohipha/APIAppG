const categoryController = require("../controllers/categories.controller");
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

module.exports = router;