---
title: Arithmetic Measure
sidebar_label: Arithmetic Measure
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.2.0-arithmetic_measure
original_id: arithmetic_measure
---

Arithmetic measures allow you to perform simple calculations with measures in a visualization.
A calculated **arithmetic measure** always references two measures, therefore the visualization must contain two measures at least.

## Supported operations

Although a visualization can contain multiple measures, you can perform arithmetic operations with exactly only **two** measures.

The following arithmetic operations are supported:

| Operation | Arithmetic measure operator | Expression formula | Example
|--- |---|---|---
| Sum | `sum` | =A+B | = Q1 revenue + Q2 revenue
| Difference | `difference` | =A-B | = revenue in 2017 - revenue in 2016
| Product (Multiplication) | `multiplication` |  =A*B | = price per unit * number of units
| Ratio | `ratio` |  =A÷B | = gross profit / net sales
| Change | `change` |  =(A-B)÷B | = (this month revenue - last month revenue) / last month revenue

By default, the result data of a `change` operation is returned as a percentage in the `#,##0.00%` format. The format cannot be overridden. 

All the other operations return data in the default `#,##0.00` format. 
To change the format, use the `format` attribute of the measure (see the [examples](#examples)).

## Arithmetic measure structure

To add an arithmetic measure to a visualization, use the following `IArithmeticMeasureDefinition` structure:

````javascript
// Type: IMeasure 
{
    localIdentifier: '<arithmetic-measure-local-identifier>',
    // Type: IArithmeticMeasureDefinition 
    definition: {
        arithmeticMeasure: {
            measureIdentifiers: ['<referenced-measure-local-identifier>', '<referenced-measure-local-identifier>'] // a reference to localIdentifier of the measures from which the calculation is made
            //Type: ArithmeticMeasureOperator
            operator: '<arithmetic-operator>' // possible values: sum, difference, multiplication, ratio, change 
        }
    }
}
````

For the full TypeScript definition, see [this code section](https://github.com/gooddata/gooddata-typings/blob/v2.6.0/src/VisualizationObject.ts#L121).

An arithmetic measure can reference the following as its operand:
* Simple measures
* Derived measures (see [Time Over Time Comparison](time_over_time_comparison.md))
* Another arithmetic measures

If arithmetic measures reference each other in an infinite loop or the referenced measure is not found in the visualization (there is no measure with the referenced *localIdentifier*), the error message is rendered instead of the visualization.

## Examples

### A difference between two measures

````jsx harmony
const measures = [
    // the first simple measure (operand)
    {
        localIdentifier: 'boughtProductsLocalIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'boughtProductsIdentifier'
                }
            }
        },
        alias: 'Bought products from supplier'
    },
    // the second simple measure (operand)
    {
        localIdentifier: 'soldProductsLocalIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'soldProductsIdentifier'
                }
            }
        },
        alias: 'Sold products to customers'
    },
    // arithmetic measure (arithmetic operation with referenced operands)
    {
        localIdentifier: 'arithmeticMeasureLocalIdentifier',
        definition: {
            arithmeticMeasure: {
                measureIdentifiers: ['boughtProductsLocalIdentifier', 'soldProductsLocalIdentifier'],
                operator: 'difference'
            }
        },
        alias: 'Products remaining in warehouse'
    }
];

<Table
    projectId={projectId}
    measures={measures}
/>
````

### Calculation with a derived measure (percentage change between two years)

The result of a `change` operation is returned as a percentage value in the default `#,##0.00%` format. 

```jsx harmony
const measures = [
    // derived - data from previous year
    {
        localIdentifier: 'spDerivedMeasureLocalIdentifier',
        definition: {
            popMeasureDefinition: {
                measureIdentifier: 'spMasterMeasureLocalIdentifier',
                popAttribute: {
                    identifier: 'attributeDisplayFormYearIdentifier'
                }
            }
        },
        alias: 'Previous year'
    },
    // master measure - data from this year
    {
        localIdentifier: 'spMasterMeasureLocalIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'measureIdentifier'
                }
            }
        },
        alias: 'Current year'
    },
    // arithmetic measure - percentage change between the previous and the current year 
    {
        localIdentifier: 'arithmeticMeasureLocalIdentifier',
        definition: {
            arithmeticMeasure: {
                measureIdentifiers: ['spDerivedMeasureLocalIdentifier', 'spMasterMeasureLocalIdentifier'],
                operator: 'change'
            }
        },
        alias: 'Change between the previous and the current year'
    }
];

<Table
    projectId={projectId}
    measures={measures}
/>
```

### Calculation with an arithmetic measure and format override

````jsx harmony
const measures = [
    {
        localIdentifier: 'soldProductA_localIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'soldProductA_identifier'
                }
            }
        },
        alias: 'Units of sold product A'
    },
    {
        localIdentifier: 'soldProductB_localIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'soldProductB_identifier'
                }
            }
        },
        alias: 'Units of sold product B'
    },
    {
        localIdentifier: 'soldProductC_localIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'soldProductC_identifier'
                }
            }
        },
         alias: 'Units of sold product C'
    },
    {
        localIdentifier: 'soldProductsAB_localIdentifier',
        definition: {
            arithmeticMeasure: {
                measureIdentifiers: ['soldProductA_localIdentifier', 'soldProductB_localIdentifier'],
                operator: 'sum'
            }
        },
        alias: 'Sum of sold product A and B'
    },
    {
        localIdentifier: 'soldProductAB_vs_C_localIdentifier',
        definition: {
            arithmeticMeasure: {
                measureIdentifiers: ['soldProductsAB_localIdentifier', 'soldProductC_localIdentifier'],
                operator: 'difference'
            }
        },
        format: '#,##0.00%',
        alias: 'Difference of sold product A and B vs C returned as percentage'
    }
];

<Table
    projectId={projectId}
    measures={measures}
/>
````

## More information

See the [live examples](https://gooddata-examples.herokuapp.com/arithmetic-measure).
