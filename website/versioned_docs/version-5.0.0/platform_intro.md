---
id: version-5.0.0-platform_intro
title: GoodData Platform Introduction
sidebar_label: Platform Introduction
copyright: (C) 2007-2018 GoodData Corporation
original_id: platform_intro
---

The **GoodData platform** is an end-to-end scalable analytics platform.

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



<!--
full-fledged analytics platform. This end-to-end solution for business intelligence delivers ETL (Extract Transform Load), data warehousing, and insight modeling in a single, unified platform.

GoodData **users** access analytics through the web-based **GoodData Portal** where they can create insights and build dashboards.

As a **developer**, you can use our comprehensive set of open REST APIs and SDKs to customize GoodData tools and build insights that suit your customers’ specific needs.

## Key concepts

An **insight** is a chart or table of measures designed to surface analytics into the GoodData Portal for stakeholders to review. An insight contains one or more aggregation functions applied to numerical facts or **measures**, optionally segmented by one or more **attributes** and filtered out by **filters**.

* **measure** is aggregation of facts or counts of distinct attribute values, which are represented as numbers in insights. Measures represent what is being measured in a insight; for example, sum of sales or average salary.
* **attribute** is a descriptor used to break measures apart and provide context to insight data. Attributes dictate how measures are calculated and represented.
* **filter** is a set of characteristics applied to a visualization or measure to remove values from computed and displayed values.

Insights represent **visualizations** of your data. A visualization is a view into a specific part of your data defined by **AFM**, **resultSpec** and a configuration object, usually in a form of a table or chart.

* **AFM** (Attribute - Filter - Measure) is unified input for creating a visualization using the GoodData.UI. AFM describes what data you want to execute: what to measure by _measure_, how to slice by _attribute_, and how to filter out by _filter_. For more information, see [AFM](afm.md).
* **resultSpec** is an object that defines the structure of result data. For example, you can define a custom title and format for each measure, or sorting of data. See [resultSpec](result_specification.md).

For more details about the terminology, see [Glossary](glossary.md).

For comprehensive GoodData platform documentation, see [GoodData online Help](https://help.gooddata.com/display/doc/GoodData+Help).

-->