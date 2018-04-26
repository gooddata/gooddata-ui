---
title: Set Up Authentication and Single Sign-On
sidebar_label: Set Up Authentication and Single Sign-On
copyright: (C) 2007-2018 GoodData Corporation
id: sso
---

To develop your own smart business application, you must add an authentication cookie to all requests coming to GoodData Platform.

<!-- INTERNAL GDC NOTE:
    If you need public access, you may use proxy method below. 
    GoodData Platform doesn't support public acces, but there is 
    a possibility to supply access token via URI. 
    (But it is not supported by UI SDK.)  
 -->

## Use GoodData Platform users - no SSO required
To obtain the authentication cookie, call the `sdk.user.login()` method that gets a cookie for the current user.
```js
import { factory } from 'gooddata';
const sdk = factory();
const loginPromise = sdk.user.login('user@example.com', 'password');
```
Developers must implement their own login page to keep regular GoodData Platform users separate from development.

## Authenticate users with SSO
Use ingle sign-on (SSO) method to obtain the authentication cookie.

GoodData Platform implements SAML protocol. That way, you authenticate your users to your application while redirecting each user to a special SAML URL that sets correct cookies.

For details about how to setup your server to communicate with GoodData Platform, see:
https://help.gooddata.com/display/doc/SAML+SSO+with+GoodData

For general information about using SSO on GoodData Platform, see:
https://help.gooddata.com/display/doc/Single+Sign-On+Overview

## Make your proxy - development only
If your user case requires it, you can setup your own proxy server. The server will first login with a service user and then add the authentication header to all requests.

> **Careful:** Use the proxy authentication only for development. We do not recommend using this authentication method for production.

> **Careful:** If you are just using the [development proxy](cors.md#on-your-local-dev-machine), 
you will still need to autenticate by going to `/account.html` or calling the `sdk.user.login()` method. 
and filling in valid GoodData credentials.

