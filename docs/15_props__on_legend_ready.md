---
title: OnLegendReady
sidebar_label: OnLegendReady
copyright: (C) 2007-2018 GoodData Corporation
id: on_legend_ready
---

The `onLegendReady` parameter allows you to get a series from charts and to render a custom legend.

This parameter is not available in the Table component.

## Callback data structure

```javascript
{
    legendItems: [
        {
            name: 'Revenue', // the name of the series; must be a string
            color: '#fff', // a HEX or RGB color; can be used directly in CSS
            onClick: Function // a function without any parameters, returns nothing; the trigger will toggle show/hide for the series in a visualization
        }
    ]
}
```

## Example

```javascript
<Visualization
    projectId="<project-id>"
    identifier="<visualization-identifier>"
    config={{
       legend: {
          enabled: false // disable the original legend implementation
       }
    }}
    onLegendReady={(legendData) => { alert(legendData.legendItems); }}
/>
```
