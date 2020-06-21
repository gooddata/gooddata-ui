---
title: Visualization
sidebar_label: Visualization
copyright: (C) 2007-2018 GoodData Corporation
id: visualization_component
---

Visualization is a generic component that renders a table or a chart according to the provided URI or identifier.

## Structure

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';

<div style={{ height: 400, width: 600 }}>
    <Visualization
        projectId="<project-id>"
        identifier="<visualization-identifier>"
        config={<chart-config>}
        sdk={<sdk>}
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
        sdk={<sdk>}
    />
</div>
```
**NOTE**: A set of options in <chart-config> is different for each Visualization component and depends on the type of the embedded visualization.

## Example

<!-- This example uses data from the GoodSales // TODO REMOVE! demo project. For testing purposes, you can use this snippet as is. -->

```javascript
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';

<div style={{ height: 400, width: 600 }}>
    <Visualization
        identifier="aoJqpe5Ib4mO"
        projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
        config={{
            colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)'],
            legend: {
                enabled: true,
                position: 'bottom'
            }
        }}
    />
</div>
```

## Filters

For more information, see [Filter Visual Components](30_tips__filter_visual_components.md).

## Caching

To properly render the referenced table or chart, the Visualization component needs additional information from the GoodData platform. This information is usually static. To minimize the number of redundant requests and reduce the rendering time, some static information (such as the list of visualization classes, the color palette, or feature flags for each project) is cached for all Visualization components in the same application.

The amount of the cached information does not impact performance in any way. However, you can manually clear the cache whenever needed (for example, after logging out, when switching projects or leaving a page with visualizations using the GoodData.UI components).

```javascript
import { clearSdkCache } from '@gooddata/react-components/dist/helpers/sdkCache';
...
clearSdkCache();
...
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| uri | false | string | The URI of the visualization to be rendered. Can be omitted if the visualization identifier is present. |
| identifier | false | string | The identifier of the visualization to be rendered. Can be omitted if the visualization URI is present. |
| locale | false | string | The localization of the visualization. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts). |
| config  | false | [ChartConfig](15_props__chart_config.md) | The chart configuration object |
| filters | false | [FilterItem[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| drillableItems | false | [DrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable. |
| onFiredDrillEvent | false | [onFiredDrillEvent()](15_props__on_drill.md) | The drilling event catcher. Called when drilling happens. |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| uriResolver | false | function | A custom method for querying URIs for identifiers. Defaults to the standard Gooddata SDK. `getObjectUri()`. |
| onError | false | function | A custom error handler. Called with the argument containing the state and original error message, for example: `{ status:ErrorStates.BAD_REQUEST,error: {...} }`. See the [full list of error states](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/errors/GoodDataSdkError.ts). Defaults to `console.error`.|
| onExportReady | false | Function | A callback when the component is ready for exporting its data |
| onLoadingChanged | false | function | A custom loading handler. Called when a visualization changes to/from the loading state. Called with the argument denoting a valid state, for example: `{ isLoading:false}`. |
| onLegendReady | false | [onLegendReady()](15_props__on_legend_ready.md) | The legend ready callback. Called when the visualization series are ready to render. Can be used for rendering a custom legend. |
