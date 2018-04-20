---
title: Migration guide to React Components v5.x.x
sidebar_label: Migration guide to v5.x.x
copyright: (C) 2007-2018 GoodData Corporation
id: migration_guide_5
---

## [@gooddata/data-layer](https://yarnpkg.com/en/package/@gooddata/data-layer) deprecated
This package is deprecated. Functionality was merged into [gooddata-js](https://github.com/gooddata/gooddata-js) repository. Package `gooddata` was renamed to `@gooddata/gooddata-js`. So use `@gooddata/gooddata-js@6.0.0` package instead of `@gooddata/data-layer`.

### Example usage
Old way:
```javascript
import { ExecuteAdapter } from '@gooddata/data-layer';

const adapter = ExecuteAfmAdapter;
```
New way:
```javascript
import { DataLayer } from '@gooddata/gooddata-js';

const adapter = DataLayer.ExecuteAfmAdapter;
```

## [@gooddata/react-components@5.0.0](https://yarnpkg.com/en/package/@gooddata/react-components)
### React 15.6.2
Upgrade React from 15.3.2 to 15.6.2
```bash
yarn upgrade react@15.6.2
yarn upgrade react-dom@15.6.2
```

## Components with buckets interface
[AFM React Components](http://sdk.gooddata.com/gdc-ui-sdk-doc/docs/afm_react_components.html) will be deprecated in one of the the next versions. We suggest to use components with buckets interface. E.g. [Line Chart Component](line_chart_component.md)

[Execute Component](http://sdk.gooddata.com/gdc-ui-sdk-doc/docs/execute_component.html) and [KPI and Visualization](react_components.md) are without change.

### Example usage

Old way:
```javascript
import { AfmComponents } from '@gooddata/react-components';
 
const { BarChart } = AfmComponents;
 
<BarChart
    afm={{
        measures: [
            {
                localIdentifier: 'CustomMeasureID',
                definition: {
                    measure: {
                        item: {
                            identifier: 'acKjadJIgZUN'
                        }
                    }
                },
                alias: '# of Activities'
            }
        ],
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: {
                    identifier: 'label.activity.type'
                }
            }
        ]
    }}
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    resultSpec={}
/>
```
New way:
```javascript
import { BarChart } from '@gooddata/react-components';

const numOfActivities = {
    measure: {
        localIdentifier: 'CustomMeasureID',
        definition: {
            measureDefinition: {
                item: {
                    identifier: 'acKjadJIgZUN'
                }
            }
        },
        alias: '# of Activities'
    }
};

const activityType = {
    visualizationAttribute: {
        localIdentifier: 'a1',
        displayForm: {
            identifier: 'label.activity.type'
        }
    }
};

<div style={{ height: 300 }}>
    <BarChart
        projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
        measures={[numOfActivities]}
        viewBy={activityType}
    />
</div>
```


### LoadingComponent and ErrorComponent properties
`@gooddata/react-components@5.0.0` now supports [Loading Component](loading_component.md) and [Error Component](error_component.md) properties which shows GoodData loading component and GoodData error component by default. If you want disable default components, you must set `LoadingComponent={null}` and `ErrorComponent={null}` properties in your components. You probably want disable default GoodData Loading and Error components if you already have implemented your own loading and errors based on `onError` and `onLoadingChanged` callbacks. 

### Remove backward compatible CatalogHelper code
With `@gooddata/react-components@4.1.1` you could have used e.g.:
```javascript
import { CatalogHelper } from '@gooddata/react-components'
import catalogJson from './catalog.json';

const C = new CatalogHelper(catalogJson);

const measure = C.metric('Amount');
const measure = C.metricTags('Revenue');

// or

const measure = C.measure('Amount');
const measure = C.measureTags('Revenue');
```

With `@gooddata/react-components@5.0.0` you must use only
```javascript
const measure = C.measure('Amount');
const measure = C.measureTags('Revenue');
```

You must also upgrade your globally installed [gdc-catalog-export](https://yarnpkg.com/en/package/gdc-catalog-export)
```bash
yarn global upgrade gdc-catalog-export
```
