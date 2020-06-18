---
title: Export catalog 
sidebar_label: Export catalog 
copyright: (C) 2007-2018 GoodData Corporation
id: gdc_catalog_export
---

GoodData.UI visual components render data stored in your GoodData platform projects. Your application specifies what 
data to render by referencing the Logical Data Model (LDM) Objects - attributes, display forms, facts and measures. 

To simplify this task, GoodData.UI offers the `@gooddata/catalog-export` tool. The `@gooddata/catalog-export` exports a 
list of catalog items and date datasets from a GoodData project into JavaScript or TypeScript code. The generated code 
contains exported constant-per-LDM-object.

Using this generated code, you can create charts and execution definitions in a very efficient and natural way.

## Installing @gooddata/catalog-export

We recommend including the `catalog-export` as a devDependency of your application and define an NPM script `refresh-ldm` to
run the program.

To install the stable version, run one of the following commands **depending on your package manager**:

**yarn**

```bash
yarn add @gooddata/catalog-export --dev
```
**npm**

```bash
$ npm install @gooddata/catalog-export --save-dev
```

## Using @gooddata/catalog-export

`catalog-export` is a command-line program that loads metadata from a workspace and transforms it into TypeScript, JavaScript, or a JSON representation. The program can run in interactive, silent, or hybrid modes.

**NOTE**: The JSON representation is deprecated. We will remove it in next major version.

This is how it works:

1.  The program searches the current directory for the `.gdcatalogrc` config file. If found, the program reads input parameters from this file. 

    The configuration file must be in the JSON format. It can contain any or all parameters that you would normally provide on the command line:

    ```json
    {
     "hostname": "your.gooddata.hostname.com",
     "projectId": "your_gooddata_workspaceid",
     "username": "email",
     "password": "password",
     "output": "desired_file_name.ts|js|json"
    }
    ```

    NOTE: TypeScript, JavaScript or JSON output files are generated based on the filename extension specified in the output parameter.

2.  The program reads input parameters from the command line. To learn more about the available parameters, run the following command:
    
    `npx catalog-export --help`

    Parameters provided via the command line take precedence over the corresponding parameters in the config file. 

3.  If all required parameters are entered, the program runs and exports the metadata from the workspace. If any parameter is missing, the program will prompt you to enter it.

    **IMPORTANT!** _The program does not accept passwords via the command line. You can either put the password into .gdcatalogrc or enter it interactively. Do NOT save .gdcatalogrc in a version control system._


### Subsequent catalog exports

#### TypeScript and JavaScript representations

The catalog export will overwrite the generated files. If you need to modify the generated constants or add new LDM objects, do so through a layer of indirection: in a different file adjacent to the generated code.

#### JSON Representation

A catalog export maintains keys used in an existing catalog export JSON file. You can rename keys inside the following properties:

* visualizations
* measures
* attributes
* dateDataSets
* displayForms

At the next run, `gdc-catalog-export` tries to resolve the new items from the server against the existing items, and do the following:

* Preserve the existing keys by matching their identifier attributes
* Remove the keys that do not exist on the server
* Add the new keys from the server equal to their title property

In addition, the existing catalog file is renamed to `catalogue.json.bak`, and the last backup gets rewritten.

### Recommendations

-  Include the `@gooddata/catalog-export` as a devDependency of your application and define an NPM script `refresh-ldm` to run the program.
-  Do not import the constants directly. Instead, wrap the constants into a namespace as follows:

    ```javascript
    import * as Ldm from "./ldm/generatedFile";
    export { Ldm };
    ```

-  Never modify the generated files.
-  If you need to modify the generated constants or add new LDM objects, do so through a layer of indirection: in a different file adjacent to the generated code. For examples, look at our reference-workspace LDM and package.

### Limitations

`@gooddata/catalog-export` exports only data from a project \(production data\). 

If you [uploaded data to your project from a file](https://help.gooddata.com/display/doc/Add+Data+from+a+File+to+a+Project), the data from the file is added as a separate dataset \(non-production data\), and `@gooddata/catalog-export` cannot retrieve it. This also includes any measures that were created using the data from that separate dataset.

### Example 

Attributes with multiple display forms (labels) are generated into a constant such as this:

```javascript
export const City = {
    /**
     * Display Form Title: city
     * Display Form ID: label.uscities.city
     */
    Default: newAttribute("label.uscities.city"),
    /**
     * Display Form Title: location
     * Display Form ID: label.uscities.city.location
     */ Location: newAttribute("label.uscities.city.location"),
};
```

Attributes with a single display form (label) are generated into a constant such as this:

```javascript
/**
 * Attribute Title: Location Resort
 * Display Form ID: attr.restaurantlocation.locationresort
 */
export const LocationResort = newAttribute("label.restaurantlocation.locationresort");
```

MAQL metrics are generated into a constant such as this:

```javascript
/**
 * Metric Title: $ Total Sales
 * Metric ID: aa7ulGyKhIE5
 * Metric Type: MAQL Metric
 */
export const $TotalSales = newMeasure("aa7ulGyKhIE5");
/**
 * Metric Title: $ Franchise Fees
 * Metric ID: aaEGaXAEgB7U
 * Metric Type: MAQL Metric
 */
export const $FranchiseFees = newMeasure("aaEGaXAEgB7U");
/**
 * Metric Title: $ Franchise Fees (Ad Royalty)
 * Metric ID: aabHeqImaK0d
 * Metric Type: MAQL Metric
 */
export const $FranchiseFeesAdRoyalty = newMeasure("aabHeqImaK0d");
/**
 * Metric Title: $ Franchise Fees (Ongoing Royalty)
 * Metric ID: aaWGcgnsfxIg
 * Metric Type: MAQL Metric
 */
export const $FranchiseFeesOngoingRoyalty = newMeasure("aaWGcgnsfxIg");
```

For facts, catalog-export generates an object with keys for each supported aggregation:

```javascript
/**
 * Fact Title: Cost
 * Fact ID: fact.restaurantcostsfact.cost
 */
export const Cost = {
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: sum
     */
    Sum: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("sum")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: count
     */ Count: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("count")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: avg
     */ Avg: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("avg")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: min
     */ Min: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("min")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: max
     */ Max: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("max")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: median
     */ Median: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("median")),
    /**
     * Fact Title: Cost
     * Fact ID: fact.restaurantcostsfact.cost
     * Fact Aggregation: runsum
     */ Runsum: newMeasure("fact.restaurantcostsfact.cost", (m) => m.aggregation("runsum")),
};
```

For date datasets, catalog-export includes one constant per attribute. The date dimension name is the prefix of the constant name. Attributes with multiple display forms are generated as follows:

```javascript
export const TimelineMonth = {
    /**
     * Display Form Title: Short (Jan) (Timeline)
     * Display Form ID: timeline.abm81lMifn6q
     */
    Short: newAttribute("timeline.abm81lMifn6q"),
    /**
     * Display Form Title: Long (January) (Timeline)
     * Display Form ID: timeline.abs81lMifn6q
     */ Long: newAttribute("timeline.abs81lMifn6q"),
    /**
     * Display Form Title: Number (M1) (Timeline)
     * Display Form ID: timeline.abq81lMifn6q
     */ Number: newAttribute("timeline.abq81lMifn6q"),
    /**
     * Display Form Title: M/Q (M1/Q1) (Timeline)
     * Display Form ID: timeline.abo81lMifn6q
     */ MQ: newAttribute("timeline.abo81lMifn6q"),
};
```

Date dataset attributes that do not have multiple display forms are generated as follows:

```javascript
export const TimelineQuarterYear = newAttribute("timeline.aci81lMifn6q");
```
