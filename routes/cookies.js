const express = require("express");
const router = express.Router();

const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieUpdate,
  cookieDelete
} = require("../controllers/cookieController");

// Cookie Create
router.post("/", cookieCreate);

// Cookie List
router.get("/", cookieList);

// Cookie Detail
router.get("/:cookieId", cookieDetail);

// Cookie Update
router.put("/:cookieId", cookieUpdate);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

module.exports = router;
