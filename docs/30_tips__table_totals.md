---
title: Specify Table Totals
sidebar_label: Specify Table Totals
copyright: (C) 2007-2020 GoodData Corporation
id: table_totals
---

You can display rows with aggregated measure data in both Table and Pivot Table components using the `totals` prop.

## Supported aggregation functions

| Function | Description |
| :--- | :--- |
| Sum | Sum of values |
| Maximum | Largest value |
| Minimum | Smallest value |
| Average | Average value |
| Median | Middle value |
| Rollup | Sum (or another type of aggregation) of pre-aggregated (raw) values; see [Aggregate Table Data](https://help.gooddata.com/display/doc/Aggregate+Table+Data) |

> **NOTE:** A rollup total is not supported in visualizations with [measure value filters](30_tips__filter_visual_components.md#filter-by-a-measure-value). Such visualizations are not rendered, and the error message is shown instead.

## Column grand total

A column grand total aggregates data for all values in a column and displays it in the row pinned to the bottom of the table. The column grand total is defined by the local identifiers of a measure and the first row attribute.

Totals cannot be calculated for tables without row attributes or for tables without measures. A pivot table with column attributes shows totals for all columns with the specified measure.

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

## Subtotal

A subtotal aggregates data for all values in an attribute group. A subtotal is displayed as a regular table row with data and is not pinned to the bottom of the table.

A subtotal is defined the same way a grand total is, except `attributeIdentifier` is defined by the attribute that is being grouped.

**NOTE:** Although the Execute component supports both grand totals and subtotals on any dimension, the Table component supports only grand totals on rows. In addition, the subtotals are supported only for tables sorted by the first row attribute, and this is the default sorting for tables.

**Example:**

![Subtotals for Columns](assets/pivot_table_subtotals.png)

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

const rows = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: locationStateDisplayFormIdentifier
            },
            localIdentifier: 'location'
        }
    },
    {
        visualizationAttribute: {
            displayForm: {
                identifier: menuCategoryAttributeDFIdentifier
            },
            localIdentifier: 'menu'
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

const totals = [
    {
        type: 'sum',
        measureIdentifier: 'franchiseFeesIdentifier',
        attributeIdentifier: 'location' // Grand total
    },
    {
        type: 'sum',
        measureIdentifier: 'franchiseFeesIdentifier',
        attributeIdentifier: 'menu' // Subtotal
    }
];

return (
    <div style={{ height: 300 }}>
        <PivotTable
            projectId={projectId}
            measures={measures}
            rows={rows}
            columns={columns}
            totals={totals}
        />
    </div>
);
```
