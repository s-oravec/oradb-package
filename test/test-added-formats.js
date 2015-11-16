'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();

var _ = require('lodash');

var ValidationFunctionFactory = require('../lib/oradbpm-package-schema');
var validate = ValidationFunctionFactory();

describe('ajv added formats', function () {

  var valid, pkg;
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
    pkg = _.extend({}, minimal, {
      version: '1.0.0.0'
    });
    valid = validate(pkg);
    expect(validate.errors).to.be.not.eq(null);
    valid.should.be.eq(false);
  });

  it('semverVersion should accept valid semver version', function () {
    pkg = _.extend({}, minimal, {
      version: '1.0.0'
    });
    valid = validate(pkg);
    expect(validate.errors).to.be.eq(null);
    valid.should.be.eq(true);
  });

  it('semverVersionRange should reject invalid semverVersionRange', function () {
    pkg = _.extend({}, minimal, {
      dependencies: {
        some_package : '1.0.0.0'
      }
    });
    valid = validate(pkg);
    expect(validate.errors).to.be.not.eq(null);
    valid.should.be.eq(false);
  });

  it('semverVersionRange should accept valid semver semverVersionRange', function () {
    pkg = _.extend({}, minimal, {
      dependencies: {
        some_package1 : '1.0.0',
        some_package2 : '^1.0.0',
        some_package3 : '~1.0.0',
        some_package4 : '1.0',
        some_package5 : '1.x',
        some_package6 : '*'
      }
    });
    valid = validate(pkg);
    expect(validate.errors).to.be.eq(null);
    valid.should.be.eq(true);
  });


});