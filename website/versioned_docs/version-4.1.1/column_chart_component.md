---
title: Column Chart Component
sidebar_label: Column Chart Component
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-column_chart_component
original_id: column_chart_component
---

Column Chart Component is used to show data in vertical columns. It can either display one or multiple measures side by side divided by attribute values or one measure stacked by attribute values.

![Column Chart Component](assets/column_chart.png "Column Chart Component")

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
| projectId | false | string | Project ID |
| measures | false | Measure[] | An array of measure definitions |
| viewBy | false | Attribute[] | An array of attribute definitions |
| stackBy | false | Attribute[] | An array of attribute definitions |
| filters | false | Filter[] | An array of filter definitions |
| config | false | {} | Chart configuration object |
| locale | false | string | location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when component updates it's error state |
| onLoadingChanged | false | Function | A callback when component updates it's loading state |


<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->
