'use strict';

var ajv = require('ajv');
var semver = require('semver');
var oradbpmPackageSchema = require('./oradbpm-package-schema.json');

var ValidationFunctionFactory = function (options) {
  // configure ajv
  var ajvInstance = ajv(options || {allErrors: true, verbose: true});

  // add custom formats for semver versions
  // semverVersion
  ajvInstance.addFormat('semverVersion', function (data) {
    return semver.valid(data, true) !== null;
  });
  // semverVersion
  ajvInstance.addFormat('semverVersionRange', function (data) {
    return semver.validRange(data, true) !== null;
  });

  // compile
  return ajvInstance.compile(oradbpmPackageSchema);
};

module.exports = ValidationFunctionFactory;
