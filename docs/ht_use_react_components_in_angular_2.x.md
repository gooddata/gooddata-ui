---
title: Use Angular 2+
sidebar_label: Use Angular 2+
copyright: (C) 2007-2018 GoodData Corporation
id: ht_use_react_component_in_angular_2.x
---

To be able to use the GoodData [React components](react_components.md) in your Angular 2+ environment, wrap each component into an Angular component, and then render the React component using `ReactDom.render` inside.

## 1. Install dependencies
<!-- 
    For GDC developer:
    - Install ng cli using `npm install -g @angular/cli` or `yarn global add @angular/cli` and create angular app with `ng new my-sba-app`.
    - Add proxy.conf.json:
        ```
        {
          "/gdc": {
            "changeOrigin": true,
            "cookieDomainRewrite": "localhost",
            "secure": false,
            "target": "https://secure.gooddata.com/"
          },
          "/account.html": {
            "changeOrigin": true,
            "secure": false,
            "target": "https://secure.gooddata.com/"
          },
          "/packages": {
            "changeOrigin": true,
            "secure": false,
            "target": "https://secure.gooddata.com/"
          }
        }
        ```
    - generate SSL cert: openssl req -newkey rsa:2048 -nodes -keyout domain.key -x509 -days 365 -out domain.crt
    - run devserver: ng serve --proxy-config proxy.conf.json --ssl 1 --ssl-key domain.key --ssl-cert domain.crt
    - open https://localhost:4200/account.html
    - add KpiComponent to app.module.ts section NgModule.declarations
 -->
 
Install latest dependencies using either `npm` or `yarn`. Your app must be able to render React components from `@gooddata/react-components` using a unique ID \(`uuid`\), and you also must be able to issue an `invariant` exception if the DOM node is not available.

```bash
npm install --save uuid invariant react@15.6.2 react-dom@15.6.2 @gooddata/react-components
npm install --save-dev @types/react @types/react-intl
```
or
```bash
yarn add uuid invariant react@15.6.2 react-dom@15.6.2 @gooddata/react-components
yarn add @types/react @types/react-intl --dev
```

## 2. Declare the Angular wrapper component
Angular wrapper component renders a React component and re-renders it on property change.

The component wrapper must be able to render React components imported from `@gooddata/react-components`. 
You can import any supported components from the package, and then either put them together using multiple `React.createElement` functions, or make an abstract wrapper component that accepts a React component reference as a parameter. 

The following examples are using a single KPI component.

**kpi.component.ts**:
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Kpi } from '@gooddata/react-components';

interface KpiProps {
  measure: string;
  projectId: string;
  format?: string;
  filters?: any[];
  onLoadingChanged?: (any);
  onError?: (any);
}

@Component({
  selector: 'app-kpi',
  template: '<span [id]="rootDomID"></span>'
})

export class KpiComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() measure: string;
  @Input() projectId: string;
  @Input() filters: any[];
  @Input() format: string;
  @Input() onLoadingChanged?: (any);
  @Input() onError?: (any);

  private rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): KpiProps {
    const {
      projectId,
      measure,
      format,
      filters,
      onLoadingChanged,
      onError
    } = this;
    return {
      projectId,
      measure,
      format,
      filters,
      onLoadingChanged,
      onError
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Kpi, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
```

When this article was last updated, there was an [outstanding issue in Angular 4](https://github.com/angular/angular/issues/14252). `ngOnDestroy` is called _after_ a DOM node has already been removed. Not calling `ReactDOM.unmountComponentAtNode(this.getRootDomNode())` results in memory leaks.

Verify whether the issue is present in your version of Angular. If not, uncomment the commented out line in `ngOnDestroy`.


## 3. Use the component
You are now ready to use the GoodData React components in your Angular app.

You can use wrapped components across your app, pass the component props to it, and even update them using data-binding.

```javascript
<app-kpi
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure="atSHqCtAePe4">
</app-kpi>
```

If you want to handle loading and error content yourself, and you do not want to use the default LoadingComponent and ErrorComponent, pass null explicitly:

* `LoadingComponent={null}`
* `ErrorComponent={null}`

For more information about including React components in Angular, see [https://www.packtpub.com/books/content/integrating-angular-2-react](https://www.packtpub.com/books/content/integrating-angular-2-react).
