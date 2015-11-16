'use strict';

var _ = require('lodash');
var common = require('./common');
var shouldBeValid = common.shouldBeValid;
var shouldNotBeValid = common.shouldNotBeValid;

describe('ajv added formats', function () {

  var minimal = {
    name: 'foo',
    version: '1.0.0',
    author: 'Joe Doe <joe.doe@example.com>',
    description: 'some description',
    license: 'MIT',
    language: 'plsql',
    repository: 'joe-doe/foo'
  };

  it('semverVersion should reject invalid semver version', function () {
    shouldNotBeValid(_.extend({}, minimal, {
      version: '1.0.0.0'
    }));
  });

  it('semverVersion should accept valid semver version', function () {
    shouldBeValid(_.extend({}, minimal, {
      version: '1.0.0'
    }));
  });

  it('semverVersionRange should reject invalid semverVersionRange', function () {
    shouldNotBeValid(_.extend({}, minimal, {
      dependencies: {
        some_package : '1.0.0.0'
      }
    }));
  });

  it('semverVersionRange should accept valid semver semverVersionRange', function () {
    shouldBeValid(_.extend({}, minimal, {
      dependencies: {
        some_package1 : '1.0.0',
        some_package2 : '^1.0.0',
        some_package3 : '~1.0.0',
        some_package4 : '1.0',
        some_package5 : '1.x',
        some_package6 : '*'
      }
    }));
  });


});