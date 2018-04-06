---
title: Visualization Lifecycle
sidebar_label: Visualization Lifecycle
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-visualization_lifecycle
original_id: visualization_lifecycle
---

This page describes events that take place between visualization mount and render. During this time, new datasource is created based on saved visualization identifier or uri and once it's execution is resolved the result is rendered.

Ad hoc insights rendered using components like PieChart or Table also follow the same lifecycle.

Following component props can be used as lifecycle callbacks.

| Property | Description | Parameters |
| :--- | :--- | :--- |
| onLoadingChanged | A function that is called when loading state is change | ```{ isLoading: boolean }``` |
| onError | A function that is called when error state is changed | ```{ status: string, ...}``` |
| onLegendReady  | A function that is called when a chart legend is rendered | ```{ legendItems: [...] }``` |

## Successful render

This is the order of event that take place during a successful visualization render.

0. Visualization is mounted and rendered immediately using a ```LoadingComponent```
0. onLoadingChanged callback is called with a parameter ```{ isLoading: true }```
0. onError callback is called with a parameter ```{ status: "OK" }```
0. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```
0. visualization is rendered
0. onLegendReady callback is called with a parameter ```{ legendItems: [...] }```

## Failed render

This is the order of event that take place during a visualization that encountered an error during execution (e.g. data too large).

0. Visualization is mounted and rendered immediately using a ```LoadingComponent```
0. onLoadingChanged callback is called with a parameter
```{ isLoading: true }```
0. onError callback is called with a parameter ```{ status: "OK" }```
0. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```
0. onError callback is called with a parameter
```json
{
    "status": "DATA_TOO_LARGE_TO_DISPLAY",
    "options": {
        "dateOptionsDisabled": false
    }
}
```
6. Visualization is rerendered using ```ErrorComponent```

## Flow chart

![Visualization lifecycle chart](assets/visualization_lifecycle.png "Visualization lifecycle chart")
<!-- https://drive.google.com/open?id=1sNjUcs9s0SOn68lIvVtIE3-edw6EMiY_ -->
