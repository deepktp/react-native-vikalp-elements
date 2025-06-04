import path from 'path';
import fs from 'fs';
import semver from 'semver';
import inquirer from 'inquirer';
import { recommendVersion, updateChangelog } from '@lerna/conventional-commits';

const rootPath = path.resolve(__dirname, '../..');
const pkgRootPath = path.resolve(rootPath, 'packages');

const websiteRootPath = path.resolve(rootPath, 'website');

type TPkg = {
  name: string;
  version: string;
  location: string;
  manifestLocation: string;
};

const pkgScope = '@rn-vui';

class Release {
  static async bump(pkg: TPkg) {
    //reading package.json file
    const manifest = JSON.parse(fs.readFileSync(pkg.manifestLocation, 'utf8'));

    //version before version bump;
    const oldVersion = manifest.version;
    //updating version in package.json file
    manifest.version = pkg.version;

    //if package is themed, add @rn-vui/base as a devDependency and peerDependency and update its version
    if (pkg.name === 'themed') {
      manifest.devDependencies['@rn-vui/base'] = pkg.version;
      manifest.peerDependencies['@rn-vui/base'] = pkg.version;
    }
    if (pkg.name === 'base') {
      await this.updateWebsiteDocs(oldVersion, pkg.version);
    }

    //write the updated package.json file with the 2 spaces indentation
    fs.writeFileSync(pkg.manifestLocation, JSON.stringify(manifest, null, 2));
    await updateChangelog(pkg, 'independent', {
      changelogPreset: 'conventional-changelog-angular',
      rootPath,
      tagPrefix: 'v',
      version: pkg.version,
    });
  }

  static async updateWebsiteDocs(
    oldVersion: string,
    newVersion: string
  ): Promise<void> {
    //first confirm that user has updated the website docs else stop this process completely
    const confirm = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Have you updated the website docs for version ${newVersion}?`,
    });

    if (!confirm.confirm) {
      console.log('Please update the website docs before proceeding.');
      process.exit(1);
    }

    //update website docs
    // if version bump is patch then update the version
    // is version bump is minor or major then create new version on website

    if (semver.diff(oldVersion, newVersion) === 'patch' || semver.diff(oldVersion, newVersion) === 'minor') {
      //need to rename website/versioned_docs/version-${oldVersion} to website/versioned_docs/version-${newVersion}
      const oldVersionPath = path.resolve(
        websiteRootPath,
        `versioned_docs/version-${oldVersion}`
      );
      const newVersionPath = path.resolve(
        websiteRootPath,
        `versioned_docs/version-${newVersion}`
      );

      if (fs.existsSync(oldVersionPath)) {
        fs.renameSync(oldVersionPath, newVersionPath);
        console.log(
          `Updated website docs from version ${oldVersion} to ${newVersion}`
        );
      } else {
        console.error(
          `Old version path ${oldVersionPath} does not exist. Please check the path.`
        );
      }

      //copy all files and folders from website/docs to website/versioned_docs/version-${newVersion}
      const docsPath = path.resolve(websiteRootPath, 'docs');

      if (fs.existsSync(docsPath)) {
        fs.readdirSync(docsPath).forEach((file) => {
          const srcPath = path.resolve(docsPath, file);
          const destPath = path.resolve(newVersionPath, file);
          if (fs.lstatSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            fs.readdirSync(srcPath).forEach((subFile) => {
              fs.copyFileSync(
                path.resolve(srcPath, subFile),
                path.resolve(destPath, subFile)
              );
            });
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
        console.log(`Copied docs to versioned_docs/version-${newVersion}`);
      } else {
        console.error(
          `Docs path ${docsPath} does not exist. Please check the path.`
        );
      }

      // update the version in website/versioned_sidebars/version-${oldVersion}-sidebars.json to website/versioned_sidebars/version-${newVersion}-sidebars.json
      const sidebarsPath = path.resolve(
        websiteRootPath,
        `versioned_sidebars/version-${oldVersion}-sidebars.json`
      );
      const newSidebarsPath = path.resolve(
        websiteRootPath,
        `versioned_sidebars/version-${newVersion}-sidebars.json`
      );

      if (fs.existsSync(sidebarsPath)) {
        fs.renameSync(sidebarsPath, newSidebarsPath);
        console.log(
          `Updated sidebars from version ${oldVersion} to ${newVersion}`
        );
      } else {
        console.error(
          `Sidebars path ${sidebarsPath} does not exist. Please check the path.`
        );
      }

      // lastly update website/versions.json array

      const versionsPath = path.resolve(websiteRootPath, 'versions.json');

      if (fs.existsSync(versionsPath)) {
        const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
        // check if oldVersion already exists in versions array and then update it to newVersion
        const index = versions.findIndex(
          (version: string) => version === oldVersion
        );
        if (index !== -1) {
          versions[index] = newVersion;
        } else {
          // if oldVersion does not exist, add new version to the array
          versions.unshift(newVersion);
        }
        // write the updated versions array to versions.json
        fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2));
      } else {
        console.error(
          `Versions path ${versionsPath} does not exist. Please check the path.`
        );
      }
    } else if (semver.diff(oldVersion, newVersion) === 'major') {

      //if major version bump then create new version on website
      const newVersionPath = path.resolve(
        websiteRootPath,
        `versioned_docs/version-${newVersion}`
      );
      const newSidebarsPath = path.resolve(
        websiteRootPath,
        `versioned_sidebars/version-${newVersion}-sidebars.json`
      );
      const docsPath = path.resolve(websiteRootPath, 'docs');
      //create new versioned_docs/version-${newVersion} and versioned_sidebars/version-${newVersion}-sidebars.json
      if (!fs.existsSync(newVersionPath)) {
        fs.mkdirSync(newVersionPath, { recursive: true });
        console.log(`Created new versioned_docs/version-${newVersion}`);
      }
      if (!fs.existsSync(newSidebarsPath)) {
        fs.writeFileSync(newSidebarsPath, '{}');
        console.log(`Created new versioned_sidebars/version-${newVersion}-sidebars.json`);
      }
      //copy all files and folders from website/docs to website/versioned_docs/version-${newVersion}
      if (fs.existsSync(docsPath)) {
        fs.readdirSync(docsPath).forEach((file) => {
          const srcPath = path.resolve(docsPath, file);
          const destPath = path.resolve(newVersionPath, file);
          if (fs.lstatSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            fs.readdirSync(srcPath).forEach((subFile) => {
              fs.copyFileSync(
                path.resolve(srcPath, subFile),
                path.resolve(destPath, subFile)
              );
            });
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
        console.log(`Copied docs to versioned_docs/version-${newVersion}`);
      } else {
        console.error(
          `Docs path ${docsPath} does not exist. Please check the path.`
        );
      }
      // update the version in website/versioned_sidebars/version-${newVersion}-sidebars.json to website/versioned_sidebars/version-${newVersion}-sidebars.json
      const sidebarsPath = path.resolve(
        websiteRootPath,
        `versioned_sidebars/version-${newVersion}-sidebars.json`
      );
      if (fs.existsSync(sidebarsPath)) {
        fs.writeFileSync(sidebarsPath, '{}');
        console.log(
          `Created new versioned_sidebars/version-${newVersion}-sidebars.json`
        );
      } else {
        console.error(
          `Sidebars path ${sidebarsPath} does not exist. Please check the path.`
        );
      }
      // lastly update website/versions.json array
      const versionsPath = path.resolve(websiteRootPath, 'versions.json');
      if (fs.existsSync(versionsPath)) {
        const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
        // check if current already exists in versions array and then skip else add new version
        const index = versions.findIndex(
          (version: string) => version === newVersion
        );
        if (index !== -1) {
          return;
        } else {
          // if oldVersion does not exist, add new version to the array
          versions.unshift(newVersion);
        }
        // write the updated versions array to versions.json
        fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2));
      } else {
        console.error(
          `Versions path ${versionsPath} does not exist. Please check the path.`
        );
      }
    }
  }

  static async recommendVersion(pkg: TPkg): Promise<string> {
    return recommendVersion(pkg, 'independent', {
      changelogPreset: 'conventional-changelog-angular',
      rootPath,
      tagPrefix: 'v',
      prereleaseId: '',
    });
  }

  static async getVersion(): Promise<TPkg[]> {
    const pkgs: TPkg[] = [];
    const pkgPath = fs.readdirSync(pkgRootPath);
    for (const pkg of pkgPath) {
      const location = path.resolve(pkgRootPath, pkg);
      const manifestLocation = path.resolve(location, 'package.json');
      if (!fs.existsSync(manifestLocation)) {
        continue;
      }
      const { version } = JSON.parse(fs.readFileSync(manifestLocation, 'utf8'));
      const recommendedVersion = await this.recommendVersion({
        name: pkg,
        version,
        location,
        manifestLocation,
      });
      console.log(
        ` - ${pkgScope}/${pkg}:  ${version} => ${recommendedVersion}`
      );
      pkgs.push({
        name: pkg,
        version,
        location,
        manifestLocation,
      });
    }
    console.log();
    return pkgs;
  }

  static questions({ name, version }: TPkg): inquirer.QuestionCollection {
    return [
      {
        type: 'list',
        name: name,
        message: `${pkgScope}/${name} `,
        choices: [
          {
            name: 'major ' + semver.inc(version, 'major'),
            value: semver.inc(version, 'major'),
          },
          {
            name: 'minor ' + semver.inc(version, 'minor'),
            value: semver.inc(version, 'minor'),
          },
          {
            name: 'patch ' + semver.inc(version, 'patch'),
            value: semver.inc(version, 'patch'),
          },
          'premajor',
          'preminor',
          'prepatch',
          'prerelease',
        ],
        suffix: version,
      },
      {
        askAnswered: true,
        when(answers) {
          return answers[name].startsWith('pre');
        },
        name: name,
        message: ' ',
        suffix: 'prerelease',
        type: 'list',
        choices: (ans) => [
          semver.inc(version, ans[name], 'alpha'),
          semver.inc(version, ans[name], 'beta'),
          semver.inc(version, ans[name], 'rc'),
          semver.inc(version, ans[name]),
          'manual',
        ],
      },
      {
        askAnswered: true,
        when(answers) {
          return answers[name] === 'manual';
        },
        name: name,
        validate: (input) => {
          return Boolean(semver.valid(input)) || 'Invalid version';
        },
        message: ' ',
        suffix: 'manual',
        type: 'input',
      },
    ];
  }
}

async function main() {
  const pkgs = await Release.getVersion();
  const prompts = pkgs.map(Release.questions).flat();

  inquirer
    .prompt([
      ...prompts,
      { type: 'confirm', name: 'confirm', message: 'confirm' },
    ])
    .then((versions) => {
      pkgs.forEach((pkg) => {
        if (!semver.gt(versions[pkg.name], pkg.version)) {
          throw Error(
            pkg.name + ' version is not greater than current version'
          );
        }
        pkg.version = versions[pkg.name];
        Release.bump(pkg);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
main();

console.log('Remember to exec `yarn` to update yarn.lock ');
