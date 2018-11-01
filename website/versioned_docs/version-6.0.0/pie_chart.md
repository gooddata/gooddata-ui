---
title: Pie Chart
sidebar_label: Pie Chart
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.0.0-pie_chart_component
original_id: pie_chart_component
---

Pie chart shows data as proportional segments of a disc. Pie charts can be segmented by either multiple measures or an attribute.

![Pie Chart Component](assets/pie_chart.png "Pie Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { PieChart } from '@gooddata/react-components';

<PieChart
    projectId={<project-id>}
    measures={<measures>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
const measures = [
    {
        measure: {
            localIdentifier: 'franchiseFeesAdRoyaltyIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesAdRoyaltyIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchiseFeesInitialFranchiseFeeIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesInitialFranchiseFeeIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchiseFeesIdentifierOngoingRoyalty',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesIdentifierOngoingRoyalty
                    }
                }
            },
            format: '#,##0'
        }
    }
];

<div style={{ height: 300 }}>
    <PieChart
        projectId={projectId}
        measures={measures}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measures | true | Measure[] | An array of measure definitions |
| viewBy | false | Attribute | An attribute definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| config | false | [ChartConfig](chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](drillable_item.md) | An array of points and attribute values to be drillable. |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](loading_component.md).|
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->

The following example shows the supported `config` structure with sample values. To see descriptions of individual options, see [ChartConfig section](chart_config.md).
```javascript
{
    colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
    legend: {
        enabled: true,
        position: 'top',
    },
    dataLabels: {
        visible: 'auto'
    },
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```