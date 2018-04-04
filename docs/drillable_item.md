---
title: DrillableItem
sidebar_label: DrillableItem
copyright: (C) 2007-2018 GoodData Corporation
id: drillable_item
---

To turn on eventing and drilling, specify at least one drillableItem. Drillable items consist of measures, attribute displayForms defined by their identifier or URI, or attribute values defined by their URI. Visualization points that intersect any defined measures, attributes, or attribute values become drillable and will emit events when interacted with.

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
