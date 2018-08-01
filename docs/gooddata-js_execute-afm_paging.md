---
title: gooddata-js executeAfm paging
sidebar_label: gooddata-js executeAfm paging
copyright: (C) 2007-2018 GoodData Corporation
id: gooddata-js_execute-afm_paging
---

You can now get paged data from `executeAfm` endpoint using [gooddata-js](https://github.com/gooddata/gooddata-js).

```javascript
/* Importing dependencies */
import { factory as SdkFactory } from '@gooddata/gooddata-js';
const sdk = SdkFactory();
```

```javascript
/* Defining AFMs and (optionally) resultSpec */
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
```

### Get execution response
```javascript
const execution = {
    execution: {
        afm,
        resultSpec
    }
};

sdk.execution.getExecutionResponse('<project-id>', execution)
    .then(
        (executionResponse) => { 
            console.log(executionResponse);
        }
    );
```

### Get one page of Result from Execution (with requested limit and offset)
```javascript
// you can get execution result URI from the response of the getExecutionResponse function
// limit and offset are arrays with size equals number of dimensions
sdk.execution.getPartialExecutionResult('<execution-result-uri>', [100, 100], [0,0])
    .then(
        (partialExecutionResult) => { 
            console.log(partialExecutionResult);
        }
    );
```

### Get whole ExecutionResult (all pages in one object)
```javascript
// you can get execution result URI from the response of getExecutionResponse function
sdk.execution.getExecutionResult('<execution-result-uri>')
    .then(
        (executionResult) => { 
            console.log(executionResult);
        }
    );
```
