---
title: Set Up Drilling
sidebar_label: Set Up Drilling
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.0.0-ht_set_up_drilling
original_id: ht_set_up_drilling
---

To enable event drilling, extend the `Visualization` component with a `drillableItems` property. 

In the `drillableItems` property, add an array of `uri`s and/or `identifier`s of the measures and attributes that will become highlighted and drillable.

```javascript
// This is an example of event drilling on the visualization from the GoodSales demo project.
<Visualization
  projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
  identifier="aby3polcaFxy"
  drillableItems={[
    { identifier: 'label.owner.department' },
    { uri: '/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211' }
  ]}
/>
```

To catch events, add a listener to `document`:

```javascript
document.addEventListener('drill',function(arg) { console.log(arg.detail); });
```

Each event is a JSON consisting of `executionContext` and `drillableContext`. 

For more information, 
see [Setting up Events for Drilling in Embedded Analytical Designer and KPI Dashboards](https://help.gooddata.com/display/doc/Setting+up+Events+for+Drilling+in+Embedded+Analytical+Designer+and+KPI+Dashboards).

# DrillableItem

To turn on eventing and drilling, specify at least one drillableItem. Drillable items consist of measures, attribute displayForms that are defined by their identifier or URI, or attribute values defined by their URI. Visualization points that intersect any defined measures, attributes, or attribute values become drillable and will emit events when interacted with.

## Structure

```javascript
drillableItems: [
    {
        identifier: <identifier>  // measure or attribute displayForm identifier
        // or
        uri: <uri>    // measure, attribute displayForm, or attribute value uri
    },
    ...
]
```

## Example

```javascript
{ identifier: 'label.owner.department' } // or { uri: '/gdc/md/projectHash/obj/1027' }
```
