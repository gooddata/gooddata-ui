---
title: Chart Config
sidebar_label: Chart Config
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.0.0-chart_config
original_id: chart_config
---

This article describes your options for chart configuration and the basic usage.

## Structure

```javascript
{
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)'], // array of strings
    xaxis: {
        visible: true, // boolean
        labelsEnabled: true, // boolean
        rotation: 'auto', // 'auto' or numeral string
        min: '10', // numeral string
        max: '20' // numeral string
    },
    yaxis: {
        visible: true, // boolean
        labelsEnabled: true, // boolean
        rotation: 'auto', // string
        min: '30', // numeral string
        max: '40' // numeral string
    },
    legend: {
        enabled: true, // boolean
        position: 'bottom', // 'top' | 'left' | 'right' | 'bottom'
    },
    dataLabels: {
        visible: 'auto' // 'auto' | true | false
    },
    grid: {
        enabled: true // boolean
    }
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```

## Color configuration

Color array example
```javascript
['rgb(195, 49, 73)', 'rgb(168, 194, 86)']

```
or
```javascript
['#fa0510', '#AA2030']

```

If there are fewer colors than data points, then the colors are repeated. For example, for the two colors and three data points, here is how colors will be used:

```javascript
['rgb(195, 49, 73)', 'rgb(168, 194, 86)', 'rgb(195, 49, 73)']
```

To change colors in a chart, provide a `config` for each component where you want to change colors, or create a wrapped components with a `config` baked in.
**NOTE:** Heatmaps use only the first color from the provided colors as the base color, and generate the other colors themselves.

```javascript
import { Visualization } from '@gooddata/react-components';

// Example of embedding a visualization with custom colors and palette options.
<Visualization
    projectId=<project-id>
    identifier=<visualization-id>
    config={{
        colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)']
    }}
/>
```

## Change legend visibility and position

To hide the legend, set the `config.legend.enabled` property to `false`.

To change the legend position, adjust the `config.legend.position` property \(`'left'`/`'right'`/`'top'`/`'bottom'`\).

```javascript
import { Visualization } from '@gooddata/react-components';

// Example of embedding a visualization with a custom legend position.
<Visualization
    projectId=<project-id>
    identifier=<visualization-id>
    config={{
        legend: {
            enabled: true,
            position: 'bottom' // 'left', 'right', 'top'
        }
    }}
/>
```

## Change a separator in the number format

To change the thousands separator, adjust the `config.separators.thousand` property.

To change the decimal separator, adjust the `config.separators.decimal` property.

```javascript
import { Visualization } from '@gooddata/react-components';

// Example of embedding a visualization with a custom separator in the number format.
<Visualization
    projectId=<project-id>
    identifier=<visualization-id>
    config={{
        separators: {
            thousand: ',',
            decimal: '.'
        }
    }}
/>
```

## Axis configuration
To change axis visibility, set the `config.xaxis.visible` property.

To hide axis labels, set the `config.xaxis.labelsEnabled` property to false.
When `config.xaxis.visible` is set to false, axis labels are hidden automatically, regardless of this option.

To rotate axis labels, set `config.xaxis.rotation` to a desired value.

To set scale of axis, set `config.xaxis.min` and `config.<xaxis>.max`.

> For y-axis, replace `xaxis` with `yaxis`.

```javascript
import { Visualization } from '@gooddata/react-components';

// Example of embedding a visualization with settings for the x-axis.
<Visualization
    projectId=<project-id>
    identifier=<visualization-id>
    config={{
        xaxis: {
            visible: false,
            labelsEnabled: false,
            rotation: '-90',
            min: '150',
            max: '440'
        }
    }}
/>
```

## Canvas configuration
To configure data labels in chart, set `config.dataLabels` property.

```javascript
import { Visualization } from '@gooddata/react-components';

// Example of embedding a visualization with settings for the canvas.
<Visualization
    projectId=<project-id>
    identifier=<visualization-id>
    config={{
        dataLabels: true,
        grid: {
            enabled: false
        }
    }}
/>
```

## Customize tooltips and fonts

To customize tooltips and fonts, [implement a custom visualization](data_layer.md).
