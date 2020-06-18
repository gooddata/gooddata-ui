---
title: Set Up Authentication and Single Sign-On
sidebar_label: Set Up Authentication and Single Sign-On
copyright: (C) 2007-2018 GoodData Corporation
id: sso
---

Depending on whether SSO is implemented on your site, you can use one of the following to authenticate your users:
* GoodData login page and registration page
* GoodData SSO process

## Prerequisites
Before you start, verify that your site meets the following requirements:
* Cross-Origin Resource Sharing (CORS) is set up. The URL where your analytical application runs is whitelisted in the CORS settings.

    If CORS is not set up, contact [GoodData Support](https://support.gooddata.com/hc/en-us/requests/new?ticket_form_id=582387) and request them to set up CORS and whitelist the URL where your analytical application runs in the CORS settings. Optionally, ask them to enable cross-origin redirects to sites allowed by your CORS settings.
* All your users have a GoodData account and have access to your GoodData project.

    If some users do not have a GoodData account or do not have access to the project, see [Grant users access to your project](#Grant-users-access-to-your-project).

## Implementing authentication
Choose the use case depending on whether SSO is implemented on your site.

### SSO is implemented on your site
GoodData supports SAML 2.0-based and PGP-based authentication. For more information, see [Single Sign-On Overview](https://help.gooddata.com/display/doc/Single+Sign-On+Overview).

Setting up authentication depends on what type of SSO is implemented on your site.

* If you use the [GoodData PGP SSO](https://help.gooddata.com/display/doc/GoodData+PGP+Single+Sign-On) implementation, you can use the `loginSSO` method from [GoodData Javascript SDK](https://github.com/gooddata/gooddata-js). Note that although this method requires a mandatory parameter of `targetUrl`, this parameter is used very rarely in the context of GoodData.UI, because in a typical scenario there is no need to redirect a user to any GoodData URL. But as this parameter is mandatory, set it to an arbitrary relative URL (for example, `/`).

        ```javascript
        import { factory } from '@gooddata/gooddata-js';

        const domain = 'https://my.app.com/';
        const sdk = factory({ domain });
        const encryptedClaims = 'your-generated-encrypted-claims';
        const ssoProvider = 'your-sso-provider-name';
        const targetUrl = 'your-target-url'; // set to an arbitrary relative URL

        sdk.user
         .loginSso(encryptedClaims, ssoProvider, targetUrl)
         .then(() => {
           // now you are logged in, and calls to GoodData will be authorized
         })
         .catch(error => {
           // something went wrong, see the browser console for details
           console.error(error);
         });
        ```

* If you use a [SAML SSO](https://help.gooddata.com/display/doc/SAML+SSO+with+GoodData) implementation with the **Service Provider-initiated** scenario, obtain the value of the `loginUrl` parameter from `/gdc/account/samlrequest` and use this URL to get logged in.

    `/gdc/account/samlrequest` also contains the `relayState` parameter that should point to the URL where your application runs (the page where the user is redirected after a successful login).

        ```
        {
          "samlRequests": {
            "items": [ {
              "samlRequest": {
                "loginUrl": "https://yourIdentityProvider.com/pathToSAMLResource?SAMLRequest=encodedMessage&RelayState=https%3A%2F%2FyourRelayState.com",
                "ssoProvider": "yourSsoProvider.com"
              }
            } ]
          }
        }
        ```

    The following is an example of login code:

        ```javascript
        import sdk from '@gooddata/gooddata-js';
        import qs from 'qs';

        const relayState = 'https://my.app.com/';

        sdk.xhr
          .get(`/gdc/account/samlrequest?${qs.stringify({ relayState })}`)
          .then(data => data.getData())
          .then(response => {
            const loginUrl = response.samlRequests.items[0].samlRequest.loginUrl;
            window.location.assign(loginUrl);
          });
        ```

    **NOTE:** Service Provider-initiated SSO cannot be used if you are using a development proxy due to proxy limitations.

* If you use a [SAML SSO](https://help.gooddata.com/display/doc/SAML+SSO+with+GoodData) implementation with the **Identity Provider-initiated** scenario, make sure that login is done via your Identity Provider (Okta, Auth0 and so on) and the login code in your app queries the Identity Provider’s API.

### SSO is not implemented on your site
You do not have to perform any steps for authentication to start working. It is automatically enabled as long as the [prerequisites](#Prerequisites) are met.

This is how authentication process works:
1. The user goes to the URL where your analytical application runs. For example:

    `https://my.app.com/`
2. Your application verifies whether the user is logged in. For example:

        ```javascript
        import { factory } from '@gooddata/gooddata-js';

        const domain = 'https://my.app.com/';
        const sdk = factory({ domain });

        sdk.user.isLoggedIn().then((isLogged) => {
          if (isLogged) {
            // write your own application logic for logged-in users here
          } else {
            // redirect to the login page providing the URL to redirect to upon a successful login
            window.location.replace(`${domain}/account.html?lastUrl=${encodeURIComponent(window.location)}`);
          }
        });
        ```
      **NOTE:** If you want to pass multiple arguments in `lastUrl`, protect them by using `encodeURIComponent`.
3. If the user is not logged in, the application redirects the user to the GoodData login page (white-labeled with your domain name) with the appended `lastUrl` parameter that points to the URL where your analytical application runs:

    `https://my.company.com/account.html?lastUrl=https://my.app.com/`
4. The user logs in to the GoodData Portal.
5. If authentication is successful, the GoodData Portal redirects the user back to the URL where your analytical application runs:

    `https://my.app.com/`

### Grant users access to your project
For authentication to work correctly, all users of your application must have a GoodData account and be able to access your GoodData project.

If some users do not have a GoodData account or do not have access to your project, you have to invite them to your project and make sure that the users with no GoodData account create one.

To do so, follow these steps:
1. Customize the link in the invitation email: set the `invitationWelcomePage` platform setting to the URL where your application runs. For example:

    `"invitationWelcomePage": "https://my.app.com"`

    For more information, see [Configure Various Features via Platform Settings](https://help.gooddata.com/display/doc/Configure+Various+Features+via+Platform+Settings) and the [API for updating the platform settings](https://help.gooddata.com/display/doc/API+Reference#/reference/hierarchical-configuration).
2. Invite the users to your GoodData project via the [GoodData Portal](https://help.gooddata.com/display/doc/Managing+Users+in+Projects).

    The link in the invitation email will redirect an invited user to the URL where your application runs. The users with no GoodData account will additionally be asked to  create a GoodData account.
