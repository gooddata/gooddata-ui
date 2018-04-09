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

class Versions extends React.Component {
  docUrl(doc, version) {
    const baseUrl = siteConfig.baseUrl;
    return baseUrl + 'docs/' + (version ? version + '/' : '') + doc;
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
                            <a href={this.docUrl('getting_started.html', version)}>Documentation</a>
                        </td>
                        {/*<td>*/}
                          {/*<a href={''}>Release Notes</a>*/}
                        {/*</td>*/}
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
                              <a href={this.docUrl('getting_started.html', version)}>Documentation</a>
                          </td>
                          {/*<td>*/}
                            {/*<a href={''}>Release Notes</a>*/}
                          {/*</td>*/}
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
                    <a href={this.docUrl('getting_started.html')}>Documentation</a>
                  </td>
                  {/*<td>*/}
                    {/*<a href={''}>Release Notes</a>*/}
                  {/*</td>*/}
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
