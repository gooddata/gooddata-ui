---
title: Filter Visual Components
sidebar_label: Filter Visual Components
copyright: (C) 2007-2020 GoodData Corporation
id: filter_visual_components
---

This article provides examples of filtering visual components by attribute, date, and measure values.

You can filter the `Visualization` component, `Kpi`, `Headline`, chart components, and table components with the `filters` prop. The `filters` prop is an array of attribute filters and date filters. You can make the filters dynamic with the [`AttributeFilter`](10_vis__attribute_filter_component.md), [`AttributeElements`](30_tips__create_custom_attribute_filter.md), [`DateFilter`](10_vis__date_filter_component.md), and [`MeasureValueFilterDropdown`](10_vis__measure_value_filter_component.md) components.

Both global filters and filters set on measures are always interpreted as an intersection of all individual filters \(`f1 AND f2 AND f3...)`.

## Attribute filter

All filters are defined using the `displayForm` identifiers. Attribute filters (both `positiveAttributeFilter` and `negativeAttributeFilter`) can be defined to match attribute elements by their URI (this is the default) or value (text filter).
To use text filters, define the `textFilter` property of the filter and use values instead of URIs in the `in` or `notIn` arrays. 

Attribute filters (both `positiveAttributeFilter` and `negativeAttributeFilter`) can be defined to match attribute elements by their value (this is the default) or by URI.  

If you need to escape characters while using text filters, make sure that the input for a filter is escaped correctly. Incorrectly escaped input may cause errors.

Characters that are prone to mistakes are `"` and `\`. For example, if you want to filter out this exact string: `Foo\"`, enter it as `'Foo\\"'` or `"Foo\\\""`, which will result in `"Foo\\\""`. The browser will send `"Foo\\\""` to the server where `"Foo\\\""` will be queried as `Foo\"`.

**NOTE:** Single quotes and double quotes behave differently while escaping characters.

### Positive attribute filter

A **positive attribute filter** lists only those items whose attribute elements' URIs are included in the `in` property array.

```javascript
// Type: IPositiveAttributeFilter
{
    positiveAttributeFilter: {
        displayForm: {
            identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
        },
        in: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Attribute element URIs
    }
},
```

A **positive attribute text filter** lists only those items whose attribute elements are included in the `in` property array.

```javascript
// Type: IPositiveAttributeFilter
{
    positiveAttributeFilter: {
        displayForm: {
            identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
        },
        in: ['<attribute-element-value-1>', '<attribute-element-value-2>'], // Attribute element values
        textFilter: true
    }
},
```

### Negative attribute filter

A **negative attribute filter** lists only those items whose attribute elements' URIs are *not* included in the `notIn` property array.

```javascript
// Type: INegativeAttributeFilter
{
    negativeAttributeFilter: {
        displayForm: {
            identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
        },
        notIn: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Attribute element URIs
    }
},
```

A **negative attribute text filter** lists only those items whose attribute elements are *not* included in the `notIn` property array.

```javascript
// Type: INegativeAttributeFilter
{
    negativeAttributeFilter: {
        displayForm: {
            identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
        },
        notIn: ['<attribute-element-value-1>', '<attribute-element-value-2>'], // Attribute element values
        textFilter: true
    }
},
```

## Date filter

### Absolute date filter

An **absolute date filter** shows data that falls within a defined time range.

```javascript
// Type: IAbsoluteDateFilter
{
    absoluteDateFilter: {
        dataSet: {
            identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
        },
        from: '<YYYY-MM-DD>',
        to: '<YYYY-MM-DD>'
    }
}
```

### Relative date filter

A **relative date filter** shows data that falls within a time range defined relatively to the current date. Filter granularity (`granularity`) defines how a time range can be broken down to smaller time units (week, month, quarter, and so on).

`granularity` can be set to:

| Value | Description |
| :--- | :--- |
| `'GDC.time.date'` | Days |
| `'GDC.time.week'` | Weeks starting on Monday |
| `'GDC.time.week_us'` | Weeks starting on Sunday |
| `'GDC.time.month'` | Months
| `'GDC.time.quarter'` | Quarters of a year |
| `'GDC.time.year'` | Years |

The `from` and `to` properties set the number of granularity units (for example, weeks) before or after the current date. That is, `from` and `to`  define the filter range.

* `0` for the current day, week, month, quarter, or year \(depending on the chosen granularity\)
* `-1` for the previous period
* `-n` for the *n*th previous period

### Relative filter examples

**Last 7 days \(yesterday and 6 days before\):**

```javascript
// Type: IRelativeDateFilter
{
    relativeDateFilter: {
        dataSet: {
            identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
        },
        granularity: 'GDC.time.date',   // Supported values: 'GDC.time.date' | 'GDC.time.week' | 'GDC.time.week_us' | 'GDC.time.month' | 'GDC.time.quarter' | 'GDC.time.year'
        from: -7,   // Positive or negative integers
        to: -1  // Positive or negative integers
    }
}
```

**Last 12 months including the current month**

```javascript
// Type: IRelativeDateFilter
{
    relativeDateFilter: {
        dataSet: {
            identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
        },
        granularity: 'GDC.time.month',  // Supported values: 'GDC.time.date' | 'GDC.time.week' | 'GDC.time.week_us' | 'GDC.time.month' | 'GDC.time.quarter' | 'GDC.time.year'
        from: -11,  // Positive or negative integers
        to: 0   // Positive or negative integers
    }
}
```

**Last quarter only**

```javascript
// Type: IRelativeDateFilter
{
    relativeDateFilter: {
        dataSet: {
            identifier: '<date-dataset-identifier>' // Or URI: '<date-dataset-uri>'
        },
        granularity: 'GDC.time.quarter',    // Supported values: 'GDC.time.date' | 'GDC.time.week' | 'GDC.time.week_us' | 'GDC.time.month' | 'GDC.time.quarter' | 'GDC.time.year'
        from: -1,   // Positive or negative integers
        to: -1  // Positive or negative integers
    }
}
```     

## Filter by a measure value

You can filter a visualization by the value of a measure. You can filter only the measures that are present in the visualization, on a granularity defined by the attributes in the visualization.

> **NOTES:**
> * The numbers rendered by a visualization are often rounded up/down. However, filters are applied to the original exact numbers (those before rounding), and that may lead to unexpected results. For example, the number `400.01` rounded to a whole number would be `400`, but it will still be included in the visualization with a filter that filters out the values smaller than or equal to `400`.
> * A [rollup total](30_tips__table_totals.md) is not supported in visualizations with measure value filters. Such visualizations are not rendered, and the error message is shown instead.

### Filtering by comparing a measure value to a specific value

When you filter a measure by comparing its value to some predefined value, the filter shows only the data whose measure matches a comparison condition.

```javascript
// Type: IMeasureValueFilter
{
    measureValueFilter: {
        measure: {
            localIdentifier: '<measure-localIdentifier>'
        },
        condition: {
            comparison: {
                operator: 'GREATER_THAN',
                value: 200
            }
        }
    }
},
```

You can set `operator` to one of the following:

* `'GREATER_THAN'`: The measure value is greater than `value`.
* `'GREATER_THAN_OR_EQUAL_TO'`: The measure value is greater than `value` or equal to `value`.
* `'LESS_THAN'`: The measure value is less than `value`.
* `'LESS_THAN_OR_EQUAL_TO'`: The measure value is less than `value` or equal to `value`.
* `'EQUAL_TO'`: The measure value is equal to `value`.
* `'NOT_EQUAL_TO'`: The measure value is not equal to `value`.

### Filtering by comparing a measure value to a value range

When you filter a measure by comparing its value against some predefined range of values, the filter shows only the data whose measure matches a range condition.

```javascript
// Type: IMeasureValueFilter
{
    measureValueFilter: {
        measure: {
            localIdentifier: '<measure-localIdentifier>'
        },
        condition: {
            range: {
                operator: 'BETWEEN',
                from: 100,
                to: 300
            }
        }
    }
},
```

You can set `operator` to one of the following:

* `'BETWEEN'`: The measure value is between the `from` and `to` values (including the boundaries).
* `'NOT_BETWEEN'`: The measure value is not between the `from` and `to` values (excluding the boundaries).

### Filtering by a percentage measure

You can use several methods to get measures to be rendered as a percentage. Depending on the method you used, measure value filters applied to such measures behave differently.

#### Measures shown in %
When a visualization is filtered by a measure that is shown in % (that is, the measure has `computeRatio=true`), the filter value is based on the range of the actual measure values and not on the percentage values rendered by the visualization.

For example, if the visualization renders the values `100`, `200`, and `700` as `10%`, `20%`, and `70%`, the filter that filters out the first two values would use a comparison condition with the operator `GREATER_THAN` and the condition value `200`. The result would contain only the value `700` rendered as `100%` in the visualization.

The reason is that the percentage values are always computed for the current execution result. By applying the measure value filter, the result changes and so the percentage values will change as well. That would result in the filter and the values displayed to have a different scale which would be confusing. For instance, accepting only values lower than 50% could still produce insights with values higher than 50%.

#### Measures in charts stacked to 100%
When a visualization is filtered by a measure that is stacked to 100%, the filter value is based on the range of the actual measure values and not on the percentage values rendered by the visualization.

The example and the reason behind this behavior are similar to those described above for the measures shown in %.

#### Measures formatted in %  
When a visualization is filtered by a measure that is formatted in %, the filter value is based on the percentage values rendered by the visualization and not on the range of the actual measure values.

For example, if the visualization renders the formatted values `100%`, `20%`, and `3%`, the filter that filters out only one value would use the operator `NOT_EQUAL_TO` and the filter values `1`, `0.2`, or `0.03`, respectively.

This applies to the following types of measures:
* Measures that have the percentage format set by the `format` measure property
* Calculated measures with the percentage format set in the metadata catalog
* Arithmetic measures with the `change` operator that has the percentage property `format` set

#### Treating null values as numbers
By default, any filter condition filters out null values. If you want a filter condition to treat null values as a number and to include them in the filtering process, add the optional `treatNullValuesAs` property to this condition and set it to that number.
For instance, you can treat null values as 0 to be accepted by a less than 100 condition:

```javascript
// Type: MeasureValueFilterCondition
{
    comparison: {
        operator: 'LESS_THAN',
        value: 100,
        treatNullValuesAs: 0
    }
}
```

## Filter set on a specific measure

Applying a filter to a specific measure is helpful when you have duplicate measures with different filters.

To apply a filter to a specific measure, pass an array of attribute filters or date filters as the `filters` prop inside the definition of this measure. Attribute filters (both `positiveAttributeFilter` and `negativeAttributeFilter`) can be defined to match attribute elements by their URI (this is the default) or value (text filter).

* When both the measure filter of the `DateFilter` type and the AFM global filter of the `DateFilter` type are set with the **same** date dimension, the measure date filter overrides the AFM global date filter for this measure \(global date filters are still applied to other measures that do not have a measure date filter defined\).
* When the measure filter of the DateFilter type and the AFM global filter of the DateFilter type are set with **different** date dimensions, the filters are interpreted as an intersection of those filters (f1 AND f2).

```jsx
<div style={{ height: 300 }}>
    <ColumnChart
        projectId="<project-id>"
        measures={[{
            measure: {
                localIdentifier: 'totalSales',
                definition: {
                    measureDefinition: {
                        item: {
                            identifier: '<measure-identifier>'
                        },
                        filters: [
                            {
                                positiveAttributeFilter: {
                                    displayForm: {
                                        identifier: '<attribute-displayform-identifier>'
                                    },
                                    // Attribute element URIs
                                    in: ['<attribute-element-uri>', ...]
                                }
                            },
                            {
                                positiveAttributeFilter: {
                                    displayForm: {
                                        identifier: '<attribute-displayform-identifier>'
                                    },
                                    // Attribute element values
                                    in: ['<attribute-element-value>', ...],
                                    textFilter: true
                                }
                            },
                        ],
                    }
                },
                alias: 'California sales'
            }
        }]}
    />
</div>
```

## Filter examples

### Visualization component filter

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';

<div style={{ height: 400, width: 600 }}>
    <Visualization
        identifier="<visualization-identifier>"
        projectId="<project-id>"
        filters={[
            {
                positiveAttributeFilter: {
                    displayForm: {
                        identifier: '<attribute-displayform-identifier>'
                    },
                    // Attribute element URIs
                    in: ['<attribute-element-uri>', ...]
                }
            },
            {
                positiveAttributeFilter: {
                    displayForm: {
                        identifier: '<attribute-displayform-identifier>'
                    },
                    // Attribute element values
                    in: ['<attribute-element-value>', ...],
                    textFilter: true
                }
            }
        ]}
    />
</div>
```

If you reference a saved visualization with active filters and set the `filters` prop on the Visualization component, both sets of filters will be merged using the following rules:

* If the active filter in the saved visualization and the filter defined with the `filters` prop have the same object qualifier (identifier or URI), the filter defined with the `filters` prop overwrites the active filter in the saved visualization.
* All other filters, both saved and from the `filters` prop, will be added.

### Chart component filter

```jsx
<div style={{ height: 300 }}>
    <ColumnChart
        projectId="<project-id>"
        measures={[{
            measure: {
                localIdentifier: 'totalSales',
                definition: {
                    measureDefinition: {
                        item: {
                            identifier: '<measure-identifier>'
                        }
                    }
                }
            }
        }]}
        filters={[
            {
                negativeAttributeFilter: {
                    displayForm: {
                        identifier: '<attribute-displayform-identifier>'
                    },
                    // Attribute element URIs
                    notIn: ['/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2210/elements?id=6340116']
                }
            }
        ]}
    />
</div>
```

### AttributeFilter

`AttributeFilter` renders a dropdown list of all values of the selected attribute. `AttributeFilter` has the `onApply` function property. This function is called when the user clicks the Apply button in the filter dropdown. The function receives an attribute filter with either the selected attribute values (positive filter) or not selected attribute values (negative filter).

```jsx
import React, { Component } from 'react';
import { AttributeFilter, ColumnChart } from '@gooddata/react-components';

import '@gooddata/react-components/styles/css/main.css';

export class AttributeFilterExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: []
        };
    }

    onApply = (filter) => {
        console.log('AttributeFilterExample filter', filter);

        const isPositive = !!filter.in;
        const elementsProp = isPositive ? 'in' : 'notIn';

        const filters = [{
            [isPositive ? 'positiveAttributeFilter' : 'negativeAttributeFilter']: {
                displayForm: {
                    uri: filter.id
                },
                [elementsProp]: filter[elementsProp].map(element => (`<attribute-uri>/elements?id=${element}`))
            }
        }];

        this.setState({ filters });
    }

    render() {
        const { filters } = this.state;
        return (
            <div>
                <AttributeFilter
                    identifier="<attribute-displayform-identifier>"
                    projectId={projectId}
                    fullscreenOnMobile={false}
                    onApply={this.onApply}
                />
                <div style={{ height: 300 }}>
                    <ColumnChart
                        projectId="<project-id>"
                        measures={[{
                            measure: {
                                localIdentifier: 'totalSales',
                                definition: {
                                    measureDefinition: {
                                        item: {
                                            identifier: '<measure-identifier>'
                                        }
                                    }
                                }
                            }
                        }]}
                        filters={filters}
                    />
                </div>
            </div>
        );
    }
}
```

See the [live example](https://gooddata-examples.herokuapp.com/attribute-filter-components).

### AttributeElements

Pass a custom children function to `AttributeElements`. This function will receive a parameter with a list of attribute values for the selected attribute. You can use it to render any custom attribute filter.

```jsx
<AttributeElements
    identifier="<attribute-displayform-identifier>"
    projectId="<project-id>"
    options={{ limit: 20 }}
>
    {({ validElements, loadMore, isLoading, error }) => {
        const {
            offset = null,
            count = null,
            total = null
        } = validElements ? validElements.paging : {};
        if (error) {
            return <div>{error}</div>;
        }
        const filters = validElements
            ? [{
                positiveAttributeFilter: {
                    displayForm: {
                        identifier: '<attribute-displayform-identifier>'
                    },
                    in: validElements.items.map(item => (
                       item.element.uri
                    ))
                }
            }]
            : [];
        return (
            <div>
                <div>
                    {validElements ? validElements.items.map(item => (
                       item.element.title
                    )).join(', ') : null}
                </div>
                <button
                    onClick={loadMore}
                    disabled={isLoading || (offset + count === total)}
                >More
                </button>
                <ColumnChart
                    projectId="<project-id>"
                    measures={[{
                        measure: {
                            localIdentifier: 'totalSales',
                            definition: {
                                measureDefinition: {
                                    item: {
                                        identifier: '<measure-identifier>'
                                    }
                                }
                            }
                        }
                    }]}
                    filters={filters}
                />
            </div>
        );
    }}
</AttributeElements>
```

See the [live example](https://gooddata-examples.herokuapp.com/attribute-filter-components).
