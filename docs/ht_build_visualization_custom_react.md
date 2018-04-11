---
title: Build a Visualization Using a Custom React Application
sidebar_label: Build a Visualization Using a Custom React Application
copyright: (C) 2007-2018 GoodData Corporation
id: ht_build_visualization_custom_react
---

You can build a visualization in a custom React application \(non react-create-app\).

1. Add the `@gooddata/react-components` package to your existing project.

```bash
$ yarn add @gooddata/react-components
```

or

```bash
$ npminstall@gooddata/react-components
```

2. Import the components that you want to use to your app. For example, to get the `Visualization` component:

```javascript
import { Visualization } from '@gooddata/react-components';

// This is an example of embedding a visualization from the GoodSales demo project.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
/>
```

**NOTE**: To get results from executing any component, you must be authenticated to the GoodData platform.
