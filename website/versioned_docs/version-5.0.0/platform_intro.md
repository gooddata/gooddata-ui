---
id: version-5.0.0-platform_intro
title: GoodData Platform Introduction
sidebar_label: Platform Introduction
copyright: (C) 2007-2018 GoodData Corporation
original_id: platform_intro
---

The **GoodData platform** is an end-to-end scalable analytics platform.

Use available GoodData.UI components to create your own visual components.
If you have not found the component that fits your needs, see [GoodData.js](http://sdk.gooddata.com/gooddata-js/) and [REST API](https://help.gooddata.com/display/doc/API+Reference#/reference).

![GoodData Platform and GoodData.UI](assets/gooddata_platform_ui.png "GoodData Platform and GoodData.UI")

Let's get familiar with the main concepts.

Imagine you have the data that shows how much money your Sales departments make daily in average.

| Location State | $ Avg Daily Total Sales |
| :--- | :--- | :--- | :--- |
| Alabama | $15,239 |
| California | $37,877 |
| Florida | $12,639 |
| London | $24,041|
| New York | $11,678 |
| Texas | $10,299 |
| Tokyo | $14,451 |

With GoodData.UI, let's display this data as a bar chart:

![Bar Chart](assets/intro_bar_chart.png "Bar Chart")

The graph shows the elements that together build up **AFM** (**Attribute** - **Filter** - **Measure**), unified input for creating a visualization using the GoodData.UI.

`$ Avg Daily Total Sales` is a **measure** that represents what is being measured. In this example, you are interested in the average daily amount of sales.

`Location State` is an **attribute** that breaks the measure apart and provides context to the data. In this example, the measure is sliced by the location of the Sales departments.

Notice that the chart shows only specific values of the `Location State` attribute: `Alabama`, `California`, `Florida`, `New York`, and `Texas`. This is because the chart has a **filter** applied to display only the Sales offices located in the USA.

For more information about AFM, see [AFM Components](afm_components.md).