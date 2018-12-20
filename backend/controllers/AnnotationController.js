const mongoose = require("mongoose");
const Annotation = require("../models/Annotation");
const _= require("lodash");

function getAnnotationsofPage(req,res,next)
{
  Annotation.find({"target.source": req.query.url})
  .exec()
  .then((annotations)=>{
    // Change this to full endpoint 
    let hrefPrefix = 'http://46.101.223.116/api/annotations/';
    let filteredAnnotations = _.map(annotations,(annotation) => {
      annotation.id = hrefPrefix + annotation._id;
      return annotation;
    });  
  
    let returnedAnnotations = _.map(filteredAnnotations,(annotation) => {
      return _.omit(annotation, ['_id']);
    });

    res.status(200);
    res.send({'annotations': returnedAnnotations});
  })
  .catch((err)=>{
      res.status(500);
      res.send(err);
  });

}

function addAnnotation(req, res, next) {
  var annot = new Annotation(req.body);
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

function updateAnnotation(req, res, next)
{
  var annotId=req.params.id;
  var newAnnot=req.body;

  newAnnot.modified=now();
  Annotation.findByIdAndUpdate(annotId,{ $set: newAnnot }, { new: true })
  .exec()
  .then((annot)=>{
    res.status(200);
    
    res.send({updatedAnnotation: annot})
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  });
}

function deleteAnnotation(req, res, next)
{
  let annotId = req.params.id;

  Annotation.findByIdAndRemove(annotId, (err,annot) => {
    if (err) {
      return res.status(500).send(err);
    }
    const response = {
      message: "Annotation is succesfully deleted.",
      annotation: annot
    }

    return res.status(200).send(response);
  });
}


module.exports = {
  addAnnotation,
  getAnnotation,
  updateAnnotation,
  deleteAnnotation,
  getAnnotationsofPage
};
