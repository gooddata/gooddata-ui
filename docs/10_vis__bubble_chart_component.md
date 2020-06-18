---
title: Bubble Chart
sidebar_label: Bubble Chart
copyright: (C) 2007-2018 GoodData Corporation
id: bubble_chart_component
---

Bubble chart shows data as bubbles using Cartesian coordinates.
Bubble charts typically have three measures, one for the X-axis, one for the Y-axis, and one that determines the size of each bubble.
The data is sliced by an attribute, with each bubble (an attribute item) noted with a different color.

![Bubble Chart Component](assets/bubble_chart.png "Bubble Chart Component")

## Structure

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { BubbleChart } from '@gooddata/sdk-ui-charts';

<BubbleChart
    xAxisMeasure={<measure>}
    yAxisMeasure={<measure>}
    size={<measure>}
    viewBy={<attribute>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { BubbleChart } from '@gooddata/sdk-ui-charts';

import { Ldm } from "./ldm";

<div style={{ height: 300 }}>
    <BubbleChart
        xAxisMeasure={Ldm.$FranchiseFees}
        yAxisMeasure={Ldm.$FranchisedSales}
        size={Ldm.$AvgDailyTotalSalesByServer}
        viewBy={Ldm.LocationResort}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| xAxisMeasure | false | [IMeasure](50_custom__execution.md#measure) | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the bubble chart to render properly) |
| yAxisMeasure | false | [IMeasure](50_custom__execution.md#measure) | A measure definition (at least one of xAxisMeasure or yAxisMeasure must be provided for the bubble chart to render properly) |
| size | false | [IMeasure](50_custom__execution.md#measure) | A measure definition that determines the size of the bubbles |
| viewBy | false | [IAttribute](50_custom__execution.md#attribute) | An attribute definition |
| filters | false | [IFilter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [ISortItem[]](50_custom__result_specification.md#sorting) | An array of sort definitions |
| config | false | [IChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts). |
| drillableItems | false | [IDrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable. |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state |
| onError | false | Function | A callback when the component updates its error state |
| onExportReady | false | Function | A callback when the component is ready for exporting its data |
| onLoadingChanged | false | Function | A callback when the component updates its loading state |
-->

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
