---
title: Filter Visual Components
sidebar_label: Filter Visual Components
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.2.0-filter_visual_components
original_id: filter_visual_components
---

This article provides examples of filtering visual components by date and attribute values.

You can filter the `Visualization` component, `Kpi`, `Headline`, chart components, and table components with the `filters` prop. The `filters` prop is an array of attribute filters and date filters. You can make the filters dynamic with the [`AttributeFilter`](attribute_filter_component.md) or [`AttributeElements`](create_custom_attribute_filter.md) components.

The same `filters` are used in AFM (for details, see [Set Up an AFM Query](afm.md)).

Both global filters and filters set on measures are always interpreted as an intersection of all individual filters \(`f1 AND f2 AND f3...)`.

## Attribute filter

### Positive attribute filter

A **positive attribute filter** lists only those items whose attribute elements' URIs are included in the `in` property array.

```javascript
// Type: IPositiveAttributeFilter
{
    positiveAttributeFilter: {
        displayForm: {
            identifier: '<attribute-displayForm-identifier>' // Or URI: '<attribute-displayForm-uri>'
        },
        in: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Attribute elements currently support only URIs
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
        notIn: ['<attribute-element-uri-1>', '<attribute-element-uri-2>'] // Attribute elements currently support only URIs
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
            identifier: '<attribute-display-form-identifier>'
        },
        from: '<YYYY-MM-DD>',
        to: '<YYYY-MM-DD>'
    };
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

## Filters set on a specific measure

Applying a filter to a specific measure is helpful when you have duplicate measures with different filters.

To apply a filter to a specific measure, pass an array of attribute filters or date filters as the `filters` prop inside the definition of this measure.

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
                                    // Attribute elements currently support only URIs like: /gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2210/elements?id=6340116
                                    in: ['<attribute-value-uri>', ...]
                                }
                            }
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

```javascript
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
                    // Attribute elements currently support only URIs like: /gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2210/elements?id=6340116
                    in: ['<attribute-element-uri>', ...]
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
                    // Attribute elements currently support only URIs
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
