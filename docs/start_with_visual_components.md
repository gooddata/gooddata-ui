---
title: How to Use Visual Components
sidebar_label: How to Use Visual Components
copyright: (C) 2007-2018 GoodData Corporation
id: start_with_visual_components
---

GoodData.UI comes with ready-made visual components listed in the Visual Components section that you can use as-is or further customize. You can also use the unique visualization component that simply renders any chart you create on the GoodData platform.

This article provides components examples and basic usage information to get you going. 

**Contents:**

* [Element height and width](#element-height-and-width)
* [Server-side rendering](#server-side-rendering)
* [Object URI vs. object identifier](#object-uri-vs-object-identifier)
* [Visualization lifecycle](#visualization-lifecycle)

## Element height and width

The element in which you are inserting a React component must have the height and width set up. Otherwise, the visualization will not work correctly.

### Example

```javacsript
<div style={{ height: 400, width: 600 }}>
    <Visualization ... />
</div>
```

## Object URI vs. object identifier

Though you can use either object URIs or object identifiers with all visual components, we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project they live in. That is, an object used in any project within your domain would have the _same_ object identifier in _any_ of those projects. To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).

## Visualization lifecycle

Visualization lifecycle is a series events that take place between mounting and rendering a visualization. During this time, a new datasource is created based on the saved visualization identifier or URI. Once its execution is resolved, the result is rendered.

Ad hoc insights, rendered using components like pie chart or table, follow the same lifecycle.

The following component props can be used as lifecycle callbacks:

| Property | Description | Parameters |
| :--- | :--- | :--- |
| onLoadingChanged | A function that is called when a loading state changes | ```{ isLoading: boolean }``` |
| onError | A function that is called when an error state changes | ```{ status: string, ...}``` |
| onLegendReady  | A function that is called when a chart legend is rendered | ```{ legendItems: [...] }``` |

### Visualization Rendered Successfully

If a visualization is successfully rendered, the following events occur:

1. The visualization is mounted and rendered immediately using a ```LoadingComponent```.
2. onLoadingChanged callback is called with a parameter ```{ isLoading: true }```.
3. onError callback is called with a parameter ```{ status: "OK" }```.
4. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```.
5. The visualization is rendered.
6. onLegendReady callback is called with a parameter ```{ legendItems: [...] }```.

### Visualization Failed to Render

If an error is encountered during rendering a visualization (for example, too much data to display), the following events occur:

1. The visualization is mounted and rendered immediately using a ```LoadingComponent```.
2. onLoadingChanged callback is called with a parameter ```{ isLoading: true }```.
3. onError callback is called with a parameter ```{ status: "OK" }```.
4. onLoadingChanged callback is called with a parameter ```{ isLoading: false }```.
5. onError callback is called with the following parameter:
```json
{
    "status": "DATA_TOO_LARGE_TO_DISPLAY",
    "options": {
        "dateOptionsDisabled": false
    }
}
```
6. The visualization is rerendered using an ```ErrorComponent```.

### Flow Chart

![Visualization lifecycle chart](assets/visualization_lifecycle.png "Visualization lifecycle chart")
<!-- https://drive.google.com/open?id=1sNjUcs9s0SOn68lIvVtIE3-edw6EMiY_ -->
