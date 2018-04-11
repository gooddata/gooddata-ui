---
title: Embed a Visualization
sidebar_label: Embed a Visualization
copyright: (C) 2007-2018 GoodData Corporation
id: ht_embed_visualization
---

To embed an existing visualization created in Analytical Designer, use the `Visualization` component.

**Steps:**

1. Obtain the identifier of the visualization by either of the following methods:

   * Via [gdc-catalog-export](gdc-catalog-export.md)
 
   * Via the gray pages \(the ID of the GoodSales demo project is `la84vcyhrq8jwbu4wpipw66q2sqeb923`\):

```bash
https://secure.gooddata.com/gdc/md/{project-id}/query/visualizations
https://secure.gooddata.com/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/query/visualizations
```

2. Import the `Visualization` component from the `@gooddata/react-components` package into your app:

```javascript
import{ Visualization } from'@gooddata/react-components';
```

3. Create a `Visualization` component in your app, and provide it with the project ID and the visualization identifier that you obtained at Step 1:

```javascript
// This is an example of embedding a visualization from the GoodSales demo project.
<Visualization
    projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
    identifier="aby3polcaFxy"
    config={{
        colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
        legend: {
            enabled: true,
            position: 'bottom'
        }
    }}
/>
```
