---
title: Set Up an AFM Query
sidebar_label: Set Up an AFM Query
copyright: (C) 2007-2018 GoodData Corporation
id: afm
---

AFM is a combination of attributes, measures and filters that describes a query that you want to execute. In terms of underlying API, it is similar to creating an insight using [Analytical Designer](https://help.gooddata.com/display/doc/Create+an+Insight+with+Analytical+Designer).

**Note:** A measure contains numeric data (for example, Revenue). Measures can be sliced by selected attributes (for example, City, Date in years, or both) and filtered by attribute values or date constraints. For more information, see the [main concepts](platform_intro.md#main-concepts).   

## Structure

```javascript
{
    measures: [], // Optional; the default is []
    attributes: [], // Optional; the default is []
    filters: [], // Optional; the default is []
    nativeTotals: [] // Optional; the default is []
}
```

For more information about TypeScript specifications, see [typings](https://github.com/gooddata/gooddata-typings/blob/v2.0.0/src/AFM.ts#L9).

## Attribute

Each attribute requires `localIdentifier` and `displayForm`.

* `localIdentifier` \(string\) is specified by the attribute's `displayForm` identifier.
* `type` \(string\) can be either `date` or `attribute`.

```javascript
// Type: IAttribute
{
    localIdentifier: '<attribute-local-identifier>',
    // Type: ObjQualifier
    displayForm: {
        identifier: '<attribute-displayForm-identifier>'    // Or URI: '<attribute-displayForm-uri>'
    },
    alias: 'My attribute'   // Optional; overrides the default attribute title
}
```

All attributes are defined using their `displayForm` identifiers.

## Filter

You can limit the execution by providing a `filters` prop to your AFM. It is an array of filters. Both global filters and measure filters are always interpreted as an intersection of all individual filters \(`f1 AND f2 AND f3...)`.

The structure of individual filters is identical to the `filters` prop that is used to filter visual components. For more information, see [Filter Visual Components](filter_visual_components.md).

```javascript
const afm = {
    ...
    // Optional; by default [];
    filters: [ filter1, filter2, ... ]
    ...
}
```

All filters are defined using the `displayForm` identifiers.

## Measure

Measures inside an AFM are represented by an array of the following objects, each of which represents a single measure:

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
    format: '#,##0.00'  // Optional; overrides the default measure format
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

To get the list of catalog items and date datasets from a GoodData project in the form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).

### Aggregation inside a measure

Each measure can specify `aggregation` of data. Aggregation is represented by a string value that defines the aggregation type.

| Type | Description |
| :--- | :--- |
| `'sum'` | Returns a sum of all numbers in the set |
| `'count'` | Counts unique values of a selected attribute in a given dataset determined by the second attribute parameter |
| `'avg'` | Returns the average value of all numbers in the set; null values are ignored |
| `'min'` | Returns the minimum value of all numbers in the set |
| `'max'` | Returns the maximum value of all numbers in the set |
| `'median'` | Counts the statistical median - an order statistic that gives the "middle" value of a sample. If the "middle" falls between two values, the function returns average of the two middle values. Null values are ignored. |
| `'runsum'` | Returns a sum of numbers increased by the sum from the previous value \(accumulating a sum incrementally\) |

### Filters in a measure definition

Each measure can be filtered by attribute filters. Filters are represented by an array of `FilterItem` objects. Measure attribute filters use the same `FilterItem` interface as [AFM global filters](afm.md).

Only one filter of the `DateFilter` type is allowed in the measure's filter definition.

When both the measure filter of the `DateFilter` type and the AFM global filter of the `DateFilter` type are set, the measure date filter overrides the AFM global date filter for this measure \(global date filters are still applied to other measures that do not have a measure date filter defined\).

### Show a measure as a percentage

When an AFM is executed on the GoodData platform, the result measure data is, by default, returned as raw values \(numbers\).

If you want the measures data to be displayed as a percentage instead, add a `computeRatio` property and set it to `true`.

When `computeRatio` is not specified, it defaults to `false`, and values from execution are displayed as numbers.

### Compare a measure over time

To compare a measure over time, add one of the supported measure types described in [Time Over Time Comparison](time_over_time_comparison.md) to `afm.measures`.

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
                                in: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Currently, attribute elements support URI only
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
                in: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Currently, attribute elements support URI only
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

Native total items must be in sync with [result specification \(ResultSpec\)](result_specification.md) and its dimension totals. If they are not in sync, it is treated as a bad execution request.

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
