---
title: Customize a Visualization
sidebar_label: Customize a Visualization
copyright: (C) 2007-2018 GoodData Corporation
id: ht_customize_visualization
---

## Change Chart Colors

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

## Change Legend Visibility and Position

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

## Customize Tooltips and Fonts

To customize tooltips and fonts, [implement a custom visualization](data_layer.md).
