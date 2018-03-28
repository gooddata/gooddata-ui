---
title: Set Up a Loading State for Embedded Insights
sidebar_label: Set Up a Loading State for Embedded Insights
copyright: (C) 2007-2018 GoodData Corporation
id: ht_set_up_loading_state_for_embedded_insights
---

The components BaseChart, Execute, Kpi, Table, and Visualization imported from `@gooddata/react-components` contain the `onLoadingChanged` property.

The `onLoadingChanged` property is a function that returns either a `{ isLoading: true }` object or a `{ isLoading: false }` object.

To your local state, add a flag that indicates whether the GoodData component is currently loading or not based on what object is returned. Based on this flag, define what custom-styled loading element should be shown while the GoodData component is loading.

## Example

This example uses data from the GoodSales demo project. For testing purposes, you can use this snippet as is.

```javascript
import React, { PureComponent } from 'react';
import { Visualization } from '@gooddata/react-components';
 
export default class SampleVisualization extends PureComponent {
    constructor(props) {
        super(props);
 
        this.onLoadingChanged = this.onLoadingChanged.bind(this);
        this.state = {
            isLoading: true
        };
    }
 
    onLoadingChanged({ isLoading }) {
        this.setState({
            isLoading
        });
    }
 
    renderLoading() {
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            );
        }
 
        return null;
    }
 
    renderVisualization() {
        return (
            <Visualization
                identifier="aby3polcaFxy"
                projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
                onLoadingChanged={this.onLoadingChanged}
            />
        );
    }
 
    render() {
        return (
            <div style={{ height: 400, width: 600 }}>
                {this.renderLoading()}
                {this.renderVisualization()}
            </div>
        );
    }
}
```
