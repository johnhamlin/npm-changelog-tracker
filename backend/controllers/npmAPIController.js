// Syntax = URL/<package>
const URL = 'https://registry.npmjs.org/';
const githubRegex = /(git\+)|(git:\/\/)|((https?:\/\/)?github.com\/)|(.git)$/g;
const npmAPIController = {};

npmAPIController.getRepoOwnerAndName = async (req, res, next) => {
  try {
    const { package } = res.locals;
    // fetching GitHub URL from npm registry
    const npm = await (await fetch(`${URL}${package.name}`)).json();

    const urlString = npm.repository.url.replace(githubRegex, '');
    console.log(urlString);

    const [repoOwner, repoName] = urlString.split('/');

    package.repoOwner = repoOwner;
    package.repoName = repoName;
    package.github = npm.repository.url.replace(/^git\+/, '');

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

// OLD VERSION THAT HANDLES AN ARRAY OF INPUT
// try {
//   const { list } = res.locals.packages;

//   const promises = list.map(async package => {
//     // console.log('package ', package);

//     // package.npm = await (await fetch(`${URL}${package.name}`)).json();
//     const npm = await (await fetch(`${URL}${package.name}`)).json();
//     const urlString = npm.repository.url.replace(githubRegex, '');

//     const [repoOwner, repoName] = urlString.split('/');
//     console.log(repoOwner, repoName);

//     package.repoOwner = repoOwner;
//     package.repoName = repoName;

//     return package.npm;
//   });
//   await Promise.all(promises);

//   return next();
