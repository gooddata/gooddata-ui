---
title: Result Specification (resultSpec)
sidebar_label: Result Specification
copyright: (C) 2007-2018 GoodData Corporation
id: result_specification
---

`ResultSpec` is an object that defines the requested structure of result data. You can define dimensions and sorting.

## Dimensions

### Structure

```javascript
// Type: IResultSpec
{
    // Optional; Defaults to two dimensions – first with attributes, second with 'measureGroup'
    dimensions: [
        {
            itemIdentifiers: [ '<attribute-local-identifier>' ], // array of localIdentifiers or 'measureGroup' string
            totals: []  // Optional; Defaults to []
        }
    ],
    sorts: []   // Optional; Defaults to []
}
```

Dimensions organize the result `data` and `headerItems`. Each dimension requires the `itemIdentifiers` property, which is an array of `items`: attributes' `localIdentifier`s from the AFM or a special `measureGroup` string. You can define one or two dimensions, where one can be empty. The default is two dimensions: all attributes in one and `measureGroup` in the other.

AFM components fill `resultSpec` with an appropriate definition depending on the type of the visualization. Most likely, you will not have to change it.

Each `item` consists of several `elements`. For example, the attribute 'Year' would have 2016, 2017, and so on. The same applies to `measureGroup`: its elements are individual measures from the AFM. All these `elements` are sent in the `headerItems` property.

To understand how a dimension works, see the following examples:

| AFM | \#dims | `resultSpec.dimensions:` | `executionResult: { }` |
| :--- | :--- | :--- | :--- |
| 1 measure 1 attribute (A) | 1 | \[ { itemIdentifiers: \[ 'A', 'measureGroup' \] } \] |         A1    A2    A3     ← elements of attr A data: \[ ... , ... , ... \]  ← values of the measure |
| 2 measures (M1, M2) | 1 | \[ { itemIdentifiers: \[ 'measureGroup' \] } \] |         M1    M2     ← elements of measureGroup data: \[ ... , ... \] |
| 2 measures (M1, M2) 1 attribute (A) | 1 | \[ { itemIdentifiers: \[ 'A', 'measureGroup' \] } \] |         A1-M1  A1-M2  A2-M1  A2-M2   ← carthesian product of data: \[ .... , .... , .... , .... \]     elements from A and                                          measureGroup |
| empty first dimension + the same as above | 2 | \[ { itemIdentifiers: \[ \] }, { itemIdentifiers: \[ 'A', 'measureGroup' \] } \] | data: \[     A1    A2    A3    ← the same as above   \[ ... , ... , ... \] \] |
| 2 measures (M1, M2) 1 attribute (A)  // typical for viewBy chart | 2 | \[ { itemIdentifiers: \[ 'A' \] }, { itemIdentifiers: \[ 'measureGroup' \] } \] | data: \[                  // it can be understood as data\[A\]\[M\]     M1    M2                aka first dimension = elems of A   \[ ... , ... \],  ← A1     and second = elems of measureGroup   \[ ... , ... \]   ← A2 \]  |
| 2 attributes (A, B) 1 measure (M1)  // typical for stackBy chart | 2 | \[ { itemIdentifiers: \[ 'A' \] }, { itemIdentifiers: \[ 'B', 'measureGroup' \] } \] | data: \[                  // notice it doesn't matter in which     B1-M1  B2-M1            dimension the measureGroup is   \[ .... , .... \],  ← A1    placed (as it has only one measure)   \[ .... , .... \]   ← A2 \]  |

The `data` property is indexed only by integers. The elements' text labels are sent in the `headerItems` property, which is a three-dimensional array, where:

* First level has the dimensions: one or two records, one for each respective dimensions in `resultSpec.dimensions`.
* Second level has the items: one record for each item in the dimension's  `itemIdentifiers`.
* Third level has the elements: one record for each element in the individual item (attribute or `measureGroup`).

The type of the deepest record is one of the following:

* `IResultAttributeHeaderItem`
* `IResultMeasureHeaderItem`
* `IResultTotalHeaderItem`

See the @gooddata/typings [typescript defintion file](https://github.com/gooddata/gooddata-typings/blob/master/index.ts#L254).

### Totals

Optionally, you can define dimension totals. Totals are used to get aggregated data over several rows or columns of measure data.

#### Definition

```javascript
totals: [
   {
      measureIdentifier: String // measure local identifier on which is total defined
      type: String              // total type. Possible values are: [sum, max, min, avg, med, nat]
      attributeIdentifier: String // attribute local identifier in dimension defining total placement
   },
   ...
]
```

#### Totals order limits

Currently, the order of total items is `[sum, max, min, avg, med, nat]` and cannot be changed.

#### Limitations

Only the following are currently supported:

* Table visualizations
  * First dimension with `attributes` and `totals`
  * Second dimension with `measureGroup`
* Grand totals in the first dimension
  * `total.attributeIdentifier` contains the first `attribute-local-identifier` from `itemIdentifiers`.

If you want define 'nat'(native) total, make sure that it is in sync with the AFM.nativeTotals definition (see[Native totals](afm.md#AFM-NativeTotal)).

#### Defining table totals

See [Table Totals in ExecutionObject](table_totals_in_execution_context.md).

#### Example

```javascript
{
    dimensions: [
        {
            itemIdentifiers: ['<attribute-local-identifier-1>', '<attribute-local-identifier-2>']
            totals: [
                {
                    measureIdentifier: '<measure-local-identifier-1>',
                    type: 'avg',
                    attributeIdentifier: '<attribute-local-identifier-1>'
                },
                {
                    measureIdentifier: '<measure-local-identifier-2>',
                    type: 'nat',
                    attributeIdentifier: '<attribute-local-identifier-1>'
                }
                ...
            ]
        },
        {
            itemIdentifiers: ['measureGroup']
        }
    ]
}
```

## Sorting

Sorting is defined by an array ofeither `AttributeSortItems` or `MeasureSortItems`.

Multi-level sorting is supported by combining several sortings. For example, sort by date first, then by product name alphabetically.

You can sort specific dimension items by data line using `measureSortItem`. A data line is uniquely defined by the `locators` array. The data line contains a chain of elements (`attributeLocatorItem`) and optionally a measure (`measureLocatorItem`) matching the selected dimension items. For example, you can sort your data by a specific data column (sorting your product sales only by sales of a certain product).

If the selected attributes, attribute values or measures are not available (for example, by being filtered out), `measureSortItems` are omitted.

Measures are always listed in the same order they were defined in the AFM. Sorting measures based on their value is currently_not_supported.

### Structure

```javascript
{
    ...
    // Type SortItem[]
    sorts: [
        // Type: IAttributeSortItem
        {
            attributeSortItem: {
                direction: 'asc',   // or 'desc',
                attributeIdentifier: '<attribute-local-identifier>',
                aggregation: 'sum' // Optional;
            }
        },
        // Type: IMeasureSortItem
        {
            measureSortItem: {
                direction: 'asc',   // or 'desc',
                // Type: LocatorItem[]
                locators: [
                    attributeLocatorItem: {
                        attributeIdentifier: '<attribute-local-identifier>',
                        element: '<attribute-value-uri>'
                    };
                ]
            }
        }
    ]
    ...
}
```

### Aggregation

By using `aggregation: 'sum'`, all elements of an attribute are sorted based on an aggregation function applied to all valid values belonging to each element. This is extremely useful when sorting stacked visualizations like stack bars or area charts.

Currently, only sorting by the `sum` function is supported.

The following is an example of sorting a table with two measures and a 'Year' attribute. You can set sorting based on the Year attribute with:

```javascript
{
    ...
    aggregation: 'sum',
    direction: 'desc'
    ...
}
```

Consider original data:

| Year | 2006 | 2006 | 2007 | 2007 |
| :--- | :--- | :--- | :--- | :--- |
| Measures | M1 | M2 | M1 | M2 |
| Values | 1 | 2 | 3 | 4 |

The sorting function (`sum`) is applied to all attribute element values for each attribute element (2006 and 2007). Notice that you are summing up values across different measures (M1 and M2):

| 2006 | 2007 |
| :--- | :--- |
| 1 + 2 = 3 | 3 + 4 = 7 |

Attribute values are then sorted by this computed value (3 and 7, respectivelly):

| Year | 2007 | 2007 | 2006 | 2006 |
| :--- | :--- | :--- | :--- | :--- |
| Measures | M1 | M2 | M1 | M2 |
| Values | 3 | 4 | 1 | 4 |

## Examples

### Table

```javascript
{
    dimensions: [
        {
            itemIdentifiers: ['<attribute-local-identifier-1>', '<attribute-local-identifier-2>']
        },
        {
            itemIdentifiers: ['measureGroup']
        }
    ]
}
```

### Chart with View by Attribute

```javascript
{
    dimensions: [
        {
            itemIdentifiers: ['measureGroup']
        },
        {
            itemIdentifiers: ['<view-by-attribute-local-identifier>']
        }
    ]
}
```

### View by + stack by chart

```javascript
{
    dimensions: [
        {
            itemIdentifiers: ['<stack-by-attribute-local-identifier>']
        },
        {
            itemIdentifiers: ['<view-by-attribute-local-identifier>', 'measureGroup']
        }
    ]
}
```

### Pie chart with measures only

```javascript
{
    dimensions: [
        {
            itemIdentifiers: []
        },
        {
            itemIdentifiers: ['measureGroup']
        }
    ]
}
```
