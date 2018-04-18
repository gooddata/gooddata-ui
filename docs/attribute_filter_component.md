---
id: attribute_filter_component
title: AttributeFilter Component
sidebar_label: AttributeFilter Component
copyright: (C) 2007-2018 GoodData Corporation
---

This is a dropdown component that lists attribute values. You can pass a callback function, which receives a list of the selected values when a user clicks **Apply**.

![Attribute Filter Component](assets/attribute_filter.png "Attribute Filter Component")

## Example

In the following example, attribute values are listed and the ```onApply``` callback function is triggered when a user clicks **Apply** to confirm the selection.

<!-- code from Examples: https://github.com/gooddata/gooddata-react-components/blob/master/examples/src/components/AttributeFilterExample.jsx -->

```javascript
import React, { Component } from 'react';
import { AttributeFilter } from '@gooddata/react-components';

import '@gooddata/react-components/styles/css/main.css';

import { employeeNameIdentifier, projectId } from '../utils/fixtures';

export class AttributeFilterExample extends Component {
    onApply(params) {
        // eslint-disable-next-line no-console
        console.log('AttributeFilterExample onApply', ...params);
    }

    render() {
        return (
            <div>
                <AttributeFilter
                    identifier={employeeNameIdentifier}
                    projectId={projectId}
                    onApply={this.onApply}
                />
            </div>
        );
    }
}
```
