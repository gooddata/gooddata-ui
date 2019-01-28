---
id: version-6.2.0-model_helpers
title: Model Helpers
sidebar_label: Model Helpers
copyright: (C) 2018-2019 GoodData Corporation
original_id: model_helpers
---

GoodData.UI helpers allow you to easily create various objects for your visualizations, such as measures, measure filters, attributes, and sort items.

The helpers are available from `import { Model } from '@gooddata/react-components';`.

## How the helpers work

Imagine that you want to use a measure in your visualization. Without the helpers, you need to write code similar to this:

```js harmony
const measure = {
    measure: {
        localIdentifier: 'someLocalIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'someMeasureIdentifier'
                }
            }
        },
        format: '#,##0',
        alias: 'Awesome alias'
    }
};
```

Unless you use a static type checker (for example, TypeScript), writing such code may be tedious and prone to errors.  With the helpers, you can achieve the same result easier and in a less error-prone manner:

```js harmony
import { Model } from '@gooddata/react-components';

const myMeasure = Model.measure('someMeasureIdentifier')
    .localIdentifier('someLocalIdentifier')
    .format('#,##0')
    .alias('Awesome alias');
```

## Measure helpers

You can use the following measure helpers:

* `measure` for standard measures
* `arithmeticMeasure` for [arithmetic measures](arithmetic_measure.md)
* `popMeasure` for [period over period measures](time_over_time_comparison.md#comparing-to-the-same-period-sp-previous-year)
* `previousPeriodMeasure` for [previous period measures](time_over_time_comparison.md#comparing-to-the-previous-period-pp)

Because all the measure types have several properties in common, GoodData.UI provides methods for optionally setting those in all the measure helpers:

* `alias(aliasValue)` for setting the alias
* `format(formatString)` for setting the format
* `localIdentifier(identifier)` for setting the localIdentifier
* `title(measureTitle)` for setting the title

**NOTE:** If you do not explicitly specify the `localIdentifier`, a unique one will be automatically generated for you.

### measure helper

This helper creates a measure. You can use it for most of the measures.

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const myMeasure = Model.measure('someMeasureIdentifier');
/*
equivalent to
{
    measure: {
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'someMeasureIdentifier'
                }
            }
        },
    }
};
*/
```

The `measure(identifier)` function takes one argument that can either be a measure identifier or URI. `measure` automatically detects the identifier type and sets the proper value.

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const idMeasure = Model.measure('foo');
/*
equivalent to
{
    measure: {
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'foo'
                }
            }
        }
    }
}
*/
const uriMeasure = Model.measure('/bar/baz');
/*
equivalent to
{
    measure: {
        definition: {
            measureDefinition: {
                item: {
                    uri: '/bar/baz'
                }
            }
        }
    }
}
*/
```

In addition to the common measure builder methods, `measure` also has the following methods:

* `filters(...filters)` for setting up measure filters (you can also use [filter helpers](#filter-helpers) for creating filter objects)
* `aggregation(aggregationType)` for setting the measure aggregation type (`sum`, `max`, and so on)
* `ratio()` for setting the `computeRatio` flag to `true` (to display the measure value as a percentage instead of a number)

### arithmeticMeasure helper

This helper creates [arithmetic measures](arithmetic_measure.md).

The helper takes the following parameters:

* `measureIdentifiers` is an array of localIdentifiers of the measures included in the calculation.
* `operation` is the operation to apply to the measures (for the the possible values, see [Supported operations](arithmetic_measure.md#supported-operations)).

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const m1 = Model.measure(franchiseFeesAdRoyaltyIdentifier)
    .localIdentifier('m1');

const m2 = Model.measure(franchiseFeesIdentifierOngoingRoyalty)
    .localIdentifier('m2');

const m1plusM2 = Model.arithmeticMeasure(['m2', 'm1'], 'sum')
    .title('M1 M2 Sum');
/*
m1plusM2 is equivalent to
{
    measure: {
        definition: {
            arithmeticMeasure: {
                measureIdentifiers: ['m2', 'm1'],
                operator: 'sum'
            }
        },
        title: 'M1 M2 Sum'
    }
}
*/
```

### popMeasure helper

This helper creates [period over period measures](time_over_time_comparison.md#comparing-to-the-same-period-sp-previous-year).

The helper takes the following parameters:

* `measureIdentifier` is the local identifier of the measure that the PoP measure relates to.
* `popAttribute` is the identifier of the attribute that the PoP measure should use (either a string or URI).

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const baseMeasure = Model.measure(totalSalesIdentifier)
    .localIdentifier('totalSales')
    .alias('$ Total Sales');

const pop = Model.popMeasure('totalSales', yearDateDataSetAttributeIdentifier)
    .alias('$ Total Sales - SP year ago');
/*
pop is equivalent to
{
    measure: {
        definition: {
            popMeasureDefinition: {
                measureIdentifier: 'totalSales',
                popAttribute: { identifier: yearDateDataSetAttributeIdentifier }
            }
        }
    }
}
*/
```

### previousPeriodMeasure helper

This helper creates [previous period measures](time_over_time_comparison.md#comparing-to-the-previous-period-pp).

The helper takes the following parameters:

* `measureIdentifier` is the local identifier of the measure that the previous period measure relates to.
* `dateDataSets` is an array of dataset objects: `{ dataSet: 'DATA_SET_IDENTIFIER_OR_URI', periodsAgo: PERIOD_COUNT }`.

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const baseMeasure = Model.measure('someMeasure')
    .localIdentifier('totalSales');

const ppMeasure = Model.previousPeriodMeasure(
    'totalSales', [{ dataSet: '/foo/bar/baz', periodsAgo: 1 }]
);
/*
ppMeasure is equivalent to
{
    measure: {
        definition: {
            previousPeriodMeasure: {
                measureIdentifier: 'totalSales',
                dateDataSets: [{ dataSet: { uri: '/foo/bar/baz' }, periodsAgo: 1 }]
            }
        }
    }
}
*/
```

## Filter helpers

You can add filters to a measure. To create a filter object, use the following helper functions:

* `positiveAttributeFilter(attributeIdentifier, values)` for specifying a set of values of an attribute that **must** be included
* `negativeAttributeFilter(attributeIdentifier, values)` for specifying a set of values of an attribute that **must NOT** be included
* `absoluteDateFilter(identifier, from, to)` for a filter with set date boundaries (for example, 10/10/2018 – 11/11/2018)
* `relativeDateFilter(identifier, granularity, from, to)` for a filter with relative date boundaries (for example, last two quarters)

The following example shows all these functions used:

```js harmony
import { Model } from '@gooddata/react-components';

// filters employees to only the employee specified
const positiveFilter = Model.positiveAttributeFilter(
    employeeNameIdentifier, [selectedEmployeeUri]
);

// filters employees to all the employees BUT the employee specified
const negativeFilter = Model.negativeAttributeFilter(
    employeeNameIdentifier, [selectedEmployeeUri]
);

// filters only the data from 2018
const absoluteDate = Model.absoluteDateFilter(
    dateDataSetUri, '2018-01-01T00:00:00', '2018-12-31T23:59:59'
);

// filters only the data from the last but one quarter
const relativeDate = Model.relativeDateFilter(dateDataSetUri, 'GDC.time.year', -2, -1);

// using the filters in a measure
const myMeasure = Model.measure('foo').filters(positiveFilter, absoluteDate);
/*
myMeasure is equivalent to
{
    measure: {
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'foo'
                },
                filters: [
                    {
                        positiveAttributeFilter: {
                            displayForm: {
                                identifier: employeeNameIdentifier
                            },
                            in: [selectedEmployeeUri]
                        }
                    },
                    {
                        absoluteDateFilter: {
                            dataSet: {
                                uri: dateDataSetUri
                            },
                            from: '2018-01-01T00:00:00',
                            to: '2018-12-31T23:59:59'
                        }
                    }
                ]
            }
        }
    }
}
*/
```

## Attribute helper

This helper creates attributes.

The helper takes one parameter, `attribute(displayForm)`, where `displayForm` is either an identifier or URI.

The resulting value has two customization methods:

* `alias(aliasValue)` for setting the alias
* `localIdentifier(identifier)` for setting the localIdentifier

**NOTE:** If you do not explicitly specify the `localIdentifier`, a unique one will be automatically generated for you.

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const attribute = Model.attribute('foo').alias('My alias');
/*
equivalent to
{
    visualizationAttribute: {
        alias: 'My alias',
        displayForm: {
            identifier: 'foo'
        },
        localIdentifier: 'va_0',
    }
}
*/
```

## Sort items helpers

You can use the following sort items helpers:

* `attributeSortItem` for creating attribute [sort items](result_specification.md#sorting)
* `measureSortItem` for creating measure [sort items](result_specification.md#sorting)

### attributeSortItem helper

This helper creates attribute sort items.

The helper takes the following parameters:

* `attributeIdentifier` is the attribute's local identifier.
* `direction` specifies the sorting direction (`'asc'` for ascending, `'desc'` for descending).

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const rows = [Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier('menu')];

const sortBy = [Model.attributeSortItem('menu', 'asc')];
/*
sortBy is equivalent to
[
    {
        attributeSortItem: {
            attributeIdentifier: 'menu',
            direction: 'asc'
        }
    }
]
*/
```

### measureSortItem helper

This helper creates measure sort items.

The helper takes the following parameters:

* `measureIdentifier` is the measure's local identifier
* `direction` specifies the sorting direction (`'asc'` for ascending, `'desc'` for descending)

The resulting object has one customization method, `attributeLocators(...locators)`, that adds specified attribute locators. The attribute locators are objects with the following properties:
  * `attributeIdentifier` is an identifier or an URI.
  * `element` is the attribute element identifier or URI.

**Example:**

```js harmony
import { Model } from '@gooddata/react-components';

const measure = Model.measure(totalSalesIdentifier).localIdentifier(totalSalesIdentifier);

const stackBy = Model.attribute(locationStateDisplayFormIdentifier)
    .localIdentifier(locationStateDisplayFormIdentifier);

const sortBy = Model.measureSortItem(totalSalesIdentifier, 'asc')
    .attributeLocators({
        attributeIdentifier: locationStateDisplayFormIdentifier,
        element: locationStateAttributeCaliforniaUri
    });
/*
sortBy is equivalent to
{
    measureSortItem: {
        direction: 'asc',
        locators: [
            {
                attributeLocatorItem: {
                    attributeIdentifier: locationStateDisplayFormIdentifier,
                    element: locationStateAttributeCaliforniaUri
                }
            },
            {
                measureLocatorItem: {
                    measureIdentifier: totalSalesIdentifier
                }
            }
        ]
    }
}
*/
```
