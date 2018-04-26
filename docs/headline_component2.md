---
title: Headline
sidebar_label: Headline
copyright: (C) 2007-2018 GoodData Corporation
id: headline_component2
---

The Headline component shows a single number. You can display measures and also attributes.

![Headline Component](assets/headline.png "Headline Component")

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
| projectId | false | string | The project ID |
| primaryMeasure | false | Measure | A measure definition |
| filters | false | Filter[] | An array of filter definitions |
| locale | false | string | The location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->
