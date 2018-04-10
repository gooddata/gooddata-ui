---
title: Chart Config
sidebar_label: Chart Config
copyright: (C) 2007-2018 GoodData Corporation
id: chart_config
---
## Structure

```javascript
{
    colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']; // array of strings
    legend: {
        enabled: true; // boolean
        position: 'bottom'; // 'top' | 'left' | 'right' | 'bottom'
    };
}
```

## Example of a Color Array

```javascript
['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']

```

If there are fewer colors than data points, then the colors are repeated. For example, for the two colors and three data points, here is how colors will be used:

```javascript
['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)', 'rgba(195, 49, 73, 1)']
```
