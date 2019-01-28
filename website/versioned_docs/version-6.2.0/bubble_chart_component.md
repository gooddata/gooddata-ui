---
title: Bubble Chart
sidebar_label: Bubble Chart
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.2.0-bubble_chart_component
original_id: bubble_chart_component
---

Bubble chart shows data as bubbles using Cartesian coordinates.
Bubble charts typically have three measures, one for the X-axis, one for the Y-axis, and one that determines the size of each bubble.
The data is sliced by an attribute, with each bubble (an attribute item) noted with a different color.

![Bubble Chart Component](assets/bubble_chart.png "Bubble Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { BubbleChart } from '@gooddata/react-components';

<BubbleChart
    projectId={<project-id>}
    xAxisMeasure={<measure>}
    yAxisMeasure={<measure>}
    size={<measure>}
    viewBy={<attribute>}
    config={<chart-config>}
    sdk={<sdk>}
    …
/>
```

## Example

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { BubbleChart } from '@gooddata/react-components';

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
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchisedSalesIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchisedSalesIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'averageCheckSizeByServer',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: averageCheckSizeByServer
                    }
                }
            }
        }
    }
];

const viewBy = {
    visualizationAttribute: {
        displayForm: {
            identifier: locationResortIdentifier
        },
        localIdentifier: 'location_resort'
    }
};

<div style={{ height: 300 }}>
    <BubbleChart
        projectId={projectId}
        xAxisMeasure={measures[0]}
        yAxisMeasure={measures[1]}
        size={measures[2]}
        viewBy={viewBy}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | false | string | The project ID |
| xAxisMeasure | false | Measure | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the bubble chart to render properly) |
| yAxisMeasure | false | Measure | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the bubble chart to render properly) |
| size | false | Measure | A measure definition that determines the size of the bubbles |
| viewBy | false | Attribute | An attribute definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](result_specification.md#sorting) | An array of sort definitions |
| config | false | [ChartConfig](chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](drillable_item.md) | An array of points and attribute values to be drillable. |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
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
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)'],
    colorPalette: [{
        guid: '01',
        fill: {
            r: 195,
            g: 49,
            b: 73
        }
    }, {
        guid: '02',
        fill: {
            r: 168,
            g: 194,
            b: 86
        }
    }],
    colorMapping: [{
        predicate: (headerItem) => {
            return headerItem.measureHeaderItem && (headerItem.measureHeaderItem.localIdentifier === 'm1_localIdentifier')
        },
        color: {
            type: 'guid',
            value: '02'
        }
    }],
    xaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto',
        min: '20',
        max: '30'
    },
    yaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto',
        min: '20',
        max: '30'
    },
    legend: {
        enabled: true,
        position: 'right',
    },
    dataLabels: {
        visible: 'auto'
    },
    grid: {
        enabled: true
    }
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```
