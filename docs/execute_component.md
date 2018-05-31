---
title: Execute API Call
sidebar_label: Execute API Call
copyright: (C) 2007-2018 GoodData Corporation
id: execute_component
---

Execute component allows you to execute input data and send it to the function that you chose to use and then implemented. You can use the Execute component, for example, to create a report using an arbitrary chart library.

You specify the input data by using the component parameters. Then, the execution result is sent to the function that you specify as a child in the Execution component.

## Parameters

| Name | Required? | Type |
| :--- | :--- | :--- |
| afm | true | [AFM](afm.md) |
| projectId | true | string |
| resultSpec | false | [Result Specification \(resultSpec\)](result_specification.md) |
| onError | false | function |
| onLoadingChanged | false | function |
| onLoadingFinish | false | function |

* If you specify a function in the `onError` parameter, this function will be called in case of an error. It is always executed after `onLoadingChanged`. The first parameter is an error object: `{ status: ErrorStates, error?: string }`. Status can be one of the following \(use `import { ErrorStates } from '@gooddata/react-components'`\):

  * `ErrorStates.DATA_TOO_LARGE_TO_COMPUTE`
  * `ErrorStates.HTTP_BAD_REQUEST`
  * `ErrorStates.UNKNOWN_ERROR`

* If you specify a function in the `onLoadingChanged` parameter, this function will be called every time a data load starts or finishes, and it will get either the `{isLoading: true}` or `{isLoading: false}` object as a parameter. It is always executed before `onError`.

* If you specify a function in the `onLoadingFinish` parameter, this function will be called every time a data load finishes successfully, and it will get the execution result object `{ result }` as a parameter. It is always executed after `onLoadingChanged`. `onLoadingFinish` is *not* called when an execution finishes with an error.

* Empty execution results can be found by an empty data property in the result. To check if the result is empty, use `import { isEmptyResult } from '@gooddata/react-components'`.

## Example

The following example shows the function specified as a child in the Execution component that displays the execution output on the console.

```javascript
import { Execute, isEmptyResult } from '@gooddata/react-components';

<Execute afm={<afm>} projectId={<project-id>} onLoadingChanged={e=>{}} onLoadingFinish={e=>{}} onError={e=>{}}>
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

## Execution result

Execution result is a data structure that is returned from the GET command on the execution request URL.

### Structure

```javascript
{
  data: [
    [ '58656.37', '33098.97', '123633.07', '75019.19' ],
    ...
  ],
  paging: {
    count: [ 7, 4 ],
    offset: [ 0, 0 ],
    total: [ 7, 4 ]
  },
  headerItems: [
    [
      [
        {
          attributeHeaderItem: {
            name: 'Apparel',
            uri: '/gdc/md/k790ohq1d8xcas9oipmwfs544tqkepku/obj/15399/elements?id=1200'
          }
        },
        ...
      ]
    ],
    [
      [
        {
          attributeHeaderItem: {
            name: 'Midwest',
            uri: '/gdc/md/k790ohq1d8xcas9oipmwfs544tqkepku/obj/15386/elements?id=2052'
          }
        },
        ...
      ],
      [
        {
          measureHeaderItem: {
            name: 'Sum of Orders',
            order: 0
          }
        },
        ...
      ]
    ]
  ]
}
```

**Data**

The `data` property lists the requested measure values, usually in a two-dimensional array. The array dimensions match the dimensions defined in `ResultSpec`. For example, in the previous code example, the first line matches the measure value \(`Sum of Orders`\) of the attribute on the first dimension \(`Apparel`\), and the first value in the second dimension matches the attribute value on the second dimension \(`Midwest`\).

**Paging**

Currently, the Execute component fetches sequentially all pages in all dimensions, so this section contains "paging" data for the first fetched page. That means only the `total` property is correct, and equals to the counts of the `data` array.

Paging lists:

* count \(count of items on the current page\)
* offset \(count of items on all previous pages\)
* total \(total count of all items on all pages\)

The values are listed in an array for each dimension separately. This means that you can, for example, request a paged data table in two dimensions \(lines and columns\).

**Header items**

The header items array lists all header items \(also called elements\) in a three-dimensional array, where:

* The first level has the dimensions: one or two records, one for each respective dimensions in `resultSpec.dimensions`. In the previous code example, `Apparel` is an attribute value on the first dimension, `Midwest` is an attribute value on the second dimension, and `Sum of Orders` is a measure on the second dimension.
* The second level has the items: one record for each item in the dimension's `itemIdentifiers`. The order is the same as they were defined in `ResultSpec`.
* The third level has the values \(also known as elements\): one record for each element in the individual item \(`attribute` or `measureGroup`\).

## Complex use case example

The following example shows how to handle `onLoadingChanged` and `onError` callbacks within a custom component. The React `key` prop is used to force remounting of the Execute component on retry. The example fails randomly 50% of the time to showcase handling of error states.

```javascript
import React, { Component } from 'react';
import { Execute, isEmptyResult } from '@gooddata/react-components';

import { totalSalesIdentifier, projectId } from '../utils/fixtures';
import { Loading } from './utils/Loading';
import { Error } from './utils/Error';

export class ExecuteExample extends Component {
    constructor(props) {
        super(props);

        // We need to track error and isLoading states, executionNumber to force remount of execution component
        this.state = {
            error: null,
            isLoading: true,
            executionNumber: 0,
            willFail: true
        };
        this.onLoadingChanged = this.onLoadingChanged.bind(this);
        this.onError = this.onError.bind(this);
        this.retry = this.retry.bind(this);
    }

    onLoadingChanged({ isLoading }) {
        // eslint-disable-next-line no-console
        console.log('isLoading', isLoading);
        // onLoadingChanged must reset the error so that we are not in error during loading
        // onError is run after onLoadingChanged so we do not have to worry about an overriding current error
        this.setState({
            isLoading,
            error: null
        });
    }

    onError(error) {
        // eslint-disable-next-line no-console
        console.log('onError', error);
        this.setState({
            error
        });
    }

    retry() {
        // eslint-disable-next-line no-console
        console.log('retry');
        // We need to track executionNumber so that we can remount the Execute component
        // To showcase error states, here we also decide if the next execution will fail or not
        this.setState({
            executionNumber: this.state.executionNumber + 1,
            willFail: this.state.executionNumber % 2
        });
    }

    executeChildrenFunction(res) {
        console.log(res);
        const { result, isLoading, error } = res;

        if (error) {
            return <Error error={error} />;
        }
        if (isLoading) {
            return <Loading />;
        }
        return (
            <div>
                <style jsx>{`
                    .kpi {
                        height: 60px;
                        margin: 10px 0;
                        font-size: 50px;
                        line-height: 60px;
                        white-space: nowrap;
                        vertical-align: bottom;
                        font-weight: 700;
                    }
                `}</style>
                <p className="kpi s-execute-kpi">{result.executionResult.data[0]}</p>
                <p>Full execution response and result as JSON:</p>
                <pre>{JSON.stringify({ result, isLoading, error }, null, '  ')}</pre>
            </div>
        );
    }

    render() {
        const { error, isLoading, executionNumber, willFail } = this.state;
        const afm = {
            measures: [
                {
                    localIdentifier: 'measure',
                    definition: {
                        measure: {
                            item: {
                                // To showcase the fail state, we send the invalid measure URI
                                identifier: willFail ? totalSalesIdentifier : null
                            }
                        }
                    }
                }
            ]
        };

        let status = null;

        // This is how we render loading and error states
        if (isLoading) {
            status = <div className="gd-message progress"><div className="gd-message-text">Loading…</div></div>;
        } else if (error) {
            status = <div className="gd-message error"><div className="gd-message-text">Oops, simulated error! Retry?</div></div>;
        }

        return (
            <div>
                {status}
                <p>
                    <button onClick={this.retry} className="button button-secondary s-retry-button">Retry</button>
                    (fails every second attempt)
                </p>
                {/*
                    We need to render the Execute component even in loading
                    otherwise the ongoing request is cancelled
                */}
                <Execute
                    key={executionNumber}
                    afm={afm}
                    projectId={projectId}
                    onLoadingChanged={this.onLoadingChanged}
                    onError={this.onError}
                >{this.executeChildrenFunction}
                </Execute>
            </div>
        );
    }
}

export default ExecuteExample;
```
