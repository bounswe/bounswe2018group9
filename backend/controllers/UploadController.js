const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const IncomingForm = require('formidable').IncomingForm;
const config = require('../config');

const User = require('../models/User');
const Event = require('../models/Event');

function getModel(str) {
  if (str.localeCompare('User') === 0) return User;
  if (str.localeCompare('Event') === 0) return Event;
  return null;
}

function validateField(model, field) {
  return model.schema.obj.hasOwnProperty(field);
}

function upload(req, res, next) {
  // TODO:
  // 1. Check whether user is authorized to edit the referent
  // 2. Integrate type of the received file to the pipeline
  // 3. Delete files whence the referent is removed or referent removes the file (hooks)
  // 4. Update the referent object


  var form = new IncomingForm({
    uploadDir: config.tempFolder,
    keepExtensions: true
  });
  form.parse(req, function (err, fields, files) {
    if (err) next(err);

    // Rename and move files
    let map = {};
    for (file in files) {
      let name = uuid.v4() + files[file].name.substr(files[file].name.indexOf('.'));
      map[file] = name;
      fs.renameSync(files[file].path, config.staticFolder + '/' + name);
    }

    // Return mapped file names
    return res.status(200).send(map);

    /*
    // Validate fields existence
    if (!fields.id) return res.status(400).send('ID field is missing!');
    if (!fields.model) return res.status(400).send('Model field is missing!');
    if (!fields.field) return res.status(400).send('Field field is missing!');

    // Validate model and field
    let model = getModel(fields.model);
    let field = fields.field;
    if (!model) return res.status(400).send('Invalid model');
    if (!validateField(model, field)) return res.status(400).send('Invalid field');

    // TODO: Check user authorization here!

    // Validate existence of object
    model.findById(fields.id)
      .exec()
      .then((doc) => {
        if (!doc) return res.status(404).send('Not found');

        // Rename and move files
        let map = {};
        for (file in files) {
          let name = uuid.v4() + files[file].name.substr(files[file].name.indexOf('.'));
          map[file] = name;
          fs.renameSync(files[file].path, config.staticFolder + '/' + name);
        }

        // TODO: Update the object!

        // Return mapped file names
        return res.status(200).send(map);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
    */
  });
}

function remove(files, next) {
  files.forEach(file => {
    fs.unlink(config.staticFolder + '/' + file);
  });
}

module.exports = {
  upload,
  remove
};