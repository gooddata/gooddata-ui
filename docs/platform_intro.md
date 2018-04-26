---
id: platform_intro
title: GoodData Platform Introduction
sidebar_label: Platform Introduction
copyright: (C) 2007-2018 GoodData Corporation
---

The **GoodData platform** is a complete analytics platform. This end-to-end solution for business intelligence delivers ETL (Extract Transform Load), data warehousing, and report modeling in a single, unified platform.

GoodData users access analytics through the **GoodData Portal**, an intuitive and secure web interface purpose-built for querying and displaying analytics reporting. After a GoodData user logs in to the GoodData Portal, they can create reports and insights and build dashboards.

A **report** is a chart or table of measures that has been designed to surface analytics into the GoodData Portal for stakeholders to review. A report contains one or more aggregation functions applied to numerical facts or **measures**, optionally segmented by one or more **attributes** and filtered out by **filters**.

* **measure** is aggregation of facts or counts of distinct attribute values, which are represented as numbers in reports. Measures represent what is being measured in a report; for example, sum of sales or average salary.
* **attribute** is a descriptor used to break apart measures and provide context to report data. Attributes dictate how measures are calculated and represented.
* **filter** is a set of characteristics applied to a visualization or measure to remove values from computed and displayed values.

Reports represent **visualizations** of your data. A visualization is a view into a specific part of your data defined by **AFM**, **resultSpec** and a configuration object, usually in a form of a table or chart.

* **AFM** (Attribute - Filter - Measure) is unified input for creating a visualization using the GoodData.UI. AFM describes what data you want to execute: what to measure by _measure_ - how to slice by _attribute_ - how to filter out by _filter_. See [AFM](afm.md).
* **resultSpec** is an object that defines the structure of result data. For example, you can define a custom title and format for each measure, or sorting of data. See [resultSpec](result_specification.md).

For more details on the terminology, see [Glossary](glossary.md).

For complete user information about the GoodData platform, see the [GoodData online help](https://help.gooddata.com/display/doc/GoodData+Help).
