# OraDBPM Package JSON Schema

Package defines [JSON Schema](http://www.json-schema.org) for OraDBPM Package JSON
Schema JSON Schema is extended by adding custom formats for `semverVersion` and
`semverVersionRange` and validation function for validation against the schema.

Validation and extension is implemented using [ajv package](https://www.npmjs.com/package/ajv)

Documentation for [OraDBPM Package JSON Schema](doc/oradbpm-package-schema.md)

# Installation

````
$ npm install oradbpm-package-schema
````

# Usage

````JavaScript
var ValidationFunctionFactory = require('oradbpm-package-schema');
var validate = ValidationFunctionFactory();

var valid = validate(data);
console.error(validate.errors);
````

You may pass options for `ajv` to `ValidationFunctionFactory`.
`ajv` options are described [here](https://www.npmjs.com/package/ajv#options)