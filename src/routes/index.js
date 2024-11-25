var express = require("express");
var router = express.Router(express);

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;