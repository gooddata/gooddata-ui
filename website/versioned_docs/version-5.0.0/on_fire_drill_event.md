---
title: OnFireDrillEvent
sidebar_label: OnFireDrillEvent
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.0.0-on_fire_drill_event
original_id: on_fire_drill_event
---

The `onFiredDrillEvent` parameter allows you to catch drilling events from visualizations on non-embedded KPI dashboards and to respond to them using the function that you have chosen to use and implemented.

When a user clicks a [drillable item](drillable_item.md) in a visualization on a non-embedded KPI dashboard, a default drill event is generated. This event has a format of `{ drillContext, executionContext }` and is sent to the function that you have chosen.

* If you want the default drilling event not to be generated, the function must return `false`. In this case, only what you have implemented in the function body is performed.
* When the function returns anything else but `false`, whatever you have implemented in the function body is performed, and then the default drilling event is also generated.

## Structure

```javascript
<Visualization
   ....
   onFiredDrillEvent={({ drillContext, executionContext }) => {
      console.log('chart clicked!');
      var projectId = '<project-id>';
      var attributeIdentifier = executionContext.measures[0].definition.measure.item.identifier;
 
      gooddata.md.getUrisFromIdentifiers(projectId, [ attributeIdentifier ]).then(result => {
         // converting the attribute identifier into the attribute URI
         var attributeUri = result[0].uri;
 
         gooddata.md.getObjectDetails(attributeUri).then(attribute => {
            // attribute metadata requested based on the attribute URI
            var attributeDisplayFormUri = attribute.attribute.content.displayForms[0].meta.uri;
            var attributeDisplayFormId = attributeDisplayFormUri.split('/').slice(-1)[0]; // attribute's displayForm identifier
 
            gooddata.md.getValidElements(projectId, attributeDisplayFormId).then(validElements => {
               // elements of the attribute's displayForm
               const items = validElements.validElements.items.map(item => item.element);
               console.log('data retrieved!', items);
               // see the console in your browser dev tools
            });
         });
      });
   }}
/>
```

## Example

```javascript
<Visualization
   projectId="<project-id>"
   identifier="<visualization-identifier>"
   config={<chart-config>}
   onFiredDrillEvent={(data) => { console.log(data.executionContext); }}
   drillableItems={[{ identifier: 'drillable-Identifier1' }, { uri: 'drillable-Uri2' }]}
/>
```
