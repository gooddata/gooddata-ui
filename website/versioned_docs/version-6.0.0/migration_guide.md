---
title: Migration guide to React Components v6.x.x
sidebar_label: Migration guide to v6.x.x
copyright: (C) 2007-2018 GoodData Corporation
id: version-6.0.0-migration_guide_6
original_id: migration_guide_6
---

## Heatmap props were renamed
Names of props on the Heatmap with bucket interface were changed to better express their semantics. We advise you to change the props names in your application.

### Example usage
Old way:
```javascript
<Heatmap
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure={MEASURE_1}
    segmentBy={ATTRIBUTE_1}
    trendBy={ATTRIBUTE_2}
    onError={onErrorHandler}
    LoadingComponent={null}
    ErrorComponent={null}
/>
```
New way:
```javascript
<Heatmap
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    measure={MEASURE_1}
    columns={ATTRIBUTE_1}
    rows={ATTRIBUTE_2}
    onError={onErrorHandler}
    LoadingComponent={null}
    ErrorComponent={null}
/>
```

## Type definitions of the Area chart "stack by"/"view by" props were changed
We fixed the type for Area chart bucket props from an array to a single item.

### Example usage
Old way:
```javascript
const attributes = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: monthDateIdentifier
            },
            localIdentifier: 'month'
        }
    }
];

<AreaChart
    projectId={projectId}
    measures={measures}
    viewBy={attributes}
    onLoadingChanged={this.onLoadingChanged}
    onError={this.onError}
/>

```
New way:
```javascript
const viewBy = {
    visualizationAttribute: {
        displayForm: {
            identifier: monthDateIdentifier
        },
        localIdentifier: 'month'
    }
};


<AreaChart
    projectId={projectId}
    measures={measures}
    viewBy={viewBy}
    onLoadingChanged={this.onLoadingChanged}
    onError={this.onError}
/>
```

## rgba color definition deprecated
We removed support for the alpha channel definition as we do not want to support transparency of chart colors. To keep your custom colors working, remove the definition of the alpha channel.

### Example usage
Old way:
```javascript
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']
    }}
/>
```
New way:
```javascript
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)']
    }}
/>
```

## React 16 support
We updated Gooddata.UI to React 16. We advise you to update your application as well to avoid package duplicity and potential issues. Update also all your packages with React dependency, such as "react-dom", "react-router", etc.
