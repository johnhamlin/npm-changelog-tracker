const express = require('express');
const path = require('path');
const router = express.Router();
const CONTROLLERS_PATH = path.join(__dirname, '..', 'controllers');
const databaseController = require(path.join(
  CONTROLLERS_PATH,
  'databaseController.js'
));
const npmAPIController = require(path.join(
  CONTROLLERS_PATH,
  'npmAPIController.js'
));

router.get('/', databaseController.read, npmAPIController.get, (req, res) => {
  console.log(res.locals.packages);

  const { packages } = res.locals;
  console.log('sending data to the requestor');

  res.status(200).json(packages);
});

module.exports = router;
