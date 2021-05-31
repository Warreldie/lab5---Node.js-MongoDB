var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Messages" });
});
/* Add comment to test Heroku */
module.exports = router;
