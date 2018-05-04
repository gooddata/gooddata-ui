---
title: Execution REST API and Result
sidebar_label: Execution REST API and Result
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.0.0-execution_rest_api_and_result
original_id: execution_rest_api_and_result
---

This article provides an overview of the main API parts that you need to execute direct API calls.

## executeAfm Endpoint

```bash
POST /gdc/app/projects/<project-id>/executeAfm
```

The request body consists of [AFM](afm.md) and [resultSpec](result_spec.md):

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

## executionResults and polling

If fetching data from the GoodData infrastructure takes longer than expected, the API may periodically ask if the result is ready \(polling\). In this case, poll the URL from `executionResponse.link.executionResult` in the `executeAfm` response.

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

## Multidimensional paging

For a single defined dimension, parameters `offset` and `limits` have both one number.

For two dimensions, the parameters have two values separated by a comma. In the response, it is an array with two values. The first value represents the first dimension, the second value represents the second dimension.

For example, if you set the limit to`3,2`, the pages could be retrieved in four requests with offsets `0,0` and `0,2` and `3,0` and`3,2` respectively.

| \[ 11, 12 \] \[ 21, 22 \] \[ 31, 32 \] | \[ 13 \] \[ 23 \] \[ 33 \] |
| :--- | :--- |
| \[ 41, 42 \] | \[ 43 \] |

The first dimension of the data is the "rows", the second is the "columns". For more information, see 'Dimensions' in [Result Specification \(resultSpec\)](result_specification.md).

For details, see [executeAfm test scenarios](https://github.com/gooddata/gooddata-js/blob/master/test/execution/execute-afm.test.js#L228) from the GoodData JavaScript SDK.

GoodData JavaScript SDK automatically requests all pages and merges them into one canvas.
