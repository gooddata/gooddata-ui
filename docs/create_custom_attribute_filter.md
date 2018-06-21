---
id: create_custom_attribute_filter
title: Create a Custom Attribute Filter
sidebar_label: Create Custom Filter
copyright: (C) 2007-2018 GoodData Corporation
---

Attribute elements component is a low level counterpart to the [Attribute Filter component](attribute_filter_component.md).

It lists attribute values and allows you to completely customize how they are rendered.

The child function receives the following arguments:

* an array of attribute values
* a callback to load more values
* loading status
* an optional error object

### Example

In the following example, attribute values are listed as a combination of checkboxes and label elements, a 'load more' button, and an ```onChange``` callback that logs the selected values to the console.

<!-- code from Examples: https://github.com/gooddata/gooddata-react-components/blob/master/examples/src/components/AttributeElementsExample.jsx -->

```javascript
import React, { Component } from 'react';
import { AttributeElements } from '@gooddata/react-components';
import PropTypes from 'prop-types';

import '@gooddata/react-components/styles/css/main.css';

import { employeeNameIdentifier, projectId } from '../utils/fixtures';

export class AttributeFilterItem extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired
    };

    onChange(uri) {
        // eslint-disable-next-line no-console
        return event => console.log('AttributeFilterItem onChange', uri, event.target.value === 'on');
    }

    render() {
        const { title, uri } = this.props;
        return (
            <label className="gd-list-item s-attribute-filter-list-item" style={{ display: 'inline-flex' }}>
                <input type="checkbox" className="gd-input-checkbox" onChange={this.onChange(uri)} />
                <span>{title}</span>
            </label>
        );
    }
}

export class AttributeElementsExample extends Component {
    render() {
        return (
            <div style={{ minHeight: 500 }}>
                <AttributeElements identifier={employeeNameIdentifier} projectId={projectId} options={{ limit: 20 }}>
                    {({ validElements, loadMore, isLoading, error }) => {
                        const {
                            offset = null,
                            count = null,
                            total = null
                        } = validElements ? validElements.paging : {};
                        if (error) {
                            return <div>{error}</div>;
                        }
                        return (
                            <div>
                                <button
                                    className="button button-secondary s-show-more-filters-button"
                                    onClick={loadMore}
                                    disabled={isLoading || (offset + count === total)}
                                >More
                                </button>
                                <h2>validElements</h2>
                                <pre>
                                    isLoading: {isLoading.toString()}<br />
                                    offset: {offset}<br />
                                    count: {count}<br />
                                    total: {total}<br />
                                    nextOffset: {offset + count}
                                </pre>
                                <div>
                                    {validElements ? validElements.items.map(item => (
                                        <AttributeFilterItem
                                            key={item.element.uri}
                                            uri={item.element.uri}
                                            title={item.element.title}
                                        />
                                    )) : null}
                                </div>
                                {validElements ? <pre>{JSON.stringify(validElements, null, '  ')}</pre> : null}
                            </div>
                        );
                    }}
                </AttributeElements>
            </div>
        );
    }
}
```
