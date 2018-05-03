---
title: Get Identifiers From the Platform
sidebar_label: Get Identifiers From the Platform
copyright: (C) 2007-2018 GoodData Corporation
id: gdc_catalog_export
---

`gdc-catalog-export` is a tool for exporting a list of catalog items and date datasets from a GoodData project.

Using this list, you can create AFMs with human-readable object names instead of using URIs or identifiers. For example, use `gdc-catalog-export` when you are working with [DataLayer](data_layer.md).

`gdc-catalog-export` exports only data from a project \(production data\). 

If you [uploaded data to your project from a file](https://help.gooddata.com/display/doc/Add+Data+from+a+File+to+a+Project), the data from the file is added as a separate dataset \(non-production data\), and `gdc-catalog-export` cannot retrieve it. This also includes any measures that were created using the data from that separate dataset.

**Contents**
* [Installing gdc-catalog-export](#installing-gdc-catalog-export)
* [Using gdc-catalog-export](#using-gdc-catalog-export)
* [CatalogHelper utility](#cataloghelper-utility)

## Installing gdc-catalog-export

To install the stable version, run one of the following commands **depending on your package manager**:

**yarn**

```bash
yarn global add gdc-catalog-export
```
**npm**

```bash
$ npm install -g gdc-catalog-export
```

The `gdc-catalog-export` source code is written in JavaScript, compatible with ES7 version. You do not need any bundler such as webpack to build these files. Babel transpiler is enough.

## Using gdc-catalog-export

You can use `gdc-catalog-export`:

* In the interactive mode
* By specifying a config file
* By running it with command line options

The tool respects following hierarchy:

### Interactive mode

This is the default mode. When you run `gdc-catalog-export`, it automatically runs in the interactive mode:

```bash
$ gdc-catalog-export
```

You are prompted to enter input information to export the catalog.

1. Enter your username and password.
2. Choose the project from which you want to export the catalog data.
3. Enter the file name to which you want to export the data \(the default file name is `catalog.json`\).

   If the file already exists, you are asked whether you want to overwrite it.

   If you choose to overwrite the file, the tool overwrites it with new data. If you choose otherwise, you are asked to enter a different name for the file.

After the data is successfully fetched, it is written to the specified file. The path to the file is displayed.

### Configuration file

To avoid manually entering information needed to run `gdc-catalog-export`, you can create a config file \(the default name is `.gdcatalogrc`\) in your project directory.

You do not have to provide all the information in the config file. If any information is missing, the interactive interface will ask you to enter it, or you can provide it as parameters when invoking the tool.

The structure of the `.gdcatalogrc` config file is as follows:

```javascript
{
    "hostname": "https://secure.gooddata.com",
    "username": "john.doe@example.com",
    "password": "secret",
    "projectId": "yourProjectId",
    "output": "outputFile.json"
}
```

* **hostname** is the server from which you want to obtain the data. The default is `https://secure.gooddata.com`.
* **username** is your GoodData login username.
* **password** is your GoodData login password.

**Important!**  We do not recommend that you store the password in the config file. A more secure option is to provide it through the interactive interface or by using the `--password` parameter when running the command.

* **projectId** is the ID of the project from which you want to export the data.
* **output** is the name/path for the output file.

To provide a custom config file, run the tool with the `--config` parameter:

```bash
$ gdc-catalog-export--config/path/to/customConfig
```

### Command line parameters

You can use command line parameters to set up the configuration that you need to obtain data.

```bash
$ gdc-catalog-export--project-id<project-id> --username <your-email> --password <your-password> --output <file-name-path> --hostname<host-url> --config </path/to/customConfig>
```

Any parameter provided as a command line parameter has the highest priority. If you also use a config file to set up a configuration, the config file parameters are overridden and the command line parameters are used.

To see all the available parameters, run the following command:

```bash
$ gdc-catalog-export-h
```

The command returns the list of the available parameters:

```bash
Usage: gdc-catalog-export [options]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    --project-id <id>   Project id for which you want to export the catalog.
    --username <email>  Your username that you use to log in to GoodData platform.
    --password <value>  Your password that you use to log in to GoodData platform.
    --output <value>    Output file (defaults to catalog.json). The output file will be created in current working directory
    --hostname <url>    Instance of GoodData platform. The default is https://secure.gooddata.com
    --config <path>     Custom config file (default .gdcatalogrc)
```

## CatalogHelper utility

To access all the values in `catalog.json` easily, use the `CatalogHelper` utility.

The utility is located in the `@gooddata/react-components` package.

### Using the CatalogHelper utility

```javascript
import { CatalogHelper } from '@gooddata/react-components';
import catalogJson from './catalog.json';

const C = new CatalogHelper(catalogJson);
const revenueId = C.measure('Revenue');
```

### API reference

The following definitions are written in TypeScript.

The method parameters are written in the format: `<parameter_name>: <parameter_type>`

The optional parameters are marked with a question mark.

```javascript
class CatalogHelper {
  // properties for accessing the original structure of supplied JSON file
  measures: {};
  visualizations: {};
  attributes: {};
  dateDataSets: {};

  // supply exported json file as a js object
  constructor(catalog: ICatalog);

  // measure id and measure tag by its name
  measure(name: string): string;
  measureTags(name: string): string;

  // visualization id and tag by its name
  visualization(name: string): string;
  visualizationTags(name: string): string;

  // attribute id and tag by its name
  attribute(attributeName: string): string;
  attributeTags(attributeName: string): string;

  // attribute's display form; When displayFormName not specified, default display form returned
  attributeDisplayForm(attributeName: string, displayFormName?: string): string;
  attributeDisplayFormTags(attributeName: string, displayFormName?: string): string;

  // date data set id and tag by its name
  dateDataSet(dataSetName: string): string;
  dateDataSetTags(dataSetName: string): string;

  // data data set's attribute id and name (both names needed)
  dateDataSetAttribute(dataSetName: string, attrName: string): string;
  dateDataSetAttributeTags(dataSetName: string, attrName: string): string;

  // data data set's attribute's default display form; or specific display form when displayFormName is set
  dateDataSetDisplayForm(dataSetName: string, attributeName: string, displayFormName?: string): string;
  dateDataSetDisplayFormTags(dataSetName: string, attributeName: string, displayFormName?: string): string;
}
```
