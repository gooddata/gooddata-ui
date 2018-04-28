---
id: cors
title: Prevent Cross-Origin Issues
sidebar_label: Prevent Cross-Origin Issues
copyright: (C) 2007-2018 GoodData Corporation
---

This article will show you how to prevent cross-origin issues (CORS) that would occur in the following scenario.

Your application runs on your local dev machine [https://localhost:3000](https://localhost:3000/) or on your production domain, but you need it to call the GoodData APIs from [https://secure.gooddata.com/gdc/](https://secure.gooddata.com/gdc/). 

Modern browsers do not permit this because of the security measure known as the [same-origin-policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

You have to prevent CORS restriction before you can develop or deploy your application.

## For your production domain

To request a CORS setup, submit your request via the [GoodData Support Portal](https://support.gooddata.com/hc/en-us). In your request, provide the following:

* The name of your GoodData domain
* URLs the you want to enable

### Example

If your white-labelled GoodData domain is `analytics.example.com` and your app is expected to be hosted at `https://smart-app.example.com/`, you can request CORS by submitting the following request:

```
To: support@gooddata.com

Subject: CORS origin setup for analytics.example.com

Hello GoodData Support team, could you please enable https://smart-app.example.com as CORS origins for the GoodData domain associated with https://analytics.example.com/ ?

Thank you.
```

If you know the exact name of your GoodData domain, provide it too.  Requesting additional URLs to enable API calls from a local machine during development is recommended. For example, `https://local.test:8443` \(you have to set up `local.test` as an alias for `localhost` because using the actual localhost is not allowed\).

## On your local dev machine

You can bypass this CORS restriction in this case because making a cross-origin request from a trusted application is safe. To bypass, set up a local proxy. The proxy will make the GoodData API accessible under the same hostname and port as your web application, that is, [https://localhost:3000/gdc/](https://localhost:3000/gdc/).

Using a proxy is a quick solution that allows you to immediately start using GoodData.UI. For a proper, production-ready, solution, see [How to Access the GoodData API Directly](ht_access_gd_api_directly.md) and set up access to the GoodData API.

To set up a proxy, add the following section to the root level of your `package.json` \(this works with any application started using `react-scripts start`\):

```javascript
"proxy": {
   "/gdc": {
      "changeOrigin": true,
      "cookieDomainRewrite": "localhost",
      "secure": false,
      "target": "https://secure.gooddata.com/"
   },
   "/*.html": {
      "changeOrigin": true,
      "secure": false,
      "target": "https://secure.gooddata.com/"
   }
},
```

The `/gdc` prefix refers to the GoodData APIs as they are hosted under [https://secure.gooddata.com/gdc](https://secure.gooddata.com/gdc). The `"secure: false"` section allows you to set up a proxy against your localhost server that may use a self-signed certificate.

In addition, proxying the `/*.html` pages allows you to easily establish a user session by logging in using the GoodData login page \(account.html\) and possibly invoke other GoodData actions that you may need during the development.

Your `package.json` should now look something like this \(the version numbers may differ\):

```javascript
{
   "name": "my-first-sba",
   "version": "0.1.0",
   "private": true,
   "proxy": {
      "/gdc": {
         "changeOrigin": true,
         "cookieDomainRewrite": "localhost",
         "secure": false,
         "target": "https://secure.gooddata.com/"
      },
      "/*.html": {
         "changeOrigin": true,
         "secure": false,
         "target": "https://secure.gooddata.com/"
      }
   },
   "dependencies": {
      "@gooddata/react-components": "^3.0.1",
      "react": "15.3.2",
      "react-dom": "15.3.2",
      "react-scripts": "1.0.10"
   },
   "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
   }
}
```
