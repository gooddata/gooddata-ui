---
title: Execution Response and Execution Result
sidebar_label: Execution Response and Execution Result
copyright: (C) 2007-2018 GoodData Corporation
id: execution_rest_api_and_result
---

This article describes how to call executions on the server using either [gooddata-js](https://github.com/gooddata/gooddata-js) functions or direct API calls.

## Using gooddata-js

The [gooddata-js](https://github.com/gooddata/gooddata-js) library is a low-level wrapper of the Gooddata API. You can use it to run executions on the server.

Import `gooddata-js` to your project:

```javascripts
import { factory as SdkFactory } from '@gooddata/gooddata-js';
const sdk = SdkFactory();
```

To obtain data from the server, you have to call `gooddata-js` twice. This is because the result may be large. When you get the execution response, you can decide whether you want to download the whole result or just a part of it, or you do not want to download the result at all because your visualization cannot render it.

1. You send your requests for execution. As a response, you get a so-called "execution response" that contains information about where the result will be stored and its general structure.
2. You request the result data.

### Get an execution response

The execution response informs you about the future result.  It contains dimensions with headers that show the result size and its headers. The execution response also contains a link to the execution result where your data is stored.

To get the execution response, provide the project ID and the definition of the execution:

```javascript
sdk.execution.getExecutionResponse('<project-id>', execution)
    .then(
        (executionResponse) => {
            console.log(executionResponse);
        }
    );
```

The `execution` parameter consists of [AFM](50_custom__execution.md) and [resultSpec](50_custom__result_specification.md). It can be defined as follows:

```javascript
const afm = {
    measures: [
        {
            localIdentifier: '<local-identifier>',
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

const execution = {
    execution: {
        afm,
        resultSpec
    }
};
```

### Get the whole executionResult

If you want to get the whole result (all the data), use a `getExecutionResult` call. You will receive the whole result in one object. As a parameter, you pass the link that you have obtained in the execution response.

```javascript
sdk.execution.getExecutionResult('<execution-result-uri>')
    .then(
        (executionResult) => {
            console.log(executionResult);
        }
    );
```

### Get a part of executionResult

In some cases, you may need only a part of the data contained in the execution result. For example, you may be implementing paging in a table or building a preview, therefore you do not need all data. In this situation, call `getPartialExecutionResult`. As parameters, this call takes the link to the result from the execution response, page size, and offset.

The **page size** is a two-dimensional array that defines how big the data you are downloading from the server is.

The **offset** determines coordinates where the page is going to start in your result matrix. Because the offset is a two-dimensional array, you can scroll the result up and down and from the left to the right.

```javascript
// requesting first page (offset [0,0]) with size 100 x 100
sdk.execution.getPartialExecutionResult('<execution-result-uri>', [100, 100], [0,0])
    .then(
        (partialExecutionResult) => { 
            console.log(partialExecutionResult);
        }
    );
```

## Using direct API calls

If you cannot or do not want to use the `gooddata-js` library, you can call the server API directly.

### executeAfm endpoint

```bash
POST /gdc/app/projects/<project-id>/executeAfm
```

The request body consists of [AFM](50_custom__execution.md) and [resultSpec](50_custom__result_specification.md):

```javascript
{ "execution":
  { "afm": { ... }, "resultSpec":{ ... } }
}
```

The response returns `HTTP 201 Created`:

```javascript
{ "executionResponse":
  { "dimensions": [ ... ],
    "links": { "executionResult":"/gdc/app/projects/.../executionResults/1234?...&offset=0%2C0&limit=1000%2C1000&dimensions=2&totals=0%2C0" }
  }
}
```

### executionResults and polling

If fetching data from the GoodData infrastructure takes longer than expected, the API may periodically ask if the result is ready (polling). In this case, poll the URL from `executionResponse.link.executionResult` in the `executeAfm` response.

You can change the parameters to request different pages from the result. For example, to request only 10 items for both dimensions, set `limit=10,10`.

`totals=0,0` represents the number of expected table total types in dimensions.

```bash
GET /gdc/app/projects/.../executionResults/1234?...&offset=0%2C0&limit=10%2C10&dimensions=2&totals=0%2C0
```

You receive one of the following requests:

* `HTTP 200 OK`
  : the first page of the result data is returned in the response, as follows:

  ```javascript
  { "executionResult":
    { "data": [ ... ],
      "headerItems": [ ... ],
      "paging": {"count": [10,10],
      "offset": [0,0],
      "total": [30,50] }
    }
  }
  ```

* `HTTP 202 Accepted`: the data is not ready yet, request again
* `HTTP 204 No content`: execution returned no data

### Multidimensional paging

For a single defined dimension, the `offset` and `limits` parameters have only one number each.

For two dimensions, the parameters have two values separated by a comma. In the response, it is an array with two values. The first value represents the first dimension, the second value represents the second dimension.

For example, if you set the limit to `3,2`, the pages could be retrieved in four requests with offsets `0,0` and `0,2` and `3,0` and `3,2` respectively.

| [ 11, 12 ] <br> [ 21, 22 ] <br> [ 31, 32 ] | [ 13 ] <br> [ 23 ] <br> [ 33 ] |
| :--- | :--- |
| [ 41, 42 ] | [ 43 ] |

The first dimension of the data is the "rows", the second is the "columns". For more information, see 'Dimensions' in [Result Specification (resultSpec)](50_custom__result_specification.md).
