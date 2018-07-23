---
title: Table
sidebar_label: Table
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.1.0-table_component
original_id: table_component
---

Table shows data in columns and rows. In tables, you can choose to display only attributes (without any measures). Also, tables have higher limits for the number of datapoints to display.

![Table Component](assets/table.png "Table Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Table } from '@gooddata/react-components';

<Table
    projectId={<project-id>}
    measures={<measures>}
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
| projectId | true | string | The project ID |
| measures | false | Measure[] | An array of measure definitions (either measure or attribute definition must be provided for the table to render properly) |
| attributes | false | Attribute[] | An array of attribute definitions (either measure or attribute definition must be provided for the table to render properly) |
| totals | false | Total[] | An array of total definitions |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](result_specification.md#sorting) | An array of sort definitions |
| locale | false | string | The localization of the table. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
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
