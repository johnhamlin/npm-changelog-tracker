const fs = require('fs').promises;
const path = require('path');

const models = require('../models/packagesModels.js');

const URL = path.join(__dirname, '..', 'data', 'packages-data.json');

const databaseController = {};

databaseController.read = async (req, res, next) => {
  try {
    console.log('Reading from the database...');

    const list = await models.Package.find();
    console.log('data read!');
    console.log(list);

    res.locals.list = list;
    return next();
  } catch (error) {
    next({
      log: `Express caught error in databaseControllers.read. Err: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in databaseControllers.read' },
    });
  }
};

databaseController.addPackage = async (req, res, next) => {
  try {
    const { name, version, repoOwner, repoName, github } = res.locals.package;

    if (!repoOwner || repoOwner === '' || !repoName || repoName === '') {
      return new Error(`Unable to find github associated with that package!`);
    }

    res.locals.newPackage = await models.Package.create({
      name,
      version,
      github,
      repoOwner,
      repoName,
    });

    console.log('New package created in database!');

    return next();
  } catch (error) {
    next({
      log: `Express caught error in databaseControllers.addPackage. Err: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in databaseControllers.addPackage' },
    });
  }
};

databaseController.deletePackage = async (req, res, next) => {
  try {
    console.log('got request to delete!');
    console.log(req.body);

    if (!req.body) return next();
    const { name, version } = req.body;
    console.log('Finding and deleting ', name, version);

    await models.Package.findOneAndDelete({ name, version });
    return next();
  } catch (error) {
    next({
      log: `Express caught error in databaseControllers.deletePackage. Err: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred in databaseControllers.deletePackage',
      },
    });
  }
};

module.exports = databaseController;
