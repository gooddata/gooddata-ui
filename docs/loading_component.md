---
id: loading_component
title: LoadingComponent
sidebar_label: LoadingComponent
copyright: (C) 2007-2018 GoodData Corporation
---

The top level components support 'LoadingComponent' props. These props enable you to set custom content that is displayed when a component is in loading state. You can also disable the default loading indicator by explicitly passing null instead.

## Example: Disabled LoadingComponent

In the following example, the KPI shows neither loading indicator nor error message.

```javascript
import { Kpi } from '@gooddata/react-components';
 
<Kpi
    measure="<measure-identifier>"
    projectId="<project-id>"
    filters={<filters>}
    format="<format>"
    LoadingComponent={null}
    ErrorComponent={null}
/>
```

## Example: Custom LoadingComponent

In the following example, the default LoadingComponent is customized with color, fixed size, indicator size, and speed of animation.

```javascript
import React, { Component } from 'react';
import { Kpi, LoadingComponent } from '@gooddata/react-components';

export class CustomisedLoadingComponentExample extends Component {
    render() {
        return (
            <LoadingComponent
                color="tomato"
                height={300}
                imageHeight={16}
                speed={2}
            />
        );
    }
}

export default CustomisedLoadingComponentExample;

<Kpi
    measure="<measure-identifier>"
    projectId="<project-id>"
    filters={<filters>}
    format="<format>"
    LoadingComponent={CustomisedLoadingComponentExample}
/>
```
