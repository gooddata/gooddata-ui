---
title: Embed an Insight Created in Analytical Designer 
sidebar_label: Embed an Insight
copyright: (C) 2007-2018 GoodData Corporation
id: ht_embed_visualization
---

To embed an existing visualization created in Analytical Designer, use the `Visualization` component.

**Steps:**

1. Obtain the identifier of the visualization via [catalog-export](02_start__catalog_export.md).

2. Import the `InsightView` component from the `@gooddata/sdk-ui-ext` package into your app:

```javascript
import { InsightView } from '@gooddata/sdk-ui-ext';
```

3. Create a `InsightView` component in your app, and provide it with the project ID and the visualization identifier that you obtained at Step 1:

```jsx
import { InsightView } from '@gooddata/sdk-ui-ext';

<InsightView
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)'],
        legend: {
            enabled: true,
            position: 'bottom'
        }
    }}
/>
```
