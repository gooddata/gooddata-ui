---
id: framework_overview
title: Architecture Overview
sidebar_label: Architecture Overview
copyright: (C) 2007-2018 GoodData Corporation
---

GoodData.UI follows principles of the layered architecture and draws a clean line between the different UI components and
the backend server that calculates the data to render. The UI components integrate with backend server through an interface 
that we call **Analytical Backend**. 

The **Analytical Backend** is designed as a Service Provider Interface (SPI) with clearly described contracts that
you can implement to work even with your own arbitrary backend.
 
GoodData.UI comes with a full implementation of the Analytical Backend SPI for the GoodData platform (codename `bear`). 

For now, the full documentation of the SPI is provided only at the code level. For more information, see the 
`@gooddata/sdk-backend-spi` package.

## Available Packages

GoodData.UI consists of several packages each with its own defined set of responsibilities and exposed APIs. As a 
developer you can pick and choose packages according to requirements of your application.

| Package | Description |
| :--- | :--- |
| @gooddata/api-client-bear | contains the REST API client; formerly known as `gooddata-js` | 
| @gooddata/api-model-bear | contains the type definitions for REST API client; formerly known as `typings` | 
| @gooddata/sdk-backend-bear | contains the analytical backend implementation for GoodData platform | 
| @gooddata/sdk-model | contains the APIs and models used to construct inputs to executions and charts |
| @gooddata/sdk-ui | contains the React infrastructure and headless components such as the Execute component | 
| @gooddata/sdk-ui-charts | contains the components for all charts| 
| @gooddata/sdk-ui-geo | contains the Geo Pushpin chart| 
| @gooddata/sdk-ui-pivot | contains the Pivot Table component| 
| @gooddata/sdk-ui-filters | contains the filtering components| 
| @gooddata/sdk-ui-ext | contains the components for embedding insights created in|  
