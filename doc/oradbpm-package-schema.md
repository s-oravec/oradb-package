# JSON Schema for OraDBPM Package

Schema based on [JSON Schmea draft 04](http://json-schema.org/draft-04/schema#)

## Used notation

* **\* required**

## Formats

Custom formats, as implemented in `ajv` - [Another JSON Schema Validator](https://www.npmjs.com/package/ajv)

### semverVersion

Version as described by the `v2.0.0` specification found at [http://semver.org/](http://semver.org/).

`ajv` `semverVersion` format:

```javascript
var semver = require('semver');
var ajvInstance = require('ajv')();

ajvInstance.addFormat('semverVersion', function (data) {
    return semver.valid(data, true) !== null;
});
```

### semverVersionRange

Valid semver range as describeed by [node-semver](https://github.com/npm/node-semver#ranges)

`ajv` `semverVersionVersion` format:

```javascript
var semver = require('semver');
var ajvInstance = require('ajv')();

ajvInstance.addFormat('semverVersionRange', function (data) {
    return semver.validRange(data, true) !== null;
});
```

## Definitions

### SemverVersion

Valid semver version

* type: `string`
* format: `semverVersion`

```json
{
  "type": "string",
  "format" : "semverVersion",
  "description": "valid semver version (https://github.com/npm/node-semver)"
}
```

### SemverVersionRange

Valid semver version range

* type: `string`
* format: `semverVersion`

```json
{
  "type": "string",
  "format" : "semverVersionRange",
  "description": "valid semver versionRange (https://github.com/npm/node-semver)"
}
```

### DependencyObject

Package dependency as object.

* type: `object`

#### Properties

* **\* version** : type:`semverVersionRange` - version range
* local : type:`boolean` - dependency should be deployed as local (within schema of parent package)

Additional properties are not allowed.

```json
{
  "type": "object",
  "properties": {
    "version": {
      "$ref": "#/definitions/semverVersionRange",
      "description": "package semver versionRange declaration"
    },
    "local": {
      "type": "boolean",
      "description": "dependency should be deployed as local"
    }
  },
  "required": [
    "version"
  ],
  "description": "package dependency as dependency object",
  "additionalProperties": false
}
```

example:

```json
{
  "package_name": {
    "version": "^1.0.0"
  }
}
```

```json
{
  "package_name": {
    "version": "^1.0.0",
    "local": true
  }
}
```

### Dependency

Package dependency - name of package and it's `versionRange` that package depends on. Optionally specify deployment of dependency using `local` property.

**one of**

#### package dependency as semver versionRange declaration literal

```json
{
  "$ref": "#/definitions/semverVersionRange",
  "description": "package dependency as semver versionRange declaration"
}
```

#### package dependency object

```json
{
  "$ref": "#/definitions/DependencyObject",
  "description": "package dependency object"
}
```

### Dependencies

Collection of package names (properties) and their dependency declarations.

* type: `object`

**properties**

* at least 1 property
* property name pattern: `^[a-z][\$#a-z0-9_]*$` type:`dependency`

Additional properties are not allowed.

```json
{
  "patternProperties": {
    "^[a-z][\\$#a-z0-9_]*$": {
      "$ref": "#/definitions/dependency"
    }
  },
  "minProperties": 1,
  "additionalProperties": false,
  "description": "collection of packages and their versionRange declarations"
}
```

example:

```json
{
  "dependencies" : {
    "package_name1" : "^1.0.0",
    "package_name2" : "^2.0.0"
  }
}
```

### PersonLiteral

Person literal.

* type: `string`
* pattern: `^.+\\<.+@.+\\..+\\>$`

```json
{
  "type": "string",
  "pattern": ".+\\<.+@.+\\..+\\>",
  "description": "person defined as name <email>"
}
```

example:

```json
{
  "author": "Joe Doe <joe.doe@email.com>"
}
```

### PersonObject

Person object.

* type: `object`

#### Properties

* **\* name**: type:`string` - person's name
* **\* email**: format:`email` - person's email

Additional properties are not allowed.

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "person's name"
    },
    "email": {
      "format": "email",
      "description": "person's email"
    }
  },
  "required": [
    "name",
    "email"
  ],
  "description": "person defined as person object",
  "additionalProperties": false
}
```

example:

```json
{
  "author": {
    "name": "Joe Doe",
    "email": "joe.doe@example.com"
  }
}
```

### Person

Person definition.

**one of**

#### person literal

```json
{
  "$ref": "#/definitions/PersonLiteral",
  "description": "person defined as name <email>"
}
```

#### person object

```json
{
  "$ref": "#/definitions/PersonObject",
  "description": "person defined as person object"
}
```

## Properties

Additional properties are not allowed.

### \* name

Package name. Must be valid Oracle schema name.

* type: `string`
* pattern: `^[a-z][\\$#a-z0-9_]*$`

```json
{
  "type": "string",
  "pattern" : "^[a-z][\\$#a-z0-9_]*$",
  "description": "package name"
}
```

### \* version

Package version - must be valid semver version.

* type: `semverVersion`

```json
{
  "$ref": "#/definitions/semverVersion",
  "description": "package version - must be valid semver version"
}
```

### \* language

Language in which is package implemented.

* enum: \[sql, plsql, sqlplus\]

```json
{
  "enum": [
    "sql",
    "plsql",
    "sqlplus"
  ],
  "description": "language in which is package implemented"
}
```

### \* description

Package description.

* type: `string`

```json
{
  "type": "string",
  "description": "package description"
}
```

### \* license

Package license.

```json
{
  "type": "string",
  "description": "package license"
}
```

### author

Package author.

* type: `person`

```json
{
  "$ref": "#/definitions/person",
  "description": "package author"
}
```

### keywords

List of keywords.

* items: type:`string`
* at least 1 item
* items must be unique

Additional items are not allowed.

```json
{
  "type": "array",
  "items": {
    "type": "string",
    "description": "keyword"
  },
  "aditionalItems": "false",
  "minItems": 1,
  "description": "list of keywords",
  "uniqueItems": true
}
```

### repository

Package git repository URI.

* type: `string`
* format: `uri`

```json
{
  "type": "string",
  "format": "uri",
  "description": "package git repository uri"
}
```

### bugs

Package bug & issue tracking page.

* type: `string`
* format: `uri`

```json
{
  "type": "string",
  "format": "uri",
  "description": "package bug & issue tracking page"
}
```

### homepage

Package homepage.

* type: `object`
* format: `uri`

```json
{
  "type": "string",
  "format": "uri",
  "description": "package homepage"
}
```

### dependencies 

Collection of package dependencies.

* type: `dependencies`

```json
{
  "$ref": "#/definitions/dependencies",
  "description": "collection of runtime package dependencies declarations"
}
```
