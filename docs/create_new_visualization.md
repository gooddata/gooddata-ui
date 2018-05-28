---
title: Create Custom Visualization 
sidebar_label: Create Custom Visualization
copyright: (C) 2007-2018 GoodData Corporation
id: create_new_visualization
---

With GoodData.UI, you can create your new visual components to address your specific analytics needs.

Your component code must be wrapped within the Execute component.

```javascript
import { Execute, isEmptyResult } from '@gooddata/react-components';

<Execute afm={<afm>} projectId={<project-id>} onLoadingChanged={e=>{}} onError={e=>{}}>
    {
        (execution) => {
            const { isLoading, error, result } = execution;
            if (isLoading) {
                return (<div>Loading data...</div>);
            } else if (error) {
                return (<div>There was an error</div>);
            }
            
            return isEmptyResult(result) ? (<div>Empty result</div>) : (<div>{JSON.stringify(result.executionResult)}</div>);
        }
    }
</Execute>
```

The process of creating a new visualization component comprises the following stages:

1. [Set up an AFM Query](afm.md)

Specify the combination of attributes, measures and filters to describe your query

2. [Specify Result Data](result_specification.md)

Define the requested structure of the result data.

3. (Optional) [Configure Table Totals](table_totals_in_execution_context.md)

Define table totals for your visualization component.

4. [Execute API Call](execution_rest_api_and_results.md)

Execute input data and send it to the chosen function.
