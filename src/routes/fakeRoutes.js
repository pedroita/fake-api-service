const express = require("express");
const fakeController = require("../controllers/fakeController");
const router = express.Router();

router.get("/fake-endpoint", (req, res) => fakeController.getEncryptedUsers(req, res));
router.delete("/clear", (req, res) => fakeController.clearUsers(req, res));

module.exports = router;
