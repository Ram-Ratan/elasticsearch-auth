const express = require("express");

const router = express.Router();

const indexController = require("../controllers/indexController");
const isAdmin = require("../middleware/isAdmin");




router.get("/listAllIndices",isAdmin,indexController.getAllIndex);
router.get("/:index",isAdmin,indexController.getIndex);
router.post("/:index",isAdmin,indexController.createIndex);
router.post("/delete/:index",isAdmin,indexController.deleteIndex);

module.exports = router;
