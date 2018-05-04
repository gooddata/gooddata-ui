---
title: Configure a Webpack Proxy
sidebar_label: Configure a Webpack Proxy
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.0.0-ht_configure_webpack_proxy
original_id: ht_configure_webpack_proxy
---

When you are developing smart business applications using the GoodData platform, you have to set up a secure connection from your localhost to the GoodData server. One of the ways how you can do that is using the Webpack dev server with a proxy.

Using the Webpack dev server with a proxy is recommended for your **local** development. Your **production** version must run from a whitelisted domain using a CORS request and without a proxy.

Using the Webpack dev server with a proxy does the following:

* Redirects all your /gdc traffic to the domain set by the `--env.gdc` parameter \(defaults to `https://secure.gooddata.com/` \).
* Redirects all /\*.html requests to the GoodData server. You need this to be able to log in to the platform at [https://secure.gooddata.com/account.html](https://secure.gooddata.com/account.html).
 
The other redirects handle files on the /account.html page \(such as styles and images\). Make sure those proxy rules are not in conflict with your application routes.

Servers other than secure.gooddata.com may need signed certificates and may still refuse to connect. In that case, prepend your `package.json` script with the `NODE_TLS_REJECT_UNAUTHORIZED=0` node variable as follows:

`NODE_TLS_REJECT_UNAUTHORIZED=0 webpack-dev-server --https --env.gdc=https://secure.gooddata.com/`

## Setup

This is a sample script that you can add into your `package.json` file to start a webpack dev server with a proxy to https://secure.gooddata.com/.

Add the following to your `package.json` file:
`webpack-dev-server --https --env.gdc=https://secure.gooddata.com/`

* HTTPS is required for SSL.
* `The env.gdc`  parameter passes the server address to your `webpack.config.js`.

```javascript
"scripts": {"dev":"webpack-dev-server --https --env.gdc="https://secure.gooddata.com/"]},
```

`webpack.config.js`:

```javascript
module.exports = function({ gdc = "https://secure.gooddata.com/" }) {
 
  return {
    ...
    devServer: {
      ...
      proxy: {
        "/gdc": {
          "changeOrigin": true,
          "cookieDomainRewrite": "localhost",
          "target": gdc,
          onProxyReq: proxyReq => {
            // Browers may send Origin headers even with same-origin
            // requests. To prevent CORS issues, we have to change
            // the Origin to match the target URL.
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', gdc);
            }
          }
        },
        /* these are only needed for https://localhost:####/account.html to work properly */
        "/packages": {
          "changeOrigin": true,
          "cookieDomainRewrite": "localhost",
          "target": gdc
        },
        "/lib": {
          "changeOrigin": true,
          "cookieDomainRewrite": "localhost",
          "target": gdc
        },
        "/images": {
          "changeOrigin": true,
          "cookieDomainRewrite": "localhost",
          "target": gdc
        },
        "/*.html": {
          "cookieDomainRewrite": "localhost",
          "changeOrigin": true,
          "secure": false,
          "target": gdc
        }
      }
    }
  }
};
```
