---
title: Create Custom Visualization 
sidebar_label: Create Custom Visualization
copyright: (C) 2007-2018 GoodData Corporation
id: create_new_visualization
---

With GoodData.UI, you can create your new visual components to address your specific analytics needs.

Your component code must be wrapped within the Execute component. This component lets you conveniently specify
the data to render and then access the results:

```javascript
import { Execute } from '@gooddata/sdk-ui';

<Execute
    workspace={<project-id>} 
    seriesBy={measuresAndAttributes} 
    slicesBy={attributes} 
    onLoadingChanged={e=>{}} onError={e=>{}}>

    {
        (execution) => {
            const { isLoading, error, result } = execution;
            if (isLoading) {
                return (<div>Loading data...</div>);
            } else if (error) {
                return (<div>There was an error</div>);
            }
            
            // access result by slices (rows); 
            const slices = result.data().slices().toArray();

            return (
                <div>
                    {slices.map((slice, idx) => {
                        // for each slice (row), print the header and then the actual formatted data points
                        return (
                            <div key="idx">
                                {slice.sliceTitles().join(">")} - {slice.dataPoints().map(dp => dp.formattedValue())}
                            </div>)
                })}
            </div>
            )
        }
    }
</Execute>
```

## Data Series and Data Slices

The data series and slices concept used by the Execute component is best explained on a couple of real-life examples. 

### Tabular data

Imagine that you want to create a custom table component. This component should show one row for each value of an 
attribute `A1` and in each row there should be two columns - one for measure `M1` and one for measure `M2`.

In this scenario the data series are the two measures `M1` and `M2` and the slices are defined from the attribute `A1`.  

Now imagine that this typical table must become more dynamic. For each value of attribute `A2` it must include two columns:
one for each measure `M1` and `M2`. 

In this scenario, the data series are measures `M1` and `M2`, **scoped** to values of attribute `A2`. And on top of it, 
these columns are sliced by values of attribute `A1`.

### Scalars

Imagine that you want to create a custom KPI component. This component should show a couple of key performance indicators,
each calculated from a different measures `M1`, `M2` and `M3`.

In this scenario, the data series are the measures `M1`, `M2` and `M3` and there are no data slices at all.

## Working with the results

Once the Execute component reads the results from Analytical Backend, it will pass the result to your custom function. 
The instance of result contains several methods for convenient data access.

  -  You can access the result by data series by calling the `result.data().series()`
  -  You can access the result by data slices by calling the `result.data().slices()`
  -  These methods return a collection of series and slices respectivelly. 
  -  You can either iterate the items from collection using the `for-of` loop or transform it to an array and then use the typical array mapping and manipulation functions
     of Javascript.
  -  For each series or slice item, you can then iterate the available data points
     -  Iterating data points for a series gives you one data point per slice
     -  Iterating data points for a slice gives you one data point per series
  -  Each data point contains both data and all available metadata (series descriptor, slice descriptor). You can
     access either the raw data or formatted data.
     
**Note**: while the result instance exposes the raw results from the backend, we strongly discourage you from accessing
the raw data.