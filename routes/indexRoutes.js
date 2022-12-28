const express = require("express");

const router = express.Router();

const indexController = require("../controllers/indexController");

router.get("/listAllIndices",indexController.getAllIndex);
router.get("/:index",indexController.getIndex);
router.post("/:index",indexController.createIndex);
router.post("/delete/:index",indexController.deleteIndex);

module.exports = router;
