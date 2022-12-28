const express = require("express");
const router = express.Router();

const docController = require("../controllers/docController");

router.get("/:index",docController.getDoc);
router.post("/:index",docController.createDoc);
router.post("/delete/:index",docController.deleteDoc);
router.get("/search/:index",docController.searchDoc);
router.get("/:index/getAllDocs",docController.getAllDocs);
router.post("/search/:index",docController.searchByPost);
router.post("/update/:index",docController.updateDoc);


module.exports = router;


