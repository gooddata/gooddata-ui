---
title: Access Multiple Domains and Projects
sidebar_label: Access Multiple Domains and Projects
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.0.0-ht_render_visualization_from_different_domain
original_id: ht_render_visualization_from_different_domain
---

Sometimes, you need to render visualizations from different projects and different domains on one page. For example, you might be creating a dashboard with a sales overview for different products, or you want to use a product from a different domain to benchmark products in your current domain.

Every SDK instance is connected to a specific domain. To use multiple domains in the same application, create multiple SDK instances and pass them to your components. Every component imported from `@gooddata/react-components` contains an optional `sdk` property, by which you can specify the component that will fetch data.

## Example

```javascript
import React, { PureComponent } from 'react';
import { factory as sdkFactory } from 'gooddata';
import { Visualization } from '@gooddata/react-components';
 
 
export default class SampleVisualizations extends PureComponent {
    constructor(props) {
        super(props);
         
        const domain1 = 'my-custom-domain.com';
        this.sdkDomain1 = sdkFactory({ domain: domain1 });
     
        const domain2 = 'another-custom-domain.com';
        this.sdkDomain2 = sdkFactory({ domain: domain2 });
    }
 
    render() {
        return (
            <div>
                <div style={{ height: 400, width: 600 }}>
                    <Visualization
                        identifier="<identifier-from-domain1>"
                        projectId="<projectId-from-domain1>"
                        sdk={this.sdkDomain1}
                    />
                </div>
                <div style={{ height: 400, width: 600 }}>
                    <Visualization
                        identifier="<identifier-from-domain2>"
                        projectId="<projectId-from-domain2>"
                        sdk={this.sdkDomain2}
                    />
                </div>
            </div>
        );
    }
}
```
