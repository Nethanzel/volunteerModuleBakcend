require('joi');

function ValidateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

function ValidateParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

function ValidateQuery(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

function ValidateFields(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.fields);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

function ValidateFiles(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.files);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

function ValidateHeader(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.headers);
    if (error) {
      return res.status(400).send({status: 400, message: error.details[0].message});
    }
    next();
  };
}

module.exports = {
  ValidateBody,
  ValidateParams,
  ValidateQuery,
  ValidateHeader,
  ValidateFields,
  ValidateFiles
}
