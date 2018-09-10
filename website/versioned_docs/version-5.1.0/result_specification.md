---
title: Specify Result Structure
sidebar_label: Specify Result Structure
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.1.0-result_specification
original_id: result_specification
---

The structure of the result data is defined by `resultSpec`. You can add dimensionality (pivoting), totals, and sorting.

See the [type definition](https://github.com/gooddata/gooddata-typings/blob/v2.0.0/src/AFM.ts#L16).


## Dimensions

### Structure

```js
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

The `dimensions` field communicates the executor how the data is organized into arrays. Imagine an attribute in columns vs. rows. Each dimension requires the `itemIdentifiers` property, which is an array of *items*. These items could be attributes' `localIdentifier`s from the AFM or a special `measureGroup` string.

> **NOTES:**
> * Currently, you can define either *one* or *two* dimensions, with one dimension being empty. The default value for the first dimension is all attributes. The default value for the second dimension is `measureGroup`.
> * [AFM components](afm_components.md) fill `resultSpec` with an appropriate definition depending on the type of the visualization.

Each *item* consists of several *elements*. For example, the attribute 'Year' would have 2016, 2017, and so on. The same applies to `measureGroup`: its *elements* are the individual measures from the AFM. All these *elements* are sent in the `headerItems` property.

### Examples

#### AFM with one measure (*Revenue*) and one attribute (*Year*)
Data is needed in one dimension: a simple array.

```js
resultSpec.dimensions = [
{ itemIdentifiers: [ '<Year local id>', 'measureGroup' ] }
]

// `executionResult` is returned by years (that is, 2016, 2017, 2018):
{  
data: [ 32000, 41000, 77000 ]
}
```

#### AFM with two measures (*Revenue* and *Clicks*) and one attribute (*Year*)
* A typical layout of a viewBy chart is to have the attribute elements (*2016, 2017, ...*) in rows and the two measures in columns. The rows mean the first dimension of the returned array, and columns mean the second array.

  ```js
  resultSpec.dimensions = [
    { itemIdentifiers: [ '<Year local id>' ] },
    { itemIdentifiers: [ 'measureGroup' ] }
  ]

  // `executionResult` is returned with measures in the second dimension:
  {
    data: [
      [ 32000, 300 ],
      [ 41000, 345 ],
      [ 77000, 590 ]
    ]
  }
  ```

* What happens when we switch the dimensions?

  ```js
  resultSpec.dimensions = [
    { itemIdentifiers: [ 'measureGroup' ] },
    { itemIdentifiers: [ '<Year local id>' ] }
  ]

  // `executionResult` is returned with measures in the first dimension:
  {
    data: [
      [ 32000, 41000, 77000 ],
      [ 300, 345, 590 ]
    ]
  }
  ```

#### AFM with one measure (*Revenue*) and two attributes (*Year*, *Country*)
This layout is often used for a stackBy chart. It has one attribute in rows and the other in columns.

```js
resultSpec.dimensions = [
{ itemIdentifiers: [ '<Year local id>' ] },
{ itemIdentifiers: [ '<Country local id>', 'measureGroup' ] }
]

// `executionResult` is returned with two columns (for example, Czechia and USA):
{
data: [
  [ 13000, 19000 ],  // year 2016 - gives original sum of 32000
  [ 15000, 26000 ],  // year 2017 - gives original sum of 41000
  [ 31000, 36000 ]   // year 2018 - gives original sum of 77000
]
}
```

#### Cartesian product with two measures (*Revenue* and *Clicks*) and one attribute (*Year*)
In the previous example, `measureGroup` contains only one element. If two items in one dimension have more than one element, a Cartesian product is returned.

The Cartesian product works in the following way: \
`A,B × 1,2 = A1, A2, B1, B2`

* The following code sample gets revenues in years, followed by clicks in years:
  ```js
  resultSpec.dimensions = [
    { itemIdentifiers: [ 'measureGroup', '<Year local id>' ] }
  ]

  // `executionResult`:
  {
    data: [ 32000, 41000, 77000, 300, 345, 590 ]
  }
  ```
* The following code sample gets revenues in years, followed by clicks in years:
  ```js
  resultSpec.dimensions = [
    { itemIdentifiers: [ '<Year local id>', 'measureGroup' ] }
  ]

  // `executionResult`:
  {
    data: [ 32000, 300, 41000, 345, 77000, 590 ]
  }
  ```

### headerItems

Every item in dimensions has its own elements. The *labels* for each element are sent in the `executionResult.headerItems` property, which is a three-dimensional array.

Array levels:
1. **dimensions:** one or two records, one for each respective dimension in `resultSpec.dimensions`
2. **items:** one record for each item in the dimension's  `itemIdentifiers`
3. **elements:** one record for each element in an item (an attribute or `measureGroup`)
 
   The type of this record is one of the following: `IResultAttributeHeaderItem`, `IResultMeasureHeaderItem`, `IResultTotalHeaderItem`. See the [type definition file](https://github.com/gooddata/gooddata-typings/blob/v2.0.0/src/Execution.ts#L42-L63).

For example:
```js
resultSpec.dimensions = [
  { itemIdentifiers: [ '<Year local id>', 'measureGroup' ] }
]

// `executionResult`:
{  
    data: [ 32000, 41000, 77000 ]
    headerItems: [ // first dimension (we have not specified any other)
        [ 
            // first item (Year attribute)
            [ 
                // elements of the attribute
                { attributeHeaderItem: { name: "2016", ... } },
                { attributeHeaderItem: { name: "2017", ... } },
                { attributeHeaderItem: { name: "2018", ... } }
            ],
            // second item (measureGroup) 
            [
                // elements of measureGroup = the names of the measures. In this case, it is just one name.
                { measureHeaderItem: { name: "Revenue", ... } } 
            ]
        ]
    ]
}
```

For more examples, sign up to the Live Examples and watch the Network tab in your browser's Developer console. You may also experiment by sending your own `resultSpec`s: for example, use the [Postman application](https://www.getpostman.com/apps).


## Totals

Optionally, you can define totals for each dimension. Totals are used to get aggregated data over several rows or columns of measure data.

### Definition 

```js
totals: [
   {
      measureIdentifier: String, // measure local identifier, on which total is defined
      type: String,              // total type. Possible values are: [sum, max, min, avg, med, nat]
      attributeIdentifier: String // attribute local identifier in dimension defining total placement
   },
   ...
]
```

See the [type definition](https://github.com/gooddata/gooddata-typings/blob/v2.0.0/src/AFM.ts#L110-L126).

### Order of Totals

The order of total items is `[sum, max, min, avg, med, nat]` and cannot be changed.

### Limitations

Currently, the following limitations are supported:

* Table visualizations
  * First dimension with `attributes` and `totals`
  * Second dimension with `measureGroup`
* Grand totals in the first dimension
  * `total.attributeIdentifier` contains the first `attribute-local-identifier` from `itemIdentifiers`.

If you want to define a `nat` (native) total, make sure that it is in sync with the `AFM.nativeTotals` definition (see [Native totals](afm.md#native-total)).

### Defining table totals

See [Table Totals in ExecutionObject](table_totals_in_execution_context.md).

### Example

```js
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

Sorting is defined by an array of either `AttributeSortItems` or `MeasureSortItems`.

Multi-level sorting is supported by combining several sortings. For example, sort by date first, then by product name alphabetically.

You can sort specific dimension items by a data line using `measureSortItem`.

A data line is uniquely defined by the `locators` array. The data line contains a chain of elements (`attributeLocatorItem`) and optionally a measure (`measureLocatorItem`) matching the selected dimension items. For example, you can sort your data by a specific data column (sorting your product sales only by sales of a certain product).

If the selected attributes, attribute values or measures are not available (for example, by being filtered out), `measureSortItems` are omitted.

Measures are always listed in the same order in which they were defined in the AFM. Sorting measures based on their value is currently *not* supported.

### Structure

```js
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

By using `aggregation: 'sum'`, all elements of an attribute are sorted based on an aggregation function applied to all valid values belonging to each element. This is extremely useful when sorting stacked visualizations such as stack bars or area charts.

Currently, only sorting by the `sum` function is supported.

The following example shows sorting a table with two measures and a 'Year' attribute. You can set sorting based on the Year attribute with:

```js
{
    ...
    aggregation: 'sum',
    direction: 'desc'
    ...
}
```

Consider the following original data:

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
| Values | 3 | 4 | 1 | 2 |


## Quick Reference of Dimensions

<table>
<tbody>
<tr>
<th class="confluenceTh">AFM</th>
<th class="confluenceTh"><code>resultSpec.dimensions:</code></th>
<th class="confluenceTh"><code>executionResult: { }</code></th>
</tr>
<tr>
<td class="confluenceTd"><span>1 measure<br>1 attribute (A)</span></td>
<td class="confluenceTd">[<br> { itemIdentifiers: [ 'A', 'measureGroup' ] }<br>]</td>
<td class="confluenceTd"><pre><code>        A1    A2    A3     <span style="color: rgb(84,84,84)">← elements of attr A</span><br>data: [ ... , ... , ... ]&nbsp; ←&nbsp;values of the measure</code></pre></td>
</tr>
<tr>
<td class="confluenceTd" colspan="1">2 measures (M1, M2)</td>
<td colspan="1" class="confluenceTd">[<br> { itemIdentifiers: [ 'measureGroup' ] }<br>]</td>
<td colspan="1" class="confluenceTd"><pre><code>        M1    M2     <span style="color: rgb(84,84,84)">← elements of measureGroup</span><br>data: [ ... , ... ]</code></pre></td>
</tr>
<tr>
<td class="confluenceTd">2 measures (M1, M2)<br>1 attribute (A)</td>
<td class="confluenceTd">[<br> { itemIdentifiers: [ 'A', 'measureGroup' ] }<br>]</td>
<td class="confluenceTd"><pre><code>        A1-M1  A1-M2  A2-M1  A2-M2   <span style="color: rgb(84,84,84)">← cartesian product of</span><br>data: [ .... , .... , .... , .... ]    elements from A and <br>                                       measureGroup</code></pre></td>
</tr>
<tr>
<td class="confluenceTd">empty first dimension<br>+ the same as above</td>
<td class="confluenceTd"><p>[<br> { itemIdentifiers: [ ] },<br> { itemIdentifiers: [ 'A', 'measureGroup' ] }<br>]</code></pre></td>
<td class="confluenceTd"><pre><code>data: [<br>    A1    A2    A3    ← the same as above<br>  [ ... , ... , ... ]<br>]</code></pre></td>
</tr>
<tr>
<td colspan="1" class="confluenceTd"><span>2 measures (M1, M2)</span> <br> <span>1 attribute (A)<br> <br> </span>// typical for viewBy chart</td>
<td colspan="1" class="confluenceTd"><p>[<br> { itemIdentifiers: [ 'A' ] },<br> { itemIdentifiers: [ 'measureGroup' ] }<br>]</code></pre></td>
<td colspan="1" class="confluenceTd"><pre><code>data: [                  // it can be understood as data[A][M]<br>    M1    M2                aka first dimension = elems of A<br>  [ ... , ... ],  ← A1      and second = elems of measureGroup<br>  [ ... , ... ]   ← A2<br>] </code></pre></td>
</tr>
<tr>
<td colspan="1" class="confluenceTd">2 attributes (A, B)<br>1 measure (M1)<br> <br>// typical for stackBy chart</td>
<td colspan="1" class="confluenceTd"><p>[<br> { itemIdentifiers: [ 'A' ] },<br> { itemIdentifiers: [ 'B', 'measureGroup' ] }<br>]</code></pre></td>
<td colspan="1" class="confluenceTd"><pre><code>data: [                  // notice it doesn't matter in which<br>    B1-M1  B2-M1            dimension the measureGroup is<br>  [ .... , .... ],  ← A1    placed (as it has only one measure)<br>  [ .... , .... ]   ← A2<br>] </code></pre></td>
</tr>
</tbody>
</table>