---
title: Custom Executions
sidebar_label: Custom Executions
copyright: (C) 2007-2018 GoodData Corporation
id: afm
---

Execution is a combination of attributes, measures and filters that describes what data you want to calculate. 

**NOTE:** A measure contains numeric data (for example, Revenue). Measures can be sliced by selected attributes (for example, City, Date in years, or both) and filtered by attribute values or date constraints. For more information, see the [main concepts](01_intro__platform_intro.md#main-concepts).   

## End-to-end flow

You can use an instance of Analytical Backend to conveniently construct and perform the executions using a fluent API. 

```javascript
const backend = bearFactory();

const result = await backend
   .workspace("project_id")
   .execution()
   .forItems(measuresAndAttributes, filters)
   .withSorting(...sorting)
   .withDimensions(dimensions)
   .execute();

const firstPage = await result.readWindow([0, 0], [10, 10]);
const allData = await result.readAll();
```

In the above example, the code starts an execution in workspace with `project_id`. It specifies execution for `measuresAndAttributes` array, 
filtered by `filters` array. 

On top of that, it configures `sorting` of the result data and how to lay out the data into `dimensions`.

The code then waits for the results. From these it then reads first page of data and then all the data. 

## Attribute

Each attribute is defined by the `displayForm` that will be used to slice the data. You can create an attribute 
definition using the following factory function:

```javascript
    const attribute = newAttribute('<attribute-displayForm-identifier>');
```

Each attribute requires a `localIdentifier` which you can use to reference the attribute in the scope of the execution - 
for instance when specifying sorting. The factory function assigns stable localIdentifier for you. 

You can optionally override the `localIdentifier` and also the title of the attribute in the factory function call:

```javascript
    const attribute = newAttribute('<attribute-displayForm-identifier>', m => m.localId('myLocalId').alias('My Attribute'));
```

All attributes are defined using their `displayForm` identifiers. This assures that you application can work on top of
different workspaces which have the same Logical Data Model. For more information, see [Determine the Attribute Value ID](https://help.gooddata.com/display/doc/Determine+the+Attribute+Value+ID).

## Filter

You can limit the execution by providing one or more `filters`. Multiple filters are always interpreted as an intersection of all individual filters \(`f1 AND f2 AND f3...`).

The structure of individual filters is identical to the `filters` prop that is used to filter visual components. For more information, see [Filter Visual Components](30_tips__filter_visual_components.md).

## Measure



```javascript
// Items of AFM.measures
// Type: IMeasure
{
    localIdentifier: '<measure-local-identifier>',
    // Type: SimpleMeasureDefinition
    definition: {
        measure: {
            // Type: ObjQualifier
            item: {
                identifier: '<measure-identifier>'    // Or URI: '<measure-uri>'
            },
            aggregation: 'sum', // Optional; by default 'sum'; possible values: 'sum' | 'count' | 'avg' | 'min' | 'max' | 'median' | 'runsum'
            filters: [],        // Optional; by default []; type: CompatibilityFilter[]
            computeRatio: true  // Optional; by default false
        }
    },
    alias: 'Custom measure title',  // Optional; overrides the default measure title
    format: '#,##0.00'  // Optional; overrides the default measure format; ignored in some special cases, see the sections below
}

```

`item` either contains a measure URL...:

```javascript
item: {
    uri: '<measure-uri>'
}
```

...or a measure identifier:

```javascript
item: {
    identifier: '<measure-identifier>'
}

```

Besides `uri` or `identifier`, a measure requires a `localIdentifier` string that uniquely identifies the measure in the context of the current AFM. This is used in dimension definitions, sorting, and any other place where you need to target a measure or an attribute.

Though you can use either object URIs or object identifiers \(`ObjQualifier = IObjUriQualifier | IObjIdentifierQualifier`\), we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project that they live in. That means that an object that is used in any project within your domain, has the _same_ object identifier in _any_ of those projects.

To get the list of catalog items and date datasets from a GoodData project in the form of a JavaScript object, use [gdc-catalog-export](02_start__catalog_export.md).

### Aggregation inside a measure

Each measure can specify `aggregation` of data. Aggregation is represented by a string value that defines the aggregation type.

| Type | Description |
| :--- | :--- |
| `'sum'` | Returns a sum of all numbers in the set |
| `'count'` | Counts unique values of a selected attribute in a given dataset determined by the second attribute parameter  (ignores the measure's `format` value and uses the default value `#,##0` instead) |
| `'avg'` | Returns the average value of all numbers in the set; null values are ignored |
| `'min'` | Returns the minimum value of all numbers in the set |
| `'max'` | Returns the maximum value of all numbers in the set |
| `'median'` | Counts the statistical median - an order statistic that gives the "middle" value of a sample. If the "middle" falls between two values, the function returns average of the two middle values. Null values are ignored. |
| `'runsum'` | Returns a sum of numbers increased by the sum from the previous value \(accumulating a sum incrementally\) |

### Filters in a measure definition

Each measure can be filtered by attribute filters. Filters are represented by an array of `FilterItem` objects. Measure attribute filters use the same `FilterItem` interface as [AFM global filters](50_custom__execution.md).

Only one filter of the `DateFilter` type is allowed in the measure's filter definition.

* When both the measure filter of the `DateFilter` type and the AFM global filter of the `DateFilter` type are set with the **same** date dimension, the measure date filter overrides the AFM global date filter for this measure \(global date filters are still applied to other measures that do not have a measure date filter defined\).
* When the measure filter of the DateFilter type and the AFM global filter of the DateFilter type are set with **different** date dimensions, the filters are interpreted as an intersection of those filters (f1 AND f2).

### Show a measure as a percentage

When an AFM is executed on the GoodData platform, the result measure data is, by default, returned as raw values \(numbers\).

If you want the measures data to be displayed as a percentage instead, add a `computeRatio` property and set it to `true`.

When the property is enabled, the measure's `format` value is ignored. The default format `#,##0.00%` is used instead.

When `computeRatio` is not specified, it defaults to `false`, and values from execution are displayed as numbers.

### Compare a measure over time

To compare a measure over time, add one of the supported measure types described in [Time Over Time Comparison](20_misc__time_over_time_comparison.md) to `afm.measures`.

### Calculated measures

To create calculated measures (for example, when you want to subtract a measure from another measure), add arithmetic measures described in [Arithmetic Measure](20_misc__arithmetic_measure.md) to `afm.measures`.

### Examples of measures

#### Simple measure

```javascript
{
    measures: [
        // Type: IMeasure
        {
            definition: {
                measure: {
                    item: {
                        identifier: '<measure-identifier>'    // Or URI: '<measure-uri>'
                    }
                }
            },
            localIdentifier: '<measure-local-identifier>'
        }
    ]
}
```

#### Complex measure

```javascript
// Type: IAfm
{
    measures: [
        // Type: IMeasure
        {
            localIdentifier: '<measure-local-identifier>',
            // Type: MeasureDefinition
            definition: {
                measure: {
                    // Type: ObjQualifier
                    item: {
                        identifier: '<measure-identifier>'    // Or URI: '<measure-uri>'
                    },
                    aggregation: 'count',   // Optional; by default 'sum'; possible values: 'sum' | 'count' | 'avg' | 'min' | 'max' | 'median' | 'runsum'
                    // Optional; By default []; type: CompatibilityFilter[]
                    filters: [
                        // Type: IAbsoluteDateFilter
                        {
                            absoluteDateFilter: {
                                dataSet: {
                                    identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
                                },
                                from: '2017-07-31', // Supported string format 'YYYY-MM-DD'
                                to: '2017-08-29' // Supported string format 'YYYY-MM-DD'
                            }
                        },
                        // Type: IPositiveAttributeFilter
                        {
                            positiveAttributeFilter: {
                                displayForm: {
                                    identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
                                },
                                in: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Elements to filter by are specified by URI
                            }
                        },
                    ],
                    computeRatio: true      // Optional; by default false
                }
            },
            alias: 'Custom measure title',  // Optional; overrides the default measure title
            format: '#,##0.00'  // Optional; overrides the default measure format
        }
    ]
}
```

#### Measure with global filters

```javascript
// Type: IAfm
{
    measures: [
        // Type: IMeasure
        {
            localIdentifier: '<measure-local-identifier>',
            // Type: MeasureDefinition
            definition: {
                measure: {
                    // Type: ObjQualifier
                    item: {
                        identifier: '<measure-identifier>'    // Or URI: '<measure-uri>'
                    },
                    aggregation: 'count',   // Optional; by default 'sum'; possible values: 'sum' | 'count' | 'avg' | 'min' | 'max' | 'median' | 'runsum'
                    computeRatio: true      // Optional; by default false
                }
            },
            alias: 'Custom measure title',  // Optional; overrides the default measure title
            format: '#,##0.00'  // Optional; overrides the default measure format
        }
    ],
    // Optional; By default []; Type: CompatibilityFilter[]
    filters: [
        // Type: IAbsoluteDateFilter
        {
            absoluteDateFilter: {
                    dataSet: {
                    identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
                },
                from: '2017-07-31', // Supported string format 'YYYY-MM-DD'
                to: '2017-08-29' // Supported string format 'YYYY-MM-DD'
            }
        },
        // Type: IPositiveAttributeFilter

        {
            positiveAttributeFilter: {
                displayForm: {
                    identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
                },
                in: ['<attribute-element-value-1>', '<attribute-element-value-2>'], // Elements to filter by are specified by value
                textFilter: true
            }
        }
    ]

}
```

## Native total

Native totals in the AFM structure represent a definition of the data needed for computing correct results.

### Definition

```javascript
...
nativeTotals: [
    {
        measureIdentifier: string       // The local measure identifier for which total is defined
        attributeIdentifiers: string[]  // A subset of local attribute identifiers in AFM defining total placement
    },
    ...
]
```

### Prerequisites

Native total items must be in sync with [result specification \(ResultSpec\)](50_custom__result_specification.md) and its dimension totals. If they are not in sync, it is treated as a bad execution request.

### Limitations

Native total are curretly supported only for:

* Table visualizations
* Grand native totals
  * `nativeTotal.attributeIdentifiers` is an empty array.

### Defining native totals

See [Table Totals in ExecutionObject](table_totals_in_execution_context.md).

### Example

```javascript
...
nativeTotals: [
    {
        measureIdentifier: '<measure-local-identifier-1>',
        attributeIdentifiers: [] // only Grand totals are currently supported so the array should be empty
    },
    ...
]
```
