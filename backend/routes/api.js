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
const changelogAPIController = require(path.join(
  CONTROLLERS_PATH,
  'changelogAPIController.js'
));

router.get(
  '/',
  databaseController.read,
  npmAPIController.getRepoOwnerAndName,
  changelogAPIController.get,
  (req, res) => {
    // console.log(res.locals.packages);

    const { packages } = res.locals;
    console.log('sending list of packages to the requestor');

    res.status(200).json(packages);
  }
);

router.post('/', databaseController.addPackage, (req, res) => {
  const { package } = res.locals;
  res.status(201).json(package);
});

module.exports = router;
