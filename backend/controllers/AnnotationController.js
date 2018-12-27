const mongoose = require("mongoose");
const Annotation = require("../models/Annotation");
const _= require("lodash");
let hrefPrefix = 'http://46.101.223.116/api/annotations/';

function changeId(annotation)
{
  let orgId=annotation._id;
  let ret = _.omit(annotation.toObject(), ['_id']);
  ret.id=hrefPrefix+orgId;
  return ret;
}


function getAnnotationsofPage(req,res,next)
{
  let skipVar=0;
  let limitVar=10;
  if(req.query.skip)
  {
    skipVar=Number(req.query.skip);
  }
  if(req.query.limit)
  {
    limitVar=Number(req.query.limit);
  }
  Annotation.paginate({"target.source": req.query.url},{offset: skipVar, limit: limitVar})
  .then((result)=>{
   // let hrefPrefix = 'http://46.101.223.116/api/annotations/';
   let returnedAnnotations = _.map(result.docs,(annotation) => {
      return changeId(annotation);
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
  let annot = new Annotation(req.body);
  if(annot.target[0].selector){
    
    if(annot.target[0].selector.type === "TextPositionSelector"){
      if(annot.target[0].selector.start > annot.target[0].selector.end){
        res.status(500);
        res.send({
          err: 'TextPositionSelector.start should be <= TextPositionSelector.end'
        });
      }
    }
    else if(annot.target[0].selector.refinedBy){
      if(annot.target[0].selector.refinedBy.type === "TextPositionSelector"){
        
        if(annot.target[0].selector.refinedBy.start > annot.target[0].selector.refinedBy.end){
          res.status(500);
          res.send({
            err: 'TextPositionSelector.start should be <= TextPositionSelector.end'
          });
        }
      }
    }
  }
  annot.save()
  .then((annot) => {
    let ret=changeId(annot);
    res.status(201);
    res.send({ret});
  })
  .catch((err) => {
    res.status(500);
    res.send(err);
  });
};

function getAnnotation(req, res, next){
  let annotId = req.params.id;
  
  Annotation.findById(annotId)
  .exec()
  .then((annot)=>{
    let ret=changeId(annot);
    res.status(200);
    res.send(ret);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  });
}

function updateAnnotation(req, res, next)
{
  let annotId=req.params.id;
  let newAnnot=req.body;

  newAnnot.modified=now();
  Annotation.findByIdAndUpdate(annotId,{ $set: newAnnot }, { new: true })
  .exec()
  .then((annot)=>{
    let ret=changeId(annot);
    res.status(200);
    res.send(ret);
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

    return res.status(204).send(response);
  });
}


module.exports = {
  addAnnotation,
  getAnnotation,
  updateAnnotation,
  deleteAnnotation,
  getAnnotationsofPage
};
