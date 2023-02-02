const changelogAPIController = {};

changelogAPIController.get = async (req, res, next) => {
  try {
    const { list } = res.locals.packages;
    return next();
  } catch (error) {
    next({
      log: `Express caught error in changelogAPIController.get. Err: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in changelogAPIController.get.' },
    });
  }
};

module.exports = changelogAPIController;
