---
title: How to Use Visual Components
sidebar_label: How to Use Visual Components
copyright: (C) 2007-2018 GoodData Corporation
id: start_with_visual_components
---

GoodData.UI comes with ready-made visual components listed in the Visual Components section that you can use as-is or further customize. You can also use the unique visualization componen that simply renders any chart you create on the GoodData platform.

This article provides components examples and basic usage information to get you going. 

## Element height and width

The element in which you are inserting a React component must have the height and width set up. Otherwise, the visualization will not work correctly.

### Example

```javacsript
<div style={{ height: 400, width: 600 }}>
    <Visualization ... />
</div>
```

## Server-side rendering

Server-side rendering is _not_ supported.

## Object URI vs. object identifier

Though you can use either object URIs or object identifiers with all visual components, we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project they live in. That is, an object used in any project within your domain would have the _same_ object identifier in _any_ of those projects. To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).
