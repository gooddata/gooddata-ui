---
title: Chart Config
sidebar_label: Chart Config
copyright: (C) 2007-2018 GoodData Corporation
id: chart_config
---

This article describes your options for chart configuration and the basic usage.

## Structure

```javascript
{
    colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']; // array of strings
    legend: {
        enabled: true, // boolean
        position: 'bottom' // 'top' | 'left' | 'right' | 'bottom'
    };
}
```

## Example of a color array

```javascript
['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']

```

If there are fewer colors than data points, then the colors are repeated. For example, for the two colors and three data points, here is how colors will be used:

```javascript
['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)', 'rgba(195, 49, 73, 1)']
```
## Change chart colors

To change colors in a chart, provide a `config` for each component where you want to change colors, or create a wrapped components with a `config` baked in.

```javascript
import { Visualization } from '@gooddata/react-components';
 
// This is an example of embedding a visualization from the GoodSales demo project with custom colors and palette options.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']
    }}
/>
```

## Change legend visibility and position

To hide the legend, set the `config.legend.enabled` property to `false`.

To change the legend position, adjust the `config.legend.position` property \(`'left'`/`'right'`/`'top'`/`'bottom'`\).

```javascript
import { Visualization } from '@gooddata/react-components';
 
// This is an example of embedding a visualization from the GoodSales demo project with custom colors and palette options.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        legend: {
            enabled: true,
            position: 'bottom' // 'left', 'right', 'top'
        }
    }}
/>
```

## Customize tooltips and fonts

To customize tooltips and fonts, [implement a custom visualization](data_layer.md).
