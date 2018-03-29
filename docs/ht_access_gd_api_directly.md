---
title: Access the GoodData API Directly
sidebar_label: Access the GoodData API Directly
copyright: (C) 2007-2018 GoodData Corporation
id: ht_access_gd_api_directly
---

Our tutorial [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md) showed how you can create a simple web app with the GoodData UI SDK in a few minutes. For the sake of simplicity, that tutorial includes using a local proxy that enables the app to call the GoodData APIs without the need to address cross-origin requests. Using a proxy is not a best practice for creating production-ready apps. Instead, we recommend that you use Cross-Origin Resource Sharing \(CORS\). Setting up CORS allows you to develop and run web applications that can communicate directly with the GoodData APIs.

This tutorial does \_not\_ address authentication. The easiest way to make sure that your API requests to the GoodData platform are authenticated is to be logged into your white-labelled domain in the same browser you are using for your local development.

## Step 1. Get a white-labeled GoodData domain

By default, you access the GoodData Portal via `https://secure.gooddata.com`. If you white-label the GoodData Portal URL, you can have it at, for example, `https://analytics.yourcompany.com`.

In general, a white-labeled domain enables you to remove branding elements from the GoodData Portal and optionally replace them with branding from your enterprise. For more information, see [White Labeling](https://help.gooddata.com/display/doc/White+Labeling).

White-labeling is done by the GoodData Support specialists per request submitted via the [GoodData Support Portal](https://support.gooddata.com/hc/en-us).

You can white-label a brand new domain \(see [White-Label a New Domain](https://help.gooddata.com/display/doc/White-Label+a+New+Domain)\) or an existing domain \([White-Label an Existing Domain](https://help.gooddata.com/display/doc/White-Label+an+Existing+Domain)\).

If you are contacting GoodData Support regarding white labeling your domain, you may want to also request [CORS](cors.md).

## Step 2. Update your code

Before your app starts communicating with GoodData, add the following lines to your executable code \(for example, at the beginning of the file with your root component\):

```javascript
import { config } from 'gooddata';
config.setCustomDomain('https://analytics.example.com');
```

If you followed the instructions from the tutorial [How to Create Your First Visualization with GoodData UI SDK]ht_create_your_first_visualization.md), you can now remove the proxy-related code from the `package.json` file because it is not needed anymore.

## Step 3. Run your app locally without a proxy

In this step, we assume the following:

* You have requested CORS settings that allow access \(besides others\) from `https://local.test:8443/`.
* You have set up your network so that `local.test` is an alias of your development environment.

* If you are developing on a Mac or Linux machine, add `local.test` to the end of the line starting withc `127.0.0.1` in your `/etc/hosts` file \(you may need administrator/root privileges for that\).
  Here is an example of how the `/etc/hosts` file may look on a Mac:

  ```bash
  ##
  # Host Database
  #
  # localhost is used to configure the loopback interface
  # when the system is booting. Do not change this entry.
  ##
  127.0.0.1 localhost.
  255.255.255.255 broadcasthost
  ::1 localhost
  ```

In this example, `local.test` was added by you, and everything else is the original contents of the `/etc/hosts` file. If you have not added anything else to the file besides appending `local.test` to the right line, you can ignore the initial comment provided by the operating system about not changing the `/etc/hosts` file.

Do \_not\_ modify the `/etc/hosts` file except for adding `local.test` to the end of the line starting with 127.0.0.1 unless you are absolutely sure that you know what you are doing.

1. Make sure that your browser accesses your app via `https://local.test:8443` instead of `https://localhost:8443`.
   If you use react-scripts \(for example, you followed the instructions in the tutorial[How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md)\), set the `HOST` environment variable to `local.test` before starting the app. To do so, run the following command from the command line:

```bash
HTTPS=true HOST=local.test PORT=8443 yarn start
```

## Step 4. Deploy your app

In this step, we assume that your app's address is `https://smart-app.example.com`.

Create a production build of your app, and deploy it on your server.

The process is similar to deploying any other application.

1. Identify the target URL.
   If your app is going to be deployed under a specific folder \(for example, `https://smart-app.example.com/my-first-app`\), add the following line to your `package.json`:

`"homepage" : “https://smart-app.example.com/my-first-app",`

You can skip this step if your app will be accessible directly from the root folder \(that is, directly via `https://smart-app.example.com/`\).

1. Create a production build:

`yarn build`

2. Upload the contents of your build folder to your production server, and point your browser to the target URL.
