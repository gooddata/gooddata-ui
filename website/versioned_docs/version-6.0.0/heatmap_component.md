---
title: Heatmap
sidebar_label: Heatmap
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.0.0-heatmap_component
original_id: heatmap_component
---
Heatmap represents data as a matrix where individual values are represented as colors. Heatmaps can help you discover trends and understand complex datasets.

![Heatmap Component](assets/heatmap.png "Heatmap Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Heatmap } from '@gooddata/react-components';

<Heatmap
    projectId={<project-id>}
    measure={<measure>}
    rows={<attribute>}
    columns={<attribute>}
    config={<chart-config>}
    …
/>
```
The following example shows the supported `config` structure with sample values. To see descriptions of individual options, see [ChartConfig section](chart_config.md).
```javascript
{
    xaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto'
    },
    yaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto'
    },
    legend: {
        enabled: true,
        position: 'top'
    },
    dataLabels: {
        visible: 'auto'
    },
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```

## Example

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Heatmap } from '@gooddata/react-components';

const totalSales = {
    measure: {
        localIdentifier: 'totalSales',
        definition: {
            measureDefinition: {
                item: {
                    identifier: totalSalesIdentifier
                }
            }
        },
        alias: '$ Total Sales',
        format: '#,##0'
    }
};

const menuCategory = {
    visualizationAttribute: {
        displayForm: {
            identifier: menuCategoryAttributeDFIdentifier
        },
        localIdentifier: 'menu'
    }
};

const locationState = {
    visualizationAttribute: {
        displayForm: {
            identifier: locationStateDisplayFormIdentifier
        },
        localIdentifier: 'state'
    }
};

<div style={{ height: 300 }} className="s-heat-map">
    <Heatmap
        projectId={projectId}
        measure={totalSales}
        rows={locationState}
        columns={menuCategory}
        onLoadingChanged={this.onLoadingChanged}
        onError={this.onError}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measure | true | Measure | A measure definition |
| rows | false | Attribute | An attribute definition |
| columns | false | Attribute | An attribute definition |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| config | false | [ChartConfig](chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](drillable_item.md)  | An array of points and attribute values to be drillable |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](loading_component.md).|
| onError | false | Function | A callback when component updates its error state |
| onLoadingChanged | false | Function | A callback when component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->
