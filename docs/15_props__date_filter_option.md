---
title: DateFilter Component Options
sidebar_label: DateFilter Component Options
copyright: (C) 2007-2019 GoodData Corporation
id: date_filter_option
---

This article describes the options for configuring the [DateFilter component](10_vis__date_filter_component.md).

The DateFilter options define the category of a date filter and a set of the date filter values.

> **The DateFilter component is in the beta stage.**
>
> The DateFilter component may contain bugs. The component may be changed in future releases, even in a backward incompatible way.

> **Known issues**:
> - `availableGranularities` in `relativeForm` is ignored. `availableGranularities` from the DateFilter component is used instead.
>   - _This issue may be fixed in one of the future releases. The `availableGranularities` property may be removed from the DateFilter component._
> - The `name` property in `allTime`, `absoluteForm`, and `relativeForm` is ignored.
>   - _The built-in standard label is always used regardless of the value of the `name` property. The `name` property itself may be made optional in one of the future releases, which will make this a backward incompatible change._
>

## Types of DateFilter options

All top-level options are optional. You can use only those options that are relevant in your project.

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| allTime | false | [AllTime](#all-time) | The option that enables the `All time` filter option |
| absoluteForm | false | [AbsoluteForm](#absolute-form) | The option that enables the static period filter form |
| relativeForm | false | [RelativeForm](#relative-form) | The option that enables the relative period filter form |
| absolutePreset | false | [AbsolutePreset[]](#absolute-preset) | Filters for predefined static date periods |
| relativePreset | false | [Map<DateFilterGranularity, RelativePreset>](#relative-preset) | Filters for predefined relative date periods  organized by granularity |

### All Time
An All time filter does not filter any dates.

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| localIdentifier | true | string | The unique identifier of the filter option |
| type | true | string | Must be set to `allTime` |
| name | true | string | The filter label |
| visible | true | boolean | Specifies whether to display (`true`) or hide (`false`) the filter option |


### Absolute Form
An Absolute Form filter restricts data based on a explicitly defined static period (for example, "from 2019-08-10 to 2019-08-15").

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| localIdentifier | true | string | The unique identifier of the filter option |
| type | true | string | Must be set to `absoluteForm` |
| name | true | string | The filter label |
| visible | true | boolean | Specifies whether to display (`true`) or hide (`false`) the filter option |
| from | false | string | The beginning of the period; the default value formatted as `YYYY-MM-DD` |
| to | false | string | The end of the period; the default value formatted as `YYYY-MM-DD` |

### Relative Form
A Relative Form filter restricts data based on a relative period (for example, "from 2 months ago to 1 month ago").

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| localIdentifier | true | string | The unique identifier of the filter option |
| type | true | string | Must be set to `relativeForm` |
| name | true | string | The filter label |
| visible | true | boolean | Specifies whether to display (`true`) or hide (`false`) the filter option |
| availableGranularities | true | [DateFilterGranularity[]](#date-filter-granularity) | Types of granularity available in the form |
| granularity | false | [DateFilterGranularity](#date-filter-granularity) | The default granularity |
| from | false | number | The beginning of the period; the default value that specifies the length of the period based on the granularity and is relative to today (which is always zero) |
| to | false | number | The end of the period; the default value that specifies the length of the period based on the granularity and is relative to today (which is always zero) |

### Absolute preset
An Absolute Preset filter is a static period filter with the preconfigured `from` and `to` dates. The period cannot be changed via the UI.

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| localIdentifier | true | string | The unique identifier of the filter option |
| type | true | string | Must be set to `absolutePreset` |
| name | true | string | The filter label |
| visible | true | boolean | Specifies whether to display (`true`) or hide (`false`) the filter option |
| from | true | string | The beginning of the period formatted as `YYYY-MM-DD` |
| to | true | string | The end of the period formatted as `YYYY-MM-DD` |

### Relative Preset
A Relative Preset filter is a relative period filter with a preconfigured `from` and `to` range. The range cannot be changed via the UI.

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| localIdentifier | true | string | The unique identifier of the filter option |
| type | true | string | Must be set to `relativePreset` |
| name | true | string | The filter label |
| visible | true | boolean | Specifies whether to display (`true`) or hide (`false`) the filter option |
| granularity | true | [DateFilterGranularity](#date-filter-granularity) | Granularity of the filter |
| from | true | number | The beginning of the period that specifies the length of the period based on the granularity and is relative to today (which is always zero) |
| to | true | number | The end of the period that specifies the length of the period based on the granularity and is relative to today (which is always zero) |

## Date filter granularity
Date filter granularity define periods in relative date filters.

Granularity can be set in days, weeks, months, quarters, and years. Granularity is defined as a `string` value in the following format:
- `"GDC.time.date"`
 - `"GDC.time.week_us"`
 - `"GDC.time.month"`
 - `"GDC.time.quarter"`
 - `"GDC.time.year"`

## Example

```javascript
let dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);

const dateFilterOptions = {
    allTime: {
        localIdentifier: "d1f74327-022c-44bb-a98e-b38a6178b7f9",
        type: "allTime",
        name: "All time",
        visible: true,
    },
    absoluteForm: {
        localIdentifier: "90bad814-a193-429f-b88c-118cd00f2168",
        type: "absoluteForm",
        from: dateFrom.toISOString().substr(0, 10), // 'YYYY-MM-DD'
        to: new Date().toISOString().substr(0, 10), // 'YYYY-MM-DD'
        name: "Static period",
        visible: true,
    },
    relativeForm: {
        localIdentifier: "1389c988-6159-4f08-bdbd-b4cc02d2689d",
        type: "relativeForm",
        granularity: "GDC.time.month",
        name: "Floating range",
        visible: true,
        availableGranularities: ["GDC.time.date", "GDC.time.month", "GDC.time.quarter", "GDC.time.year"],
        from: 0,
        to: -1,
    },
    absolutePreset: [
        {
            from: "2019-12-01",
            to: "2019-12-31",
            name: "December 2019",
            localIdentifier: "4cd37951-9559-4eff-8750-7b7829b5a3ce",
            visible: true,
            type: "absolutePreset",
        },
        {
            from: "2018-01-01",
            to: "2018-12-31",
            name: "Year 2018",
            localIdentifier: "d12f83c4-f4e4-485a-8fa5-ec2fc0c889fb",
            visible: true,
            type: "absolutePreset",
        },
    ],
    relativePreset: {
        "GDC.time.date": [
            {
                from: -6,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "fae8aca1-6bcf-456e-8547-e10656859f4d",
                type: "relativePreset",
                visible: true,
                name: "Last 7 days",
            },
            {
                from: -29,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "29bd0e2d-51b0-42f7-9355-70aa610ac06c",
                type: "relativePreset",
                visible: true,
                name: "Last 30 days",
            },
            {
                from: -89,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "9370c647-8cbe-4850-82c2-0783513e4fe3",
                type: "relativePreset",
                visible: true,
                name: "Last 90 days",
            },
        ],
        "GDC.time.month": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "ec54d656-bbea-4559-b6b2-9de80951eb20",
                type: "relativePreset",
                visible: true,
                name: "This month",
            },
            {
                from: -1,
                to: -1,
                granularity: "GDC.time.month",
                localIdentifier: "0787513c-ec02-439f-9781-7da80db91a27",
                type: "relativePreset",
                visible: true,
                name: "Last month",
            },
            {
                from: -11,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "b2790ff0-48ba-402f-a3b3-6722e325042b",
                type: "relativePreset",
                visible: true,
                name: "Last 12 months",
            },
        ],
        "GDC.time.quarter": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "cdf546a5-4394-4583-9a7d-ab35e880f54b",
                type: "relativePreset",
                visible: true,
                name: "This quarter",
            },
            {
                from: -1,
                to: -1,
                granularity: "GDC.time.quarter",
                localIdentifier: "bb5364ba-0c0e-44d9-8cfc-f8ee995dcb53",
                type: "relativePreset",
                visible: true,
                name: "Last quarter",
            },
            {
                from: -3,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "9b838d14-c88d-4652-bf79-08b895688cd8",
                type: "relativePreset",
                visible: true,
                name: "Last 4 quarters",
            },
        ],
        "GDC.time.year": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.year",
                localIdentifier: "d5e444df-67f6-4034-8b80-0bb0f6c6a210",
                type: "relativePreset",
                visible: true,
                name: "This year",
            },
            {
                from: -1,
                to: -1,
                granularity: "GDC.time.year",
                localIdentifier: "eecbe244-8560-466d-876c-4d3cc96ea61a",
                type: "relativePreset",
                visible: true,
                name: "Last year",
            },
        ],
    },
};
```
