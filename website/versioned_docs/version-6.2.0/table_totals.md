---
title: Specify Table Totals
sidebar_label: Specify Table Totals
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.2.0-table_totals
original_id: table_totals
---

You can display rows with aggregated measure data in both Table and Pivot Table components using the `totals` prop.

## Supported aggregation functions

| Function | Table component | Pivot Table component | Description |
| :--- | :--- | :--- | :--- |
| Sum | supported | supported | Sum of values |
| Maximum | supported | supported | Largest value |
| Minimum | supported | supported | Smallest value |
| Average | supported | supported | Average value |
| Median | supported | supported | Middle value |
| Rollup | supported | not supported | Sum (or another type of aggregation) of pre-aggregated (raw) values; see [Aggregate Table Data](https://help.gooddata.com/display/doc/Aggregate+Table+Data) |

## Column grand total

A column grand total aggregates data for all values in a column and displays it in the row pinned to the bottom of the table. The column grand total is defined by the local identifiers of a measure and the first row attribute.

Totals cannot be calculated for tables without row attributes or for tables without measures. A pivot table with column attributes shows totals for all columns with the specified measure.

**NOTE:** Although the Execute component supports both grand totals and sub totals on any dimension, the Table and Pivot Table components support only grand totals on rows.

**Example:**

![Grand Totals for Columns](assets/pivot_table_totals.png)

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
            }
        }
    }
];

const columns = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: monthDateIdentifier
            },
            localIdentifier: 'month'
        }
    }
];

const rows = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: locationStateDisplayFormIdentifier
            },
            localIdentifier: 'location'
        }
    }
];

const totals = [
    {
        measureIdentifier: 'franchiseFeesIdentifier',
        type: 'sum',
        attributeIdentifier: 'location' // To create a grand total, this needs to be the localIdentifier of the FIRST row attribute.
    },
    {
        measureIdentifier: 'franchiseFeesIdentifier',
        type: 'avg',
        attributeIdentifier: 'location' // To create a grand total, this needs to be the localIdentifier of the FIRST row attribute.
    }
];

return (
    <div style={{ height: 300 }}>
        <PivotTable
            projectId={projectId}
            measures={measures}
            columns={columns}
            rows={rows}
            totals={totals}
        />
    </div>
);
```
