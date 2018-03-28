---
title: Create Your First Visualization with GoodData UI SDK
sidebar_label: Create Your First Visualization with GoodData UI SDK
copyright: (C) 2007-2018 GoodData Corporation
id: ht_create_your_first_visualization
---

This tutorial will guide you through the process of creating your first smart application using Facebook’s `create-react-app` tool and will show you the GoodData UI SDK in action.

When you complete this tutorial, you will be able to display various measures and charts from the [GoodSales demo project](https://secure.gooddata.com/#s=/gdc/projects/la84vcyhrq8jwbu4wpipw66q2sqeb923%7CprojectDashboardPage%7C/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/33807%7Caa0fb2c4d399) within the context of your React application.

## Prerequisites

To successfully complete this tutorial, you are required to:

* Be familiar with the modern JavaScript ecosystem
* Have `node.js` and `yarn` installed in your development environment. If you do not have these tools installed, you can get them from [https://nodejs.org/](https://nodejs.org/) \(install first\) and [https://yarnpkg.com/](https://yarnpkg.com/) respectively.
* Have an account on the GoodData platform. If you do not have a GoodData account yet, [create a trial one](https://secure.gooddata.com/account.html?lastUrl=%252F#/registration/projectTemplate/urn%253Agooddata%253AOnboardingProductTour).

The supported version of TypeScript is 2.3+.

The supported version of React is 15.3.2.

## Step 1. Get create-react-app

Run the following command from the command line:

```bash
yarn global add create-react-app
```

This command installs the `create-react-app` tool that will help you create a functional skeleton of a React application.

## Step 2. Create your React application

1. Run the following command from the command line:

```bash
create-react-app my-first-sba
```

   This command creates a directory named `my-first-sba` with a functional skeleton of a React application. You can see the command output that looks something like the following:

```bash
Success! Created my-first-sba at /Users/user-name/local/src/ui-sdk/my-first-sba
Inside that directory, you can run several commands:
 
   yarn start
     Starts the development server.
 
   yarn build
     Bundles the app into static files for production.
 
   yarn test
     Starts the test runner.
 
   yarn eject
     Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!
 
We suggest that you begin by typing:
 
  cd my-first-sba
  yarn start
 
Happy hacking!
```

2. Change your current working directory to `my-first-sba` \(for example, by running `cd my-first-sba` on Mac or Linux\).

3. As the current version of `create-react-app` installs React 16 while the GoodData UI SDK requires React 15.3.2, downgrade your version of React to 15.3.2 by running the following command:

```bash
yarn install
yarn upgrade react@15.3.2 react-dom@15.3.2
```

## Step 3. Add GoodData SDK dependencies

Run the following command from the command line:

```bash
yarn add @gooddata/react-components
```

This command adds `@gooddata/react-components` to the list of your project dependencies in `package.json` and downloads all required packages.

## Step 4. Prevent cross-origin issues

Your local application runs at [https://localhost:3000](https://localhost:3000/) but you need it to call the GoodData APIs from [https://secure.gooddata.com/gdc/](https://secure.gooddata.com/gdc/). Modern browsers do not permit this because of the security measure known as the [same-origin-policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

You can bypass this restriction in this case because making a cross-origin request from a trusted application is safe. To bypass, set up a local proxy. The proxy will make the GoodData API accessible under the same hostname and port as your web application, that is, [https://localhost:3000/gdc/](https://localhost:3000/gdc/).

Using a proxy is a quick solution that allows you to immediately start with the GoodData UI SDK. For a proper production-ready solution, see [How to Access the GoodData API Directly](ht_access_gd_api_directly.md)and set up access to the GoodData API.

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

## Step 5. Start the development server

Run the following command from the command line:

* If you are on Mac or Linux:

```bash
HTTPS=true yarn start
```

* If you are on Windows:

```bash
set HTTPS=true&&npm start
```

Always run your local development server using HTTP**S** because the GoodData API responses set cookies with the `secure` flag. Specifically, it means thatif you skip the `HTTPS=true` part,you will not be able to log in.

## Step 6. Establish a session

Open [https://localhost:3000/account.html](https://localhost:3000/account.html) in your browser, and enter your GoodData credentials.

You are now logged in to GoodData.

If you see a warning about an insecure connection due to using a self-signed certificate, ignore it: you can trust your localhost.

For the purpose of this tutorial, you are asked to establish a client session by simply logging in to GoodData.

In your production environment, your end users may be authenticated using single sign-on. This case will be covered in a different tutorial.

## Step 7. Add GoodData components 

Open [https://localhost:3000/](https://localhost:3000/) in your browser.

The default page generated by the create-react-app tool is displayed looking something like the following:

![Welcome to React](assets/Welcome_to_React.png)

Start with adding the first GoodData component:

1. Open `src/App.js` in a text editor.

2. Add the following line to the other `import`'s at the beginning of the `App.js` file:

```javascript
import { Kpi } from '@gooddata/react-components';
```

3. Add the following line to the other `import`'s at the beginning of the `App.js` file to load CSS:

```javascript
import '@gooddata/react-components/styles/css/main.css';
```

4. Add the following lines somewhere under the `<div>` element returned by the `render()` method of the App component:

```javascript
<Kpi
projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
measure="atSHqCtAePe4" />
```

Save the changes. The content of your `App.js` file should now look something like the following:

```javascript
import React, { Component } from 'react';
import { Kpi } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';
 
import logo from './logo.svg';
import './App.css';
class App extends Component {
   render() {
      return (
         <div className="App">
            <div className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <h2>Welcome to React</h2>
            </div>
            <Kpi
               projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
               measure="atSHqCtAePe4" />
            <p className="App-intro">
               To get started, edit <code>src/App.js</code> and save to reload.
            </p>
         </div>
      );
   }
}
 
export default App;
```

Go back to your browser window. The default page now looks like the following:

![Welcome to GoodData components](assets/Welcome_to_React_GoodData_component.png)

Notice the KPI number that you have added.

## Step 8. Keep your code clean

The GoodData UI SDK provides a tool named [gdc-catalog-export](gdc-catalog-export.md) that can help you keep the list of object identifiers organized in a Javascript file within your application.

For example, let’s take a look at the following component used in this tutorial:

```javascript
<Kpi
   projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
   measure="atSHqCtAePe4" />
```

In this component, `projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"` is a hardcoded reference to the GoodSales demo project ID, and `measure="atSHqCtAePe4"` is a hardcoded reference to the measure named `Avg Deal Size`.

With the [gdc-catalog-export](gdc-catalog-export) tool, you can serialize the list of all measures, attributes and other relevant objects from your project.

To install the tool, run the following command from the command line:

```bash
yarn global add gdc-catalog-export
```

Once you have installed the tool, do the following:

1. Make sure that you are in the root folder of your app, and run the following command:

```bash
$ gdc-catalog-export--project-idla84vcyhrq8jwbu4wpipw66q2sqeb923 --username <your-gooddata-username> --password <your-password> --output src/catalog.json
```

   The `src/catalog.json` file becomes a JSON file in your application.

```javascript
{
  "metrics": {
    "_Close [BOP]": {
      "identifier": "aaeb7jTCfexV",
      "tags": ""
    },
    "_Snapshot [BOP]": {
      "identifier": "aazV2yX2gz2z",
      "tags": ""
    },
...
```

2. Import the `catalog.json` file into your `App.js` file.
   You can now reference the measure using its human-readable alias \(`Avg Deal Size`\) instead of its identifier \(`atSHqCtAePe4`\). Your new `App.js` file would look like the following:

```javascript
import React, { Component } from 'react';
import { Kpi } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';
 
import logo from './logo.svg';
import './App.css';
 
import { CatalogHelper } from '@gooddata/react-components';
import catalogJson from './catalog.json';
const C = new CatalogHelper(catalogJson);
 
class App extends Component {
   render() {
      return (
         <div className="App">
            <div className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <h2>Welcome to React</h2>
            </div>
            <Kpi
               projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
               measure={C.metric('Avg Deal Size')} />
            <p className="App-intro">
               To get started, edit <code>src/App.js</code> and save to reload.
            </p>
         </div>
      );
   }
}
 
export default App;
```

Notice that the code in the `App.js` file still includes the hardcoded reference to the project \(`la84vcyhrq8jwbu4wpipw66q2sqeb923` at line 17\). In your real application, you may prefer to pass the project ID via URL or hash parameter, or it may be retrieved from your server-side APIs \(if you are integrating GoodData into an existing application\). It depends on your application's architecture.

## Step 9. Add more visualizations

So far, you have added a single number using the KPI component.

You can add more different elements: tables, charts, custom visualizations. The GoodData UI SDK provides a continuously growing set of built-in components, see [React Components](react_components.md)).

## Next steps

In a real application, you will probably do a number of things differently. For example:

* Avoid hardcoding the project ID.
* Use your GoodData domain with CORS settings so you do not need to use a local proxy \(this is what you will have to do for the production deployment even if you prefer to use a proxy for local development\). For more information, see [How to Access the GoodData API Directly](ht_access_gd_api_directly.md).
* Authenticate your users using single sign-on rather than sending them to a proxied GoodData login page.

However, we recommend that you first take a look at the documentation of the SDK components and try adding a bar chart or a saved component.
