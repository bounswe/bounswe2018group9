const mongoose = require("mongoose");
const Annotation = require("../models/Annotation");

function addAnnotation(req, res, next) {
  var annot = new Annotation(req.body);
  console.log(JSON.stringify(annot.target[0].selector.refinedBy.start));
  if(annot.target[0].selector)
  {
    if(annot.target[0].selector.type==="TextPositionSelector")
    {
      if(annot.target[0].selector.start>annot.target[0].selector.end)
      {
        res.status(500);
        res.send("TextPositionSelector.start should be <= TextPositionSelector.end");
      }
    }
    else if(annot.target[0].selector.refinedBy)
    {
      if(annot.target[0].selector.refinedBy.type==="TextPositionSelector")
      {
        if(annot.target[0].selector.refinedBy.start>annot.target[0].selector.refinedBy.end)
        {
          res.status(500);
          res.send("TextPositionSelector.start should be <= TextPositionSelector.end");
        }
      }
    }
  }
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

function getAnnotation(req, res, next)
{
  var annotId=req.params.id;
  Annotation.findById(annotId)
  .exec()
  .then((annot)=>{
    res.status(200);
    res.send(annot)
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  });
}



module.exports = {
  addAnnotation,
  getAnnotation
};
