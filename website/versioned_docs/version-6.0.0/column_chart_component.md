---
title: Column Chart
sidebar_label: Column Chart
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.0.0-column_chart_component
original_id: column_chart_component
---

Column chart shows data in vertical columns. Column charts can display one or multiple measures side by side, divided by either attribute values or by a single measure stacked by attribute values.

![Column Chart Component](assets/column_chart.png "Column Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { ColumnChart } from '@gooddata/react-components';

<ColumnChart
    projectId={<project-id>}
    measures={<measures>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
const totalSales = {
    measure: {
        localIdentifier: 'totalSales',
        definition: {
            measureDefinition: {
                item: {
                    identifier: totalSalesIdentifier
                },
                aggregation: 'sum'
            }
        },
        alias: '$ Total Sales',
        format: '#,##0'
    }
};

const month = {
    visualizationAttribute: {
        displayForm: {
            identifier: monthDateIdentifier
        },
        localIdentifier: 'month'
    }
};

<div style={{ height: 300 }}>
    <ColumnChart
        projectId={projectId}
        measures={[totalSales]}
        viewBy={month}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measures | true | Measure[] | An array of measure definitions |
| viewBy | false | Attribute | An attribute definition |
| stackBy | false | Attribute | An attribute definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](result_specification.md#sorting) | An array of sort definitions |
| config | false | [ChartConfig](chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](drillable_item.md) | An array of points and attribute values to be drillable. |
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

The following example shows the supported `config` structure with sample values. To see descriptions of individual options, see [ChartConfig section](chart_config.md).
``javascript
{
    colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
    xaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto'
    },
    yaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto',
        min: '20',
        max: '30'
    },
    legend: {
        enabled: true,
        position: 'bottom',
    },
    dataLabels: {
        visible: 'auto'
    },
    grid: {
        enabled: true
    }
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```