---
title: React Components
sidebar_label: React Components
copyright: (C) 2007-2018 GoodData Corporation
id: react_components
---

The element where you are inserting a React component in must have the height and width set up. Otherwise, the visualization will not work correctly.

Example:

```javacsript
<div style={{ height: 400, width: 600 }}>
    <Visualization ... />
</div>
```

Server-side rendering is _not_ supported.

Though you can use either object URIs or object identifiers, we recommend that you use the **object identifiers**, which are consistent across your domain regardless of the GoodData project they live in. That is, an object used in any project within your domain would have the_same_object identifier in_any_of those projects\). To get a list of catalog items and date datasets from a GoodData project in form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).

## KPI

KPI \(Key Performance Indicator\) renders a measure calculated by the GoodData platform.

### Parameters

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| measure | true | string | Measure URI |
| projectId | true | string | Project ID |
| filters | false | [FilterItem](afm.md#AFM-Filter)\[\] | KPI filters |
| format | false | string | Measure format. If specified, overrides the format stored with the measure. |
| onError | false | function | Custom error handler. Called with the argument containing the state and original error message, for example: `{ status:ErrorStates.BAD_REQUEST,error: {...} }` See the [full list of error states](https://github.com/gooddata/gooddata-react-components/blob/master/src/constants/errorStates.ts). Defaults to `console.error`. |
| onLoadingChanged | false | function | Custom loading handler. Called when a KPI changes to/from the loading state. Called with the argument denoting a valid state, for example: `{ isLoading:false}` |

### Structure

```javascript
import { Kpi } from '@gooddata/react-components';

<Kpi
    measure="<measure-identifier>"
    projectId="<project-id>"
    filters={<filters>}
    format="<format>"
/>
```

### Example

This example uses data from the GoodSales // TODO REMOVE! demo project. For testing purposes, you can use this snippet as is.

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

## Visualization

A visualization is a generic component that renders a chart according to the given URI. It can render a table or any type of the chart stated above.

### Parameters

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | Project ID |
| uri | false | string | URI of the visualization to be rendered Can be omitted if the visualization identifier is present. |
| identifier | false | string | Identifier of the visualization to be rendered Can be omitted if the visualization URI is present. |
| locale | false | string | Localization of the visualization Defaults to`en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| config  | false | [ChartConfig](chart_config.md) | Chart configuration |
| filters | false | [FilterItem](afm.md#AFM-Filter)\[\] | List of filters to be applied to the visualization |
| drillableItems | false | [DrillableItem](drillable_item)\[\] | Drilling configuration |
| onFiredDrillEvent | false | [onFiredDrillEvent](on_fired_drill_event.md)\(\) | Drilling event catcher Called when drilling happens. |
| uriResolver | false | function | Custom method for querying URIs for identifiers. Defaults to the standard Gooddata SDK .`getObjectUri()`. |
| onError | false | function | Custom error handler. Called with the argument containing the state and original error message, for example: `{ status:ErrorStates.BAD_REQUEST,error: {...} }` See the [full list of error states](https://github.com/gooddata/gooddata-react-components/blob/master/src/constants/errorStates.ts). Defaults to`console.error`. |
| onLoadingChanged | false | function | Custom loading handler. Called when a visualization changes to/from the loading state. Called with the argument denoting a valid state, for example: `{ isLoading:false}` |
| onLegendReady | false | [OnLegendReady](on_legend_ready)\(\) | Legend ready callback. Called when the visualization series are ready to render. Can be used to rendering custom legend. |

### Structure

To have the visualization rendered, specify either the visualization URI or visualization identifier.

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';
 
<div style={{ height: 400, width: 600 }}>
    <Visualization
        projectId="<project-id>"
        identifier="<visualization-identifier>"
        config={<chart-config>}
    />
</div>
```

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';

<div style={{ height: 400, width: 600 }}>
    <Visualization
        projectId="<project-id>"
        uri="<visualization-uri>"
        config={<chart-config>}
    />
</div>
```

### Example

This example uses data from the GoodSales // TODO REMOVE! demo project. For testing purposes, you can use this snippet as is.

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';
 
<div style={{ height: 400, width: 600 }}>
    <Visualization
        identifier="aoJqpe5Ib4mO"
        projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
        config={{
            colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
            legend: {
                enabled: true,
                position: 'bottom'
            }
        }}
    />
</div>
```

## Charts and Tables

Alternatively, you can use various charts or table components defined by AFM, see [AFM React Components](afm_react_components.md)).
