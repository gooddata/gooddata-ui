---
title: Table
sidebar_label: Table
copyright: (C) 2007-2018 GoodData Corporation
id: table_component
---

Table shows data in columns and rows. Unlike charts, tables can display only attribute values without any measures. Also, tables have higher limits for the number of datapoints to display.

![Table Component](assets/table.png "Table Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Table } from '@gooddata/react-components';

<Table
    projectId={<project-id>}
    measures={<measures>}
    config={<chart-config>}
    …
/>
```

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
| projectId | false | string | The project ID |
| measures | false | Measure[] | An array of measure definitions |
| attributes | false | Attribute[] | An array of attribute definitions |
| totals | false | Total[] | An array of total definitions |
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
