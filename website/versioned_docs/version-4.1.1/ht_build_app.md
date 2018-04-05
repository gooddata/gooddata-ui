---
title: How to Build an App
sidebar_label: How to Build an App
copyright: (C) 2007-2018 GoodData Corporation
id: version-4.1.1-ht_build_app
original_id: ht_build_app
---

## Prerequisites

To start using GoodData UI SDK, you must have the following:

* An account on the GoodData platform. If you do not have a GoodData account yet, [create a trial one](https://secure.gooddata.com/account.html?lastUrl=%252F#/registration/projectTemplate/urn%253Agooddata%253AOnboardingProductTour).
* GIT [https://git-scm.com/](https://git-scm.com/)
* `node.js` &gt; 6.9.1 and `npm` \(shipped together\) [https://nodejs.org/](https://nodejs.org/)
* \(Optional but recommended\) `yarn` [https://yarnpkg.com/](https://yarnpkg.com/)

## Build an App from Scratch
* Using Angular 1.x - see [How to Use React Components in Angular 1.x](ht_use_react_compinents_in_angular_1.x.md).
* Using Angular 2+ - see [How to Use React Components in Angular 2+](ht_use_react_components_in_angular_2.x.md).
* Using create-react-app - see [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md).
* Using custom React application:
  * Add the `@gooddata/react-components` package to your existing project:
    ```bash
    $ yarn add @gooddata/react-components
    or
    $ npm install @gooddata/react-components
    ```
  * Import the components that you want to use to your app. See below in "Basic Usage". Note that you must be authenticated to the GoodData platform to get execution result.


## Basic Usage
### Authenticate Your App
The following ways to authenticate your app are supported:
* If you're using `create-react-app`, see [How to Create Your First Visualization with GoodData UI SDK](ht_create_your_first_visualization.md).
* If you are using SSO, ... **TODO**


### Embed an Existing Visualization
To embed an existing visualization created in Analytical Designer, use the `Visualization` component.


**Steps:**
1. Obtain the identifier of the visualization by one of the following methods:
    * Via the gray pages ([find the ID of your project](https://help.gooddata.com/display/doc/Find+the+Project+ID), ie `la84vcyhrq8jwbu4wpipw66q2sqeb923`):
        ```bash
        https://secure.gooddata.com/gdc/md/{project-id}/query/visualizationobjects
        https://secure.gooddata.com/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/query/visualizationobjects
        ```
        //TODO what do next? where is identifier?
    * Via [gdc-catalog-export](gdc-catalog-export.md) tool
    
2. Import the `Visualization` component from the `@gooddata/react-components` package into your app:
    ```javascript
    import { Visualization } from '@gooddata/react-components';
    ```
    
3. Create a `Visualization` component in your app, and provide it with the project ID and the visualization identifier that you obtained at Step 1:
    ```javascript
    // be sure to wrap the component in block-element with non-auto height
    <div style={{ height: 300 }}>
      // This is an example of saved visualization (by identifier)
      <Visualization
        projectId="k26dtejorcqlqf11crn6imbeevp2q4kg"
        identifier="aepRx0i8haM7"
        />
    </div>
    ```


## Customize a Visualization
### Change Chart Colors
To change colors in a chart, provide a `config` for each component where you want to change colors, or create a wrapped components with a `config` baked in.

```javascript
import { Visualization } from '@gooddata/react-components';

// This is an example of embedding a visualization with custom colors and palette options
<div style={{ height: 300 }}>
    <Visualization
        projectId="k26dtejorcqlqf11crn6imbeevp2q4kg"
        identifier="aepRx0i8haM7"
        config={{
            colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)']
        }}
    />
</div>
```


### Change Legend Visibility and Position
To hide the legend, set the `config.legend.enabled` property to `false`.

To change the legend position, adjust the `config.legend.position` property (`'left'`/`'right'`/`'top'`/`'bottom'`.

```javascript
import { Visualization } from '@gooddata/react-components';

<div style={{ height: 300 }}>
    // This is an example of embedding a visualization custom colors and custom legend placement
    <Visualization
        projectId="k26dtejorcqlqf11crn6imbeevp2q4kg"
        identifier="aepRx0i8haM7"
        config={{
            colors: ['rgba(195, 49, 73, 1)', 'rgba(168, 194, 86, 1)'],
            legend: {
                enabled: true,
                position: 'bottom' // 'left', 'right', 'top'
            }
        }}
    />
</div>
```

### Customize Tooltips and Fonts
To customize tooltips and fonts, [implement a custom visualization](data_layer.md).


## Create a Visualization Programmatically on the Fly
This section explains how to create a bar chart that renders `# of Activities` sliced by `Activity Type`.
You can choose any [supported visualization type](react_components.md), ie: `BarChart`, `ColumnChart`, `LineChart`, `PieChart`, `Table` etc.  

**Steps:**
1. [Find your project ID](https://help.gooddata.com/display/doc/Find+the+Project+ID),
   we will use: `la84vcyhrq8jwbu4wpipw66q2sqeb923`.
2. Obtain data identifiers using [gdc-catalog-export](gdc-catalog-export).
3. Import the visualization type that you want to use.  
    ```javascript
    //TODO rewrite with new interface
    import { AfmComponents } from '@gooddata/react-components';
    import catalogue from './catalogue';
    
    
    const { BarChart } = AfmComponents;
    
    const projectId = 'la84vcyhrq8jwbu4wpipw66q2sqeb923'; // Replace with your project ID.
    const afm = {};
    const resultSpec = {};
    const customConfig = {};
    
    <BarChart afm={afm} resultSpec={resultSpec} config={customConfig} />
    ```



4. //TODO rewrite with new interface
   Prepare an AFM using the identifiers that you obtained at Step 2.
   To create a bar chart that renders `# of Activities` sliced by `Activity Type`, define the following elements:

   * AFM with a measure named `'m1'` with a base object named `'# of Activities'`.
   * Attribute to slice `# of Activities` sliced by `Activity Type`. To define the attribute, add the attribute in an attribute array. Get its identifier from the catalog that you created at Step 3.

    ```javascript
    //TODO rewrite with new interface
    
    import { AfmComponents } from '@gooddata/react-components';
    import catalogue from './catalogue';
    
    
    const { BarChart } = AfmComponents;
    
    const projectId = 'la84vcyhrq8jwbu4wpipw66q2sqeb923';
    const afm = {
        measures: [
            {
                localIdentifier: 'm1',
                definition: {
                    measure: {
                        item: {
                            identifier: catalogue['# of Activities']
                        }
                    }
                }
            }
        ],
        attributes: [
            {
                localIdentifier: 'a1',
                displayForm: {
                    identifier: catalogue['Activity Type']
                }
            }
        ]
    };
    const resultSpec = {};
    ...
    render() {
        return (
         <div style={{ height: 300 }}>
            <BarChart
                    afm={afm}
                    projectId={projectId}
                    resultSpec={resultSpec}
            />
         </div>
        )
    }
    ```

6. Prepare a resultSpec
   A resultSpec object is optional but it is used in this procedure for learning purposes. In this example, you are going to add a resultSpec object to define the attribute sort. To reference the attribute, the attribute localIdentifier created inside the AFM will be used.

    ```javascript
    //TODO rewrite with new interface
    ...
    const resultSpec = {
        sorts: [
            {
                attributeSortItem: {
                    direction: 'desc',
                    attributeIdentifier: 'a1'
                }
            }
        ]
    }
    
    ...
    
    render() {
        return (
         <div style={{ height: 300 }}>
            <BarChart
                    afm={afm}
                    projectId={projectId}
                    resultSpec={resultSpec}
            />
         </div>
        )
    }
    ```

7. Set up aconfigobject for your chart.

To personalize the bar chart further (for example, change colors), override the default chart options. For more information, see [AFM React Components     //TODO new components](amf.md).


## Set Up Drilling
To enable event drilling, extend the `Visualization` component with a `drillableItems` property. In the `drillableItems` property, add an array of `uri`'s and/or `identifier`'s of the measures and attributesthat will become highlighted and drillable.

```javascript
<div style={{ height: 300 }}>
    // This is an example of event drilling on saved visualization
    // drillable item contains list of measure uris
    <Visualization
        projectId="k26dtejorcqlqf11crn6imbeevp2q4kg"
        identifier="aa0wmZDugnUX"
        drillableItems={[
                { uri: '/gdc/md/k26dtejorcqlqf11crn6imbeevp2q4kg/obj/6983' }
            ]}
    />
</div>
```

To catch events, add a listener to `document`:
```javascript
document.addEventListener('drill', function(event) { console.log(event.detail); });
```

Each event is a JSON consisting of `executionContext` and `drillableContext`. For more information, see [Setting up Events for Drilling in Embedded Analytical Designer and KPI Dashboards](https://help.gooddata.com/display/doc/Setting+up+Events+for+Drilling+in+Embedded+Analytical+Designer+and+KPI+Dashboards).


Example of `event.detail`:
```json
{
    "executionContext":{"attributes":[{"displayForm":{"uri":"/gdc/md/k26dtejorcqlqf11crn6imbeevp2q4kg/obj/2211"},"localIdentifier":"8e48282f8da54080a30d51b13181b4b3"}],"measures":[{"localIdentifier":"edf1449e19df4175b027cc85746701d9","definition":{"measure":{"item":{"uri":"/gdc/md/k26dtejorcqlqf11crn6imbeevp2q4kg/obj/6983"}}},"alias":"# Employees"}],"filters":[],"nativeTotals":[]},
    "drillContext":{"type":"column","element":"bar","x":2,"y":70,"intersection":[{"id":"edf1449e19df4175b027cc85746701d9","title":"# Employees","header":{"uri":"/gdc/md/k26dtejorcqlqf11crn6imbeevp2q4kg/obj/6983","identifier":"aaTJSTfSaRBg"}},{"id":"6340105","title":"Florida","header":{"uri":"/gdc/md/k26dtejorcqlqf11crn6imbeevp2q4kg/obj/2211","identifier":"label.restaurantlocation.locationstate"}}]}
}

```