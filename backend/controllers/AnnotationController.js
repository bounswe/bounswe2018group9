const mongoose = require("mongoose");
const Annotation = require("../models/Annotation");

function addAnnotation(req, res, next) {
  var annot = new Annotation(req.body);

  annot.save()
    .then((annot) => {
      res.status(200);
      res.send({annot});
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
};

module.exports = {addAnnotation};
