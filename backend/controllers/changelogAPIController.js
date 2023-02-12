const changelogAPIController = {};
const axios = require('axios');
const URL = 'https://changelogs.md/api/github/';

// slow because promises can't run concurrently, but it works!
changelogAPIController.get = (req, res, next) => {
  console.log('getting changelog');
  const { list } = res.locals;
  res.locals.newList = [];

  // get the changelogs for every project
  Promise.all(
    list.map((npmPackage) => {
      const { name, version, repoOwner, repoName, github } = npmPackage;
      return axios
        .get(`${URL}${repoOwner.toLowerCase()}/${repoName.toLowerCase()}`)
        .then((response) => {
          const changes = filterOldChanges(
            npmPackage.version,
            response.data.contents
          );
          changes.latestVersion = response.data.contents[0].version;

          res.locals.newList.push({
            name,
            version,
            repoOwner,
            repoName,
            github,
            changes,
          });
        });
    })
  )
    .then(() => next())
    .catch((error) =>
      next({
        log: `Express caught error in changelogAPIController.get. Err: ${error.message}`,
        status: 500,
        message: { err: 'An error occurred in changelogAPIController.get.' },
      })
    );
};

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
  // default to version 1.0.0
  if (typeof versionStr !== 'string') return [1, 0, 0];
  return versionStr.split('.').map((numStr) => Number(numStr));
}

console.log(parseVersionNumber('1.10.18'));

module.exports = changelogAPIController;
