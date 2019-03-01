/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.gooddata.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'GoodData.UI' /* title for your website */,
  tagline: 'A powerful JavaScript library for building analytical applications',
  url: 'https://gooddata.github.io' /* your website url */,
  baseUrl: '/gooddata-ui/' /* base url for your project */,
  projectName: 'GoodData UI SDK',
  headerLinks: [
    {doc: 'about_gooddataui', label: 'Docs'},
    {doc: 'support_options', label: 'Support'},
    {href: 'https://gooddata-examples.herokuapp.com/', label: 'Live Examples'},
    {href: 'https://github.com/gooddata/gooddata-react-components/', label: 'GitHub', external: true}
  ],
  onPageNav: 'separate',
  users,
  /* path to images for header/footer */
  headerIcon: 'img/gooddata.svg',
  footerIcon: 'img/gooddata.svg',
  favicon: 'img/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#14B2E2',
    secondaryColor: '#205C3B',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' GoodData',
  organizationName: 'gooddata',
  projectName: 'gooddata-ui',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    '/gooddata-ui/js/toggleNav.js'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/gooddata/gooddata-react-components',
  gaTrackingId: 'UA-3766725-19',
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
  algolia: {
    apiKey: '96c60b7fb8c45e6d7598a7e4469d175d',
    indexName: 'gooddata'
  },
  twitter: 'true',
  twitterImage: 'img/metaimage.jpg',
  ogImage: 'img/metaimage.jpg',
  disableHeaderTitle: true
};

module.exports = 123;
