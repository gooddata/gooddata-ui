---
title: Treemap
sidebar_label: Treemap
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.2.0-treemap_component
original_id: treemap_component
---
Treemap chart presents your data hierarchically as nested rectangles. Treemaps are useful for comparing proportions within the hierarchy.

![Treemap Component](assets/treemap.png "Treemap Component")

**NOTE:** The legend of a treemap is located on the right. Changing the legend position is currently not supported.

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Treemap } from '@gooddata/react-components';

<Treemap
    projectId={<project-id>}
    measures={<measures>}
    viewBy={<attribute>}
    segmentBy={<attribute>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { Treemap } from '@gooddata/react-components';

const numberOfChecks = {
        measure: {
            localIdentifier: 'numberOfChecks',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: numberOfChecksIdentifier
                    }
                }
            },
            alias: '# Checks',
            format: '#,##0'
        }
    };

const locationState = {
    visualizationAttribute: {
        displayForm: {
            identifier: locationStateDisplayFormIdentifier
        },
        localIdentifier: 'label.restaurantlocation.locationstate'
    }
};

const locationCity = {
    visualizationAttribute: {
        displayForm: {
            identifier: locationCityDisplayFormIdentifier
        },
        localIdentifier: 'label.restaurantlocation.locationcity'
    }
};

<div style={{ height: 300 }}>
    <Treemap
        projectId={projectId}
        measures={[numberOfChecks]}
        viewBy={locationState}
        segmentBy={locationCity}
        onLoadingChanged={this.onLoadingChanged}
        onError={this.onError}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measures | true | Measure[] | An array of measure definitions|
| viewBy | false | Attribute | An attribute definition |
| segmentBy | false | Attribute | An attribute definition |
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
