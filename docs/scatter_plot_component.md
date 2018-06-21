---
title: Scatter Plot Chart
sidebar_label: Scatter Plot Chart
copyright: (C) 2007-2018 GoodData Corporation
id: scatter_plot_component
---

Scatter plot chart shows data as points using Cartesian coordinates. Scatter plot charts typically have a minimum of two measures, one for the X-axis and the other for the Y-axis, and one attribute, which determines the meaning of each data point.
Scatter charts are useful for analyzing trends between two measures or for tracking the magnitude of two measures from the same chart.

![Scatter Plot Component](assets/scatter_plot.png "Scatter Plot Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { ScatterPlot } from '@gooddata/react-components';

<ScatterPlot
    projectId={<project-id>}
    xAxisMeasure={<measure>}
    yAxisMeasure={<measure>}
    attribute={<attribute>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { ScatterPlot } from '@gooddata/react-components';

const measures = [
    {
        measure: {
            localIdentifier: 'franchiseFeesIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchisedSalesIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchisedSalesIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    }
];

const attribute = {
    visualizationAttribute: {
        displayForm: {
            identifier: monthDateIdentifier
        },
        localIdentifier: 'month'
    }
};

<div style={{ height: 300 }}>
    <ScatterPlot
        projectId={projectId}
        xAxisMeasure={measures[0]}
        yAxisMeasure={measures[1]}
        attribute={attribute}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| xAxisMeasure | false | Measure | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the scatter plot chart to render properly) |
| yAxisMeasure | false | Measure | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the scatter plot chart to render properly) |
| attribute | false | Attribute | An attribute definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| sortBy | false | SortItem[] | An array of sort definitions. See the `sorts` prop in the code sample in [Result specification](result_specification.md#sorting). |
| config | false | {} | The chart configuration object |
| locale | false | string | The location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable. See [DrillableItems](drillable_item.md).|
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| onFiredDrillEvent | false | Function | A callback after drill event was emitted |
| onLoadingFinish | false | Function | A callback when component ends loading |
| pushData | false | Function | A callback after AFM is resolved |
| visualizationProperties | false | {} | The chart configuration object |
-->
