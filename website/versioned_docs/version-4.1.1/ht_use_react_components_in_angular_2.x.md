---
title: Use React Components in Angular 2+
sidebar_label: Use React Components in Angular 2+
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-ht_use_react_component_in_angular_2.x
original_id: ht_use_react_component_in_angular_2.x
---

To be able to use the GoodData [React Components](react_components.md) in your Angular 2+ environment, wrap each component into an Angular component, and then render the React component using `ReactDom.render` inside.

**Steps:**

1. Install dependencies using either `npm` or `yarn`. Your app must be able to render React components from `@gooddata/react-components` using a unique ID \(`uuid`\), and also has to be able to issue an `invariant` exception if the DOM node is not available.

```bash
npm install --save uuid react react-dom invariant @gooddata/react-components
npm install --save-dev @types/react
```

or

```bash
yarn add uuid react react-dom invariant @gooddata/react-components
yarn add @types/react --dev
```

2. Import the required component and dependencies.
   The component wrapper must be able to render React components imported from `@gooddata/react-components`. You can import any supported components from the package, and then either put them together using multiple `React.createElement` functions, or make an abstract wrapper component that accepts a React component reference as a parameter. The following examples are using a single KPI component:

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Kpi } from '@gooddata/react-components';
```

3. Declare the prop interface. The interface should be a subset of the React prop interface.

```javascript
interface KpiProps {
    measure: string;
    projectId: string;
    format?: string;
    filters?: any[];
    onLoadingChanged?: (any);
    onError?: (any);
}
```

4. Declare the Angular wrapper component.

   This is the component that you can use in your Angular app. This component renders a React component and re-renders it on property change.

   When this article was last updated, there was an [outstanding issue in Angular 4](https://github.com/angular/angular/issues/14252): `ngOnDestroy` is called _after_ a DOM node has already been removed. Not calling `ReactDOM.unmountComponentAtNode(this.getRootDomNode())` results in memory leaks.

   Verify whether the issue is present in your version of Angular. if not, uncomment the commented out line in `ngOnDestroy`.

```javascript
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

You are now ready to use the GoodData React Components in your Angular app.

You can use wrapped components across your app. You can pass the component props to it and even update them using data-binding.

```javascript
<app-kpi
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure="atSHqCtAePe4">
</app-kpi>
```

If you want to handle loading and error content yourself and do not want to use the default LoadingComponent and ErrorComponent, pass null explicitly:

* `LoadingComponent={null}`
* `ErrorComponent={null}`

For more information on including React components in Angular, see [https://www.packtpub.com/books/content/integrating-angular-2-react](https://www.packtpub.com/books/content/integrating-angular-2-react).
