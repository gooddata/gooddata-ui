---
title: DrillableItems
sidebar_label: DrillableItems
copyright: (C) 2007-2018 GoodData Corporation
id: drillable_item
---

You can enable eventing and drilling in a visualization. Drilling is the process of 'zooming in' on a single measure value by filtering out all other data and breaking that value across a new attribute of interest (see [Drilling into Reports](https://help.gooddata.com/display/doc/Drilling+into+Reports)).

To add drilling, use function predicates.

> Before Version 6.2, you could implement drilling using a list of `drillableItems` that contained the URI or identifier of a measure or attribute (for example, `{ identifier: 'label.owner.department' }`  or `{ uri: '/gdc/md/projectHash/obj/1027' }`). While we do not recommend that you use this method anymore, it is still supported. For more information, see [DrillableItems](https://sdk.gooddata.com/gooddata-ui/docs/6.1.0/drillable_item.html) in the Version 6.1 documentation.

To turn on eventing and drilling, specify at least one drillableItem.

Drillable items can consist of the following entities:
* Measures

    **NOTE:** Drilling is disabled for grand totals and subtotals in pivot tables.

* Attribute displayForms that are defined by their identifier or URI

    *displayForm*, or attribute label, is a different means of representing an attribute. For example, the `Name` attribute might have labels for `Firstname` and `Lastname`. For more information, see [Determine the Attribute Value ID](https://help.gooddata.com/display/doc/Determine+the+Attribute+Value+ID).
* Attribute values defined by their URI

Visualization points that intersect any defined measures, attributes, or attribute values become drillable and will emit events when interacted with.

**NOTE:** Ad-hoc measures (measures created from attribute or measures using [computeRatio option](https://sdk.gooddata.com/gooddata-ui/docs/afm.html#show-a-measure-as-a-percentage) are defined using URI or identifier in AFM. When you want set up drilling for such ad-hoc measures, use same parameter (URI or identifier) as you used in AFM. Keep on mind, that Analytical Designer creates such measures only using URI. When you want to activate drilling on ad-hoc measures created by Analytical Designer, you can use only URIs to activate drill.

## Structure

For the full TypeScript definition, see [this code section](https://github.com/gooddata/gooddata-react-components/blob/master/src/interfaces/HeaderPredicate.ts#L6).

```javascript
drillableItems: [
    (header: IMappingHeader, context: IMappingHeaderContext) => boolean, // Type: IHeaderPredicate
    ...
]
```

`IHeaderPredicate` defines the function that accepts `IMappingHeader` and `context` as its parameters and returns a `boolean` value. This function is executed against every measure and attribute in a visualization. If the function returns `true`, the measure or attribute is drillable. If the function returns `false`, the measure or attribute is not drillable.

You can program any logic to determine whether a particular measure or attribute should be drillable. However, this is not required often.

### Predicate factory helpers

GoodData.UI SDK contains `HeaderPredicateFactory` that helps you easily build predicate functions that cover most of the common drill eventing use cases. You can import this factory directly from the `@gooddata/react-components` npm package.

`HeaderPredicateFactory` provides the following predicate helper builders:

* `uriMatch('<measure-or-attribute-uri>')`

    The helper builds a predicate function that matches any measure or attribute in a visualization to the provided URI.
* `identifierMatch('<measure-or-attribute-identifier>')`
    
    The helper builds a predicate function that matches any measure or attribute in a visualization to the provided identifier.
* `composedFromUri('<measure-or-attribute-uri>')` 

    The helper builds a predicate function that matches any [arithmetic measure](arithmetic_measure.md) in a visualization contaning measures to the provided URI in its tree of measures that the arithmetic measure is built from.
* `composedFromIdentifier('<measure-or-attribute-identifier>')` 

    The helper builds a predicate function that matches any [arithmetic measure](arithmetic_measure.md) in a visualization contaning measures to the provided identifier in its tree of measures that the arithmetic measure is built from.

## Set up drilling

To enable event drilling, extend the `Visualization` component with a `drillableItems` property.

In the `drillableItems` property, add an array of `IHeaderPredicate` functions that identifies the measures and attributes that should become highlighted and drillable.

**Example:** Drilling in a visualization enabled for the measure with either the identifier of `label.owner.department` or the URI of `/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211`

```javascript 1.6
// This is an example of event drilling on the visualization from the GoodSales demo project.
import { HeaderPredicateFactory } from '@gooddata/react-components';

<Visualization
  projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
  identifier="aby3polcaFxy"
  drillableItems={[
    HeaderPredicateFactory.uriMatch('/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211'),  
    HeaderPredicateFactory.identifierMatch('label.owner.department') 
  ]}
/>
```

**Example:** Drilling in a visualization enabled for every [arithmetic measure](arithmetic_measure.md) that has a measure with either the identifier set to `label.owner.department` or the URI set to `/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211` in its tree of measures that the arithmetic measure is built from

```javascript 1.6
// This is an example of event drilling on the visualization from the GoodSales demo project.
import { HeaderPredicateFactory } from '@gooddata/react-components';

<Visualization
  projectId="la84vcyhrq8jwbu4wpipw66q2sqeb923"
  identifier="aby3polcaFxy"
  drillableItems={[
    HeaderPredicateFactory.composedFromUri('/gdc/md/la84vcyhrq8jwbu4wpipw66q2sqeb923/obj/9211'),  
    HeaderPredicateFactory.composedFromIdentifier('label.owner.department')  
  ]}
/>
````

To catch events, add a listener to `document`:

```javascript
document.addEventListener('drill',function(arg) { console.log(arg.detail); });
```

Each event is a JSON consisting of `executionContext` and `drillableContext`. 

## Additional information

For more information, see [Setting up Events for Drilling in Embedded Analytical Designer and KPI Dashboards](https://help.gooddata.com/display/doc/Setting+up+Events+for+Drilling+in+Embedded+Analytical+Designer+and+KPI+Dashboards).
