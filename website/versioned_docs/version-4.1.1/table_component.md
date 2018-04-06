---
title: Table Component
sidebar_label: Table Component
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-table_component
original_id: table_component
---

Table component is used to show data in columns and rows. Compared to charts you can also display only attribute values without any metrics. Tables have also higher limits for datapoint count.

![Table Component](assets/table.png "Table Component")

## Example

```jsx
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
    }
];

const attributes = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: monthDateIdentifier
            },
            localIdentifier: 'month'
        }
    }
];

<div style={{ height: 300 }}>
    <Table
        projectId={projectId}
        measures={measures}
        attributes={attributes}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | false | string | Project ID |
| measures | false | Measure[] | An array of measure definitions |
| attributes | false | Attribute[] | An array of attribute definitions |
| totals | false | Total[] | An array of total definitions |
| filters | false | Filter[] | An array of filter definitions |
| locale | false | string | Location string for translations |
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
