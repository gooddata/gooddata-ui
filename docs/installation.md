---
id: installation
title: Installation
sidebar_label: Installation
copyright: (C) 2007-2018 GoodData Corporation
---

## Installation

```bash
yarn add @gooddata/react-components
```

```bash
$ npminstall@gooddata/react-components
```
## Workflow

1. Get your project ID.
    You need your project ID to connect your project with the visualizations that you are going to create. To get your project ID, see [Find the Project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID).
2. Obtain resource identifiers using [gdc-catalog-export](gdc-catalog-export.md).
    You need the identifiers to display visualizations, filters, and other resources.
3. Pick a visualization type from the prepared React components (table, column chart, bar chart, and so on) and optionally one or more properties to use with the selected visualization.
    Alternatively, fetch raw data and create a fully custom visualization.