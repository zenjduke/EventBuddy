var express = require('express');
var router = express.Router();
var events = require('../models/index.js');




router.get("/:location/:category", function (req, res) {
  event.selectAll(req.params.location, req.params.category, function (eventList) {
    console.log(data);
    res.render("event-list", eventList);
  });
});

