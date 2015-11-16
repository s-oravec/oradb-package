'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();

var _ = require('lodash');

var ValidationFunctionFactory = require('../lib/oradbpm-package-schema');
var validate = ValidationFunctionFactory();

describe('Schema', function () {

  var valid;
  var minimal = {
    name: 'foo',
    version: '1.0.0',
    author: 'Joe Doe <joe.doe@example.com>',
    description: 'some description',
    license: 'MIT',
    language: 'plsql',
    repository: 'joe-doe/foo'
  };

  it('minimal package definition should be valid OraDBPM Package', function () {
    var pkg = _.extend({}, minimal);
    valid = validate(pkg);
    expect(validate.errors).to.be.eq(null);
    valid.should.be.eq(true);
  });

  it('non schema properties should be rejected', function () {
    var pkg = _.extend({
      someNonSchemaProperty: "tradaa!!!"
    }, minimal);
    valid = validate(pkg);
    expect(validate.errors).to.be.not.eq(null);
    valid.should.be.eq(false);
  });

  describe('name', function () {

    describe('not so obvious rejections only', function () {

      it('name with 1st non-alpha char should be rejected', function () {
        var pkg = _.extend({}, minimal, {
          name: "1somename"
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

      it('name with dash should be rejected', function () {
        var pkg = _.extend({}, minimal, {
          name: "some-name"
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

      it('name with dot should be rejected', function () {
        var pkg = _.extend({}, minimal, {
          name: "some.name"
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

    });

  });

  describe('author', function () {

    it('valid person string definition is valid', function () {
      var pkg = _.extend({}, minimal, {
        author: 'Joe doe <joe.doe@example.com>'
      }, minimal);
      valid = validate(pkg);
      expect(validate.errors).to.be.eq(null);
      valid.should.be.eq(true);
    });

    it('valid person object is valid', function () {
      var pkg = _.extend({}, minimal, {
        author: {
          name: 'joe doe',
          email: 'joe.doe@example.com'
        }
      });
      valid = validate(pkg);
      expect(validate.errors).to.be.eq(null);
      valid.should.be.eq(true);
    });

  });

  describe('dependencies', function () {

    it('dependencies object has to have at least one property', function () {
      var pkg = _.extend({}, minimal, {
        dependencies: {}
      });
      valid = validate(pkg);
      expect(validate.errors).to.be.not.eq(null);
      valid.should.be.eq(false);
    });

    it('all dependency valid formats are valid', function () {
      var pkg = _.extend({}, minimal, {
        dependencies: {
          "package": "1.0.0",
          "package1name": "1.0.0",
          "package_name": "1.0.0",
          "package#name": "1.0.0",
          "package$name": "1.0.0",
          "package2": {
            "version": "1.0.0"
          },
          "package3": {
            "version": "1.0.0",
            "local": true
          }
        }
      });
      valid = validate(pkg);
      expect(validate.errors).to.be.eq(null);
      valid.should.be.eq(true);
    });

    describe('not-so obvious rejections only', function () {

      it('dependency with 1st non-alpha character is invalid', function () {
        var pkg = _.extend({}, minimal, {
          dependencies: {
            "1packagename": "1.0.0"
          }
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

      it('dependency with dash is invalid', function () {
        var pkg = _.extend({}, minimal, {
          dependencies: {
            "package-name": "1.0.0"
          }
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

      it('dependency with dot is invalid', function () {
        var pkg = _.extend({}, minimal, {
          dependencies: {
            "package.name": "1.0.0"
          }
        });
        valid = validate(pkg);
        expect(validate.errors).to.be.not.eq(null);
        valid.should.be.eq(false);
      });

    });

  });

});