---
title: Scatter Plot
sidebar_label: Scatter Plot
copyright: (C) 2007-2018 GoodData Corporation
id: scatter_plot_component
---

Scatter plot shows data as points using Cartesian coordinates. Scatter plots typically have a minimum of two measures, one for the X-axis and the other for the Y-axis, and one attribute, which determines the meaning of each data point.
Scatter plots are useful for analyzing trends between two measures or for tracking the magnitude of two measures from the same chart.

![Scatter Plot Component](assets/scatter_plot.png "Scatter Plot Component")

## Structure

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { ScatterPlot } from '@gooddata/sdk-ui-charts';

<ScatterPlot
    xAxisMeasure={<measure>}
    yAxisMeasure={<measure>}
    attribute={<attribute>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { ScatterPlot } from '@gooddata/sdk-ui-charts';
import { Ldm } from "./ldm";

<div style={{ height: 300 }}>
    <ScatterPlot
        xAxisMeasure={Ldm.$FranchiseFees}
        yAxisMeasure={Ldm.$FranchisedSales}
        attribute={Ldm.DateMonth.Short}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| xAxisMeasure | false | [Measure](50_custom__execution.md#measure) | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the scatter plot to render properly) |
| yAxisMeasure | false | [Measure](50_custom__execution.md#measure) | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the scatter plot to render properly) |
| attribute | false | [Attribute](50_custom__execution.md#attribute) | An attribute definition |
| filters | false | [Filter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](50_custom__result_specification.md#sorting) | An array of sort definitions |
| config | false | [ChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-sdk-ui-charts/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable. |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when the component updates its error state |
| onExportReady | false | Function | A callback when the component is ready for exporting its data |
| onLoadingChanged | false | Function | A callback when the component updates its loading state |

The following example shows the supported `config` structure with sample values. To see descriptions of individual options, see [ChartConfig section](15_props__chart_config.md).
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
        min: '40',
        max: '50'
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
