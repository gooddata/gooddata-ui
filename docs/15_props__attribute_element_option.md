---
title: AttributeElements Component Options
sidebar_label: AttributeElements Component Options
copyright: (C) 2020 GoodData Corporation
id: attribute_element_option
---

This article describes the options for configuring the [AttributeElements component](30_tips__create_custom_attribute_filter.md#example).

The AttributeElements options define how AttributeElements values are queried.

## Types of AttributeElements options

All top-level options are optional. You can use only those options that are relevant in your project.

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| limit | false | number | The number of values returned in one portion |
| offset | false | number | The offset of the first value in the returned list |
| order | false | [SortDirection](50_custom__result_specification.md#sorting) | The order of the returned values |
| filter | false | string | The search keyword/phrase to look for in the value titles |
| uris | false | string[] | The URIs of specific values to obtain; can be used to preload selected values in the attribute filter |
| includeTotalCountWithoutFilters | false | boolean | When set to `true`, includes the total number of the values (without filters applied) in the response |
| afm | false | [AFM](50_custom__execution.md) | The AMF that determines the values to return |
