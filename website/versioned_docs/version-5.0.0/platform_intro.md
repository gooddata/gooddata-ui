---
id: version-5.0.0-platform_intro
title: GoodData Platform Introduction
sidebar_label: Platform Introduction
copyright: (C) 2007-2018 GoodData Corporation
original_id: platform_intro
---

**GoodData Platform** is a powerful end-to-end analytics platform as a service with multi-tenant distribution that scales to hundreds of terabytes of data and hundreds of thousands of users. Learn more about the [GoodData platform](https://www.gooddata.com/platform) and how to [embed its analytics possibilities](https://www.gooddata.com/embedded-analytics).

![GoodData Platform and GoodData.UI](assets/gooddata_platform_ui.png "GoodData Platform and GoodData.UI")

**GoodData REST API** is a low-level API that makes the platform features accessible to all GoodData users.

**GoodData.js** is a set of JavaScript wrappers written on top of the *REST API*. Additionally, GoodData.js handles authentication, unified query request format (AFM), and many more.

**GoodData.UI** is a React-based JavaScript library for building responsive analytical applications. This library is written on top of *GoodData.js* and makes creating analytical applications even more convenient by adding visual components.

## Main Concepts

Imagine you have the data that shows how much money your Franchizes earn daily.

| Location State | Daily Sales | Date      |
| -------------- | ----------- | --------- |
| Alabama        | $16,239     | 5/22/2018 |
| California     | $39,877     | 5/22/2018 |
| Florida        | $12,639     | 5/22/2018 |
| London         | $24,041     | 5/22/2018 |
| New York       | $11,678     | 5/22/2018 |
| Texas          | $10,299     | 5/22/2018 |
| Tokyo          | $18,451     | 5/22/2018 |
| Alabama        | $14,239     | 5/23/2018 |
| California     | $35,877     | 5/23/2018 |
| Florida        | $12,639     | 5/23/2018 |
| London         | $24,041     | 5/23/2018 |
| New York       | $11,678     | 5/23/2018 |
| Texas          | $10,299     | 5/23/2018 |
| Tokyo          | $10,451     | 5/23/2018 |

With GoodData.UI, let's display this data as a bar chart:

![Bar Chart](assets/intro_bar_chart.png "Bar Chart")

The graph shows the elements that together work as unified input for creating a visualization using GoodData.UI.

`$ Daily Sales` is a **measure** that represents what is being measured. In this example, you are interested in the daily amount of sales.

`Location State` is an **attribute** that breaks the measure apart and provides context to the data. In this example, the measure is sliced by the location of the Sales departments.

Notice that the chart shows only specific values of the `Location State` attribute: `Alabama`, `California`, `Florida`, `New York`, and `Texas`. This is because the chart has a **filter** applied to display only the Sales offices located in the USA.
