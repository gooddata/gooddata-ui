---
title: KPI
sidebar_label: KPI
copyright: (C) 2007-2018 GoodData Corporation
id: kpi_component
---

KPI \(Key Performance Indicator\) renders a measure calculated by the GoodData platform.

## Structure

```javascript
import { Kpi } from '@gooddata/react-components';

<Kpi
    measure="<measure-identifier>"
    projectId="<project-id>"
    filters={<filters>}
    format="<format>"
    separators={<separators>}
    sdk={<sdk>}
/>
```

## Example

<!-- This example uses data from the GoodSales // TODO REMOVE! demo project. For testing purposes, you can use this snippet as is. -->

```javascript
import { Kpi } from '@gooddata/react-components';

// with absolute dateFilter
<Kpi
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure="aaeb7jTCfexV"
    filters={[
        {
            absoluteDateFilter: {
                dataSet: {
                    identifier: 'oppclose.dataset.dt'
                },
                from: '2016-01-01',
                to: '2016-12-31'
            }
        }
    ]}
/>


// with positive attributeFilter
<Kpi
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure="aaeb7jTCfexV"
    filters={[
        {
            positiveAttributeFilter: {
                displayForm: {
                    identifier: 'label.account.id.name'
                },
                in: ['{label.account.id.name?958077}', '{label.account.id.name?961040}', '{label.account.id.name?961042}']
            }
        }
    ]}
/>


// with negative attributeFilter
<Kpi
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure="aaeb7jTCfexV"
    filters={[
        {
            negativeAttributeFilter: {
                displayForm: {
                    identifier: 'label.account.id.name'
                },
                notIn: ['{label.account.id.name?958077}', '{label.account.id.name?961040}', '{label.account.id.name?961042}']
            }
        }
    ]}
/>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measure | true | string | The measure URI |
| filters | false | [FilterItem[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| format | false | string | The measure format. If specified, overrides the format stored with the measure. |
| separators | false | object | The format of the thousands separator and decimal separator used in measures. The default is `{ thousand: ',', decimal: '.' }`. For more information about setting the regional number format in a GoodData account, see [Set Default Number Format for your User Account](https://help.gooddata.com/display/doc/Set+Default+Number+Format+for+your+User+Account). |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| onError | false | function | Custom error handler. Called with the argument containing the state and original error message, for example: `{ status:ErrorStates.BAD_REQUEST,error: {...} }` See the [full list of error states](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/errors/GoodDataSdkError.ts). Defaults to `console.error`. |
| onLoadingChanged | false | function | Custom loading handler. Called when a KPI changes to/from the loading state. Called with the argument denoting a valid state, for example: `{ isLoading:false}` |
