//

const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authenticationMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authenticationMiddleware).get(dashboard); // private access
router.route("/login").post(login); // public access

module.exports = router;
