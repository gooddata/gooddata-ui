---
title: How to Use Visual Components
sidebar_label: How to Use Visual Components
copyright: (C) 2007-2018 GoodData Corporation
id: start_with_visual_components
---

## Element Height and Width

The element where you are inserting a React component in must have the height and width set up. Otherwise, the visualization will not work correctly.

### Example

```javacsript
<div style={{ height: 400, width: 600 }}>
    <Visualization ... />
</div>
```

## Server-side rendering

Server-side rendering is _not_ supported.

## Object URI vs. Object Identifier

Though you can use either object URIs or object identifiers, we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project they live in. That is, an object used in any project within your domain would have the_same_object identifier in_any_of those projects\). To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).