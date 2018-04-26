/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const CWD = process.cwd();

const siteConfig = require(CWD + '/siteConfig.js');
const versions = require(CWD + '/versions.json');

function getStableVersions(versions) {
  return versions.filter(v => v.split('-').length === 1);
}

function getLatestStable(versions) {
  return versions.filter(v => v.split('-').length === 1)[0];
}

function getVersionsOfType(type, versions) {
  return versions.filter(v => {
    const versionSplit = v.split('-');
    
    return versionSplit.length >= 2 && versionSplit[1] === type;
  })
}

function getLatest(type, versions) {
  return getVersionsOfType(type, versions)[0];
}

function parseVersionToNumber(version) {
  return parseInt(version.replace(/\D/g,''));
}

class Versions extends React.Component {
  docUrl(doc, version) {
    const baseUrl = siteConfig.baseUrl;
    return baseUrl + 'docs/' + (version ? version + '/' : '') + doc;
  }

  renderChangelog(version) {
    const majorVersion = parseInt(version.split('.')[0]);
    const versionNumber = parseVersionToNumber(version);
    if (majorVersion && majorVersion >= 5) {
      return (
        <td>
          <a href={`https://github.com/gooddata/gooddata-react-components/blob/release/CHANGELOG.md#${versionNumber}`}>Changelog</a>
        </td>
      );
    }

    return (<td>&mdash;</td>);
  }

  renderMigrationGuide(version) {
    const semVer = version.split('.');
    const majorVersion = parseInt(semVer[0]);
    const minorVersion = parseInt(semVer[1]);
    const patchVersion = parseInt(semVer[2]);

    if (minorVersion === 0 && patchVersion === 0 && majorVersion > 4) {
      return (
        <td>
          <a href={this.docUrl(`migration_guide_${majorVersion}.html`, '')}>Migration Guide</a>
        </td>
      );
    }

    return (<td>&mdash;</td>);
  }

  renderStableVersions() {
    const stableVersions = getStableVersions(versions);
    const latestVersion = stableVersions[0];
    if (stableVersions.length > 1) {
      return (
        <div>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
              <tbody>
                {stableVersions.map(
                  (version, i) =>
                    version !== latestVersion && (
                      <tr key={i}>
                        <th>{version}</th>
                        <td>
                            <a href={this.docUrl('about_gooddataui.html', version)}>Documentation</a>
                        </td>
                        { this.renderChangelog(version) }
                        { this.renderMigrationGuide(version) }
                      </tr>
                    )
                )}
              </tbody>
            </table>
        </div>
      );
    }

    return null;
  } 

  renderPreReleaseVersions() {
    const preReleaseVersions = getVersionsOfType('alpha', versions);

    if (preReleaseVersions > 0) {
      return (
        <div>
          <h3 id="rc">Pre-release versions</h3>
              <table className="versions">
                <tbody>
                {preReleaseVersions.map(
                    (version, i) =>
                      version !== latestVersion && (
                        <tr key={i}>
                          <th>{version}</th>
                          <td>
                              <a href={this.docUrl('about_gooddataui.html', version)}>Documentation</a>
                          </td>
                          { this.renderChangelog(version) }
                          { this.renderMigrationGuide(version) }
                        </tr>
                      )
                  )}
                </tbody>
              </table>
        </div>
      )
    }

    return null;
  }


  render() {
    const latestVersion = getLatestStable(versions);
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + ' Versions'}</h2>
            </header>
            <h3 id="latest">Current version (Stable)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <a href={this.docUrl('about_gooddataui.html')}>Documentation</a>
                  </td>
                  { this.renderChangelog(latestVersion) }
                  { this.renderMigrationGuide(latestVersion) }
                </tr>
              </tbody>
            </table>
            <h3 id="latest">Next version (Pre-release)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>next</th>
                  <td>
                    <a href={this.docUrl('about_gooddataui.html', 'next')}>Documentation</a>
                  </td>
                </tr>
              </tbody>
            </table>
            {this.renderPreReleaseVersions()}
            {this.renderStableVersions()}
            <p>
              You can find past versions of this project{' '}
              <a href="https://github.com/gooddata/gooddata-react-components/releases"> on GitHub </a>.
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Versions;
