const express = require("express");
const router = express.Router();

const cookieController = require("../controllers/cookieController");

// Retrieve cookies list
router.get("/", cookieController.cookieList);

// Retrieve cookie detail
router.get("/:cookieId", cookieController.cookieDetail);

// Create a new cookie
router.post("/", cookieController.cookieCreate);

// Update an existing cookie
router.put("/:cookieId", cookieController.cookieUpdate);

// Delete an existing cookie
router.delete("/:cookieId", cookieController.cookieDelete);

module.exports = router;
