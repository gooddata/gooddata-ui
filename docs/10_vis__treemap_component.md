---
title: Treemap
sidebar_label: Treemap
copyright: (C) 2007-2018 GoodData Corporation
id: treemap_component
---
Treemap chart presents your data hierarchically as nested rectangles. Treemaps are useful for comparing proportions within the hierarchy.

![Treemap Component](assets/treemap.png "Treemap Component")

## Structure

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { Treemap } from '@gooddata/sdk-ui-charts';

<Treemap
    measures={<measures>}
    viewBy={<attribute>}
    segmentBy={<attribute>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/sdk-ui-charts/styles/css/main.css';
import { Treemap } from '@gooddata/sdk-ui-charts';
import { Ldm } from "./ldm";

<div style={{ height: 300 }}>
    <Treemap
        projectId={projectId}
        measures={[Ldm.NrChecks]}
        viewBy={Ldm.LocationState}
        segmentBy={Ldm.LocationCity}
        onLoadingChanged={this.onLoadingChanged}
        onError={this.onError}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| measures | true | [Measure[]](50_custom__execution.md#measure) | An array of measure definitions|
| viewBy | false | [Attribute](50_custom__execution.md#attribute) | An attribute definition |
| segmentBy | false | [Attribute](50_custom__execution.md#attribute) | An attribute definition |
| filters | false | [Filter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| config | false | [ChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-sdk-ui-charts/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](15_props__drillable_item.md)  | An array of points and attribute values to be drillable |
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
    legend: {
        enabled: true,
        position: 'right',
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
