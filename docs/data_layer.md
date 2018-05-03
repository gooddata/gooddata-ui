---
title: Access Low Level API (DataLayer)
sidebar_label: Access Low Level API
copyright: (C) 2007-2018 GoodData Corporation
id: data_layer
---

DataLayer is mostly intended for advanced use cases \(for example, to write advanced custom components\).

For the majority of use cases involving custom visualizations, we recommend that you try using the [Execute component](execute_component.md) first. If it does not meet your requirements, you can always go back to using DataLayer.

DataLayer obtains data from your project either using AFM+ResultSpec or Visualization URI. You can use that data, for example, to create a visualization that is not a part of GoodData.UI.

![Data layer](assets/data_layer_diagram.png)

## How to use DataLayer

In the following code sample, replace the parameter placeholders with your values, and then execute the code.

The parameter placeholders are:

* &lt; measure-identifier &gt;
* &lt; project-id &gt;

For more information about AFM and resultSpec, see [AFM](afm) and [Result Specification \(resultSpec\)](result_specification.md).

Though you can use either object URIs or object identifiers, we recommend that you use only the **object identifiers** that are consistent across your domain regardless of the GoodData project they live in. In other words, an object used in any project within your domain should have the _same_ object identifier in _any_ of those projects\). To get a list of catalog items and date datasets from a GoodData project in the form of a JavaScript object, use [gdc-catalog-export](gdc-catalog-export.md).

```javascript
/*
Importing GoodData DataLayer dependencies
and GoodData Java Script SDK
(https://github.com/gooddata/gooddata-js)
*/
import { DataTable, ExecuteAfmAdapter } from '@gooddata/data-layer';
import * as sdk from 'gooddata';
 
/*
Defining AFMs and (optionally) resultSpec
*/
const afm = {
    measures: [
        {
            localIdentifier: 'measure1', // An identifier which will be referenced in the execution results
            definition: {
                measure: {
                    item: {
                        identifier: '<measure-identifier>'
                    }
                }
            }
        }
    ]
};

const resultSpec = {
    dimensions: [
        {
            itemIdentifiers: ['measureGroup']
        }
    ]
};

/*
Initializing the Adapter object
The Adapter converts the AFMs for the backend to process.
*/
const adapter = new ExecuteAfmAdapter(sdk, '<project-id>');
 
/*
Initializing the Data Table object
The Data Table processes the AFMs and resultSpec and returns raw data from the backend.
*/
const dataTable = new DataTable(adapter);
 
/*
Adding callbacks that will be called once the data is ready or if the execution fails.
*/
dataTable.onData((data) => console.log(data));
dataTable.onError((err) => console.error(err));
 
/*
Executing the defined AFMs and resultSpec
*/
dataTable.getData(afm, resultSpec);
```
