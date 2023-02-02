const fs = require('fs').promises;
const path = require('path');

const URL = path.join(__dirname, '..', 'data', 'packages-data.json');

const databaseController = {};

databaseController.read = async (req, res, next) => {
  try {
    console.log('Reading from the database...');

    const data = await fs.readFile(URL, 'utf-8');
    console.log('data read!');

    res.locals.packages = JSON.parse(data);
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
    // pull package name and version off req.body
    res.locals.package = req.body;
    return next();
  } catch (error) {
    next({
      log: `Express caught error in databaseControllers.addPackage. Err: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in databaseControllers.addPackage' },
    });
  }
};

module.exports = databaseController;
