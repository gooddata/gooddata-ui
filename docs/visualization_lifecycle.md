---
title: Visualization Lifecycle
sidebar_label: Visualization Lifecycle
copyright: (C) 2007-2018 GoodData Corporation
id: visualization_lifecycle
---

This page describes events that take place between mounting and rendering a visualization. During this time, a new datasource is created based on the saved visualization identifier or URI. Once its execution is resolved, the result is rendered.

Ad hoc insights rendered using components like PieChart or Table follow the same lifecycle.

The following component props can be used as lifecycle callbacks:

| Property | Description | Parameters |
| :--- | :--- | :--- |
| onLoadingChanged | A function that is called when a loading state changes | ```{ isLoading: boolean }``` |
| onError | A function that is called when an error state changes | ```{ status: string, ...}``` |
| onLegendReady  | A function that is called when a chart legend is rendered. See [OnLegendReady](on_legend_ready.md). | ```{ legendItems: [...] }``` |

## Visualization Rendered Successfully

If a visualization is successfully rendered, the following events occur:

0. The visualization is mounted and rendered immediately using a ```LoadingComponent```.
0. onLoadingChanged callback is called with a parameter ```{ isLoading: true }```.
0. onError callback is called with a parameter ```{ status: "OK" }```.
0. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```.
0. The visualization is rendered.
0. onLegendReady callback is called with a parameter ```{ legendItems: [...] }```.

## Visualization Failed to Render

If an error is encountered during rendering a visualization (for example, too much data to display), the following events occur:

0. The visualization is mounted and rendered immediately using a ```LoadingComponent```.
0. onLoadingChanged callback is called with a parameter ```{ isLoading: true }```.
0. onError callback is called with a parameter ```{ status: "OK" }```.
0. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```.
0. onError callback is called with the following parameter:
```json
{
    "status": "DATA_TOO_LARGE_TO_DISPLAY",
    "options": {
        "dateOptionsDisabled": false
    }
}
```
6. The visualization is rerendered using an ```ErrorComponent```.

## Flow Chart

![Visualization lifecycle chart](assets/visualization_lifecycle.png "Visualization lifecycle chart")
<!-- https://drive.google.com/open?id=1sNjUcs9s0SOn68lIvVtIE3-edw6EMiY_ -->
