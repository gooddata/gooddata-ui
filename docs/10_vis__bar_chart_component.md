---
title: Bar Chart
sidebar_label: Bar Chart
copyright: (C) 2007-2018 GoodData Corporation
id: bar_chart_component
---

Bar chart shows data in horizontal bars. Bar charts can display one or multiple metrics side by side divided by attribute values or a single measure stacked by attribute values.

![Bar Chart Component](assets/bar_chart.png "Bar Chart Component")

## Structure

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { BarChart } from '@gooddata/sdk-ui-charts';

<BarChart
    measures={<measures>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { BarChart } from '@gooddata/sdk-ui-charts';
import { Ldm } from "./ldm";

<div style={{ height: 300 }}>
    <BarChart
        measures={[Ldm.$TotalSales]}
        viewBy={Ldm.DateMonth.Short}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| measures | true | [IMeasure[]](50_custom__execution.md#measure) | An array of measure definitions |
| viewBy | false | [IAttribute](50_custom__execution.md#attribute) &#124; [Attribute[]](50_custom__execution.md#attribute) | An attribute definition or an array of two attribute definitions. If set to a two-attribute array, the first attribute wraps up the second one. |
| stackBy | false | [IAttribute](50_custom__execution.md#attribute) | An attribute definition. Do not use `stackBy` in charts with multiple measures. |
| filters | false | [IFilter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [ISortItem[]](50_custom__result_specification.md#sorting) | An array of sort definitions |
| config | false | [IChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts). |
| drillableItems | false | [IDrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable. |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](15_props__error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](15_props__loading_component.md).|
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
        rotation: 'auto'
    },
    legend: {
        enabled: true,
        position: 'top',
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
