---
title: Headline
sidebar_label: Headline
copyright: (C) 2007-2018 GoodData Corporation
id: headline_component
---

Headline shows a single number. Use headlines to display measures and attributes.

![Headline Component](assets/headline.png "Headline Component")

## Structure

```jsx
import { Headline } from '@gooddata/react-components';

<Headline
    projectId={<project-id>}
    primaryMeasure={<measure>}
/>
```

## Example

```jsx
const measure = {
    measure: {
        localIdentifier: 'franchiseFeesIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: franchiseFeesIdentifier
                }
            }
        }
    }
};

<Headline
    projectId={projectId}
    primaryMeasure={measure}
/>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| primaryMeasure | true | Measure | A measure definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| locale | false | string | The location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable. See [DrillableItems](drillable_item.md).|
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](loading_component.md).|
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->
