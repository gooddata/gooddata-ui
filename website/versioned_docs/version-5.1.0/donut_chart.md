---
title: Donut Chart
sidebar_label: Donut Chart
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.1.0-donut_chart_component
original_id: donut_chart_component
---

Donut chart shows data as proportional segments of a disc and has a hollowed out center. Donut charts can be segmented by either multiple measures or an attribute, and allow viewers to visualize component parts of a whole.

![Donut Chart Component](assets/donut_chart.png "Donut Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { DonutChart } from '@gooddata/react-components';

<DonutChart
    projectId={<project-id>}
    measures={<measures>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { DonutChart } from '@gooddata/react-components';

const measures = [
    {
        measure: {
            localIdentifier: 'franchiseFeesAdRoyaltyIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesAdRoyaltyIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchiseFeesInitialFranchiseFeeIdentifier',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesInitialFranchiseFeeIdentifier
                    }
                }
            },
            format: '#,##0'
        }
    },
    {
        measure: {
            localIdentifier: 'franchiseFeesIdentifierOngoingRoyalty',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: franchiseFeesIdentifierOngoingRoyalty
                    }
                }
            },
            format: '#,##0'
        }
    }
];

<div style={{ height: 300 }}>
    <DonutChart
        projectId={projectId}
        measures={measures}
    />
</div>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| measures | true | Measure[] | An array of measure definitions |
| viewBy | false | Attribute | Attribute definition |
| filters | false | Filter[] | An array of filter definitions |
| config | false | {} | The chart configuration object |
| locale | false | string | The location string for translations |
| drillableItems | false | DrillableItem[] | An array of points and attribute values to be drillable. See [DrillableItems](drillable_item.md).|
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
