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
  changelogAPIController.get,
  (req, res) => {
    // console.log(res.locals.packages);

    const { newList } = res.locals;
    console.log('sending list of packages to the requestor');
    console.log(newList);

    res.status(200).json(newList);
  }
);

router.post(
  '/',
  (req, res, next) => {
    res.locals.package = req.body;
    console.log('attempting to add:', res.locals.package);

    return next();
  },
  npmAPIController.getRepoOwnerAndName,
  databaseController.addPackage,
  (req, res) => {
    const { newPackage } = res.locals;
    res.status(201).json(newPackage);
  }
);

router.delete('/', databaseController.deletePackage, (req, res) => {
  // console.log(res.locals.packages);

  res.status(200).end('deleted');
});

module.exports = router;
