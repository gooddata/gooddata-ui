---
title: Authentication to the GoodData Platform
sidebar_label: SSO (single sign-on)
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-sso
original_id: sso
---

When developing your own smart business application, you will need to add authentication cookie to all requests coming
to GoodData Platform. 

<!-- INTERNAL GDC NOTE:
    If you need public access, you may use proxy method below. 
    GoodData Platform doesn't support public acces, but there is 
    a possibility to supply access token via URI. 
    (But it is not supported by UI SDK.)  
 -->

## Use GoodData Platform users
To obtain the cookie you may call `sdk.user.login()` method, which gets the cookie for current user.
```js
import { factory } from 'gooddata';
const sdk = factory();
const loginPromise = sdk.user.login('user@example.com', 'password');
```

You may ask GoodData Services to create some testing accounts.  

## Use your user database
Sophisticated way to obtain the authentication cookie is using single sign-on (SSO) method. 
GoodData Platform implements SAML protocol, in simple words - 
you authenticate your users to your application, but also you redirect each user to special SAML URL, which sets the correct cookies.  

How to setup your server to communicate with GoodData Platform can be found here:

https://help.gooddata.com/display/doc/SAML+SSO+with+GoodData

## Make your proxy
For some use cases you may setup your own proxy server, which will first login with a service user 
and then add the authentication header to all requests.

> **Careful:** If you are just using the [development proxy](cors.md#on-your-local-dev-machine), 
you will still need to autenticate by going to `/account.html` or calling the `sdk.user.login()` method. 
and filling in valid GoodData credentials.  

