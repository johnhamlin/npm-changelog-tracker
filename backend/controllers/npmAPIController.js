// Syntax = URL/<package>
const URL = 'https://registry.npmjs.org/';
const githubRegex = /(git\+)|((https?:\/\/)?github.com\/)|(.git)$/g;
const npmAPIController = {};

npmAPIController.get = async (req, res, next) => {
  try {
    const { list } = res.locals.packages;
    // console.log(list);

    const promises = list.map(async package => {
      // console.log('package ', package);

      // package.npm = await (await fetch(`${URL}${package.name}`)).json();
      const npm = await (await fetch(`${URL}${package.name}`)).json();
      const urlString = npm.repository.url.replace(githubRegex, '');

      const [repoOwner, repoName] = urlString.split('/');
      console.log(repoOwner, repoName);

      package.repoOwner = repoOwner;
      package.repoName = repoName;

      return package.npm;
      // console.log(package);
    });
    await Promise.allSettled(promises);

    // console.log(list);

    return next();
  } catch (error) {
    next({
      log: `Express caught error in npmAPIController.get. Err: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in npmAPIController.get.' },
    });
  }
};

module.exports = npmAPIController;
