---
id: version-4.1.1-error_component
title: ErrorComponent
sidebar_label: ErrorComponent
copyright: (C) 2007-2018 GoodData Corporation
original_id: error_component
---

The top level components support 'ErrorComponent' props. These props enable you to set custom content that is displayed when a component is in error state. You can also disable the default error indicator by explicitly passing null instead.

## Example: Disabled ErrorComponent

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

## Example: Custom ErrorComponent

In the following example, the default ErrorComponent is replaced with a custom component.

```javascript
import { Kpi } from '@gooddata/react-components';


const CustomError = ({
    code,
    message,
    description,
    icon
}) => (
    <p>
        <span className={icon} ></span> <strong>{message}</strong><br />
        {description}
    <p>
);

<Kpi
    measure="<measure-identifier>"
    projectId="<project-id>"
    filters={<filters>}
    format="<format>"
    ErrorComponent={CustomError}
/>
```
