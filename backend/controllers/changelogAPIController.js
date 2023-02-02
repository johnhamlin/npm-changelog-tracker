const changelogAPIController = {};
const axios = require('axios');
const { patch } = require('../routes/api');
const URL = 'https://changelogs.md/api/github/';

// slow because promises can't run concurrently, but it works!
changelogAPIController.get = async (req, res, next) => {
  console.log('getting changelog');
  const { list } = res.locals.packages;

  for (const package of list) {
    const response = await axios.get(
      `${URL}${package.repoOwner}/${package.repoName}`
    );
    package.changes = filterOldChanges(package.version, response.data.contents);
    console.log(res);

    package.changes.latestVersion = response.data.contents[0].version;
  }
  return next();
};

// const promises = list.map(package => {
//   // console.log(`Repo Owner: ${package.repoOwner}
//   //   Package Name: ${package.repoName}`);

//   // TODO: This code doesn't handle errors if it doesn't get JSON from the server like it expects
//   axios
//     .get(`${URL}${package.repoOwner}/${package.repoName}`)
//     .then(response => {
//       // console.log(response.data);
//       package.data = response.data;
//       console.log('stuff here');

//       return response;
//     });

//   // const changelog = JSON.parse(changelogJSON);

//   // console.log(changelog);
// });
// console.log(promises);

// Promise.all(promises).then(data => {
//   console.log(data);
//   return next();
// });

// .catch (error => {
// next({
//   log: `Express caught error in changelogAPIController.get. Err: ${error.message}`,
//   status: 500,
//   message: { err: 'An error occurred in changelogAPIController.get.' },
// };

//   try {
//     const { list } = res.locals.packages;

//     await list.map(async package => {
//       console.log(`Repo Owner: ${package.repoOwner}
//       Package Name: ${package.repoName}`);

//       // TODO: This code doesn't handle errors if it doesn't get JSON from the server like it expects
//       const response = axios.get(
//         `${URL}${package.repoOwner}/${package.repoName}`
//       );
//       console.log(response.data);

//       // const changelog = JSON.parse(changelogJSON);

//       package.data = 'anything';
//       console.log('stuff here');
//       // console.log(changelog);
//       return response.data;
//     });

//     return next();
//   } catch (error) {
//     next({
//       log: `Express caught error in changelogAPIController.get. Err: ${error.message}`,
//       status: 500,
//       message: { err: 'An error occurred in changelogAPIController.get.' },
//     });
//   }
// };

function filterOldChanges(version, changelog) {
  const newChanges = {
    changelog: [],
    wereThereChanges: {
      major: false,
      minor: false,
      patch: false,
    },
  };
  const [myMajor, myMinor, myPatch] = parseVersionNumber(version);
  console.log(changelog);

  for (const update of changelog) {
    const [updateMajor, updateMinor, updatePatch] = parseVersionNumber(
      update.version
    );

    if (updateMajor > myMajor) {
      newChanges.wereThereChanges.major = true;
      newChanges.changelog.push(update);
    } else if (updateMinor > myMinor) {
      newChanges.wereThereChanges.minor = true;
      newChanges.changelog.push(update);
    } else if (updatePatch > myPatch) {
      newChanges.wereThereChanges.patch = true;
      newChanges.changelog.push(update);
    } else {
      break;
    }
  }
  return newChanges;
}

/**
 * It takes a string like "1.2.3" and returns an array of numbers like [1, 2, 3]
 * @param versionStr - The version string to parse.
 * @returns An array of numbers.
 */
function parseVersionNumber(versionStr) {
  return versionStr.split('.').map(numStr => Number(numStr));
}

console.log(parseVersionNumber('1.10.18'));

module.exports = changelogAPIController;
