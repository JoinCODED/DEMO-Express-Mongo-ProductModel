const express = require("express");
const router = express.Router();

const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieUpdate,
  cookieDelete
} = require("../controllers/cookieController");

router.post("/", cookieCreate);

router.get("/", cookieList);

router.get("/:cookieId", cookieDetail);

router.put("/:cookieId", cookieUpdate);

router.delete("/:cookieId", cookieDelete);

module.exports = router;
