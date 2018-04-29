---
id: ex_global_filters
title: Global Filters Example
sidebar_label: Global Filters
copyright: (C) 2007-2018 GoodData Corporation
---

This article shows you how to combine several components to apply a dynamic attribute filter to multiple display and SDK components.

The AttributeElements component loads values of the Employee Name attribute. When you click an attribute value (employee) in the left pane, the KPIs, pie chart, and bar chart are filtered by the selected attribute value (employee). In addition, the employee information is passed into the EmployeeCard component that renders static data mixed with external data.

![Global Filters](assets/movie-speed.gif)

You can see the code example on [GitHub](https://github.com/gooddata/gooddata-react-components/blob/master/examples/src/components/GlobalFiltersExample.jsx)
