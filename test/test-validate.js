'use strict';

var _ = require('lodash');
var common = require('./common');
var shouldBeValid = common.shouldBeValid;
var shouldNotBeValid = common.shouldNotBeValid;

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
    shouldBeValid(_.extend({}, minimal));
  });

  it('non schema properties should be rejected', function () {
    shouldNotBeValid(_.extend({}, minimal, {
      someNonSchemaProperty: 'tradaa!!!'
    }));
  });

  describe('name', function () {

    it('is required', function () {
      var pkg = _.extend({}, minimal);
      delete pkg.name;
      shouldNotBeValid(pkg);
    });

    describe('not so obvious rejections', function () {

      it('should be lowercase', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          name: 'SomeName'
        }));
      });

      it('should not begin with non-alpha char', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          name: '1somename'
        }));
      });

      it('should not contain dash', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          name: 'some-name'
        }));
      });

      it('should not contain dot', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          name: 'some.name'
        }));
      });

    });

  });

  describe('version', function () {

    it('is required', function () {
      var pkg = _.extend({}, minimal);
      delete pkg.version;
      shouldNotBeValid(pkg);
    })

  });

  describe('language', function () {

    it('is required', function () {
      var pkg = _.extend({}, minimal);
      delete pkg.language;
      shouldNotBeValid(pkg);
    });

    it('should be from enum', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        language: 'someNonEnumValue'
      }));
    });

    it('should be valid when from enum', function () {
      shouldBeValid(_.extend({}, minimal, {
        language: 'sql'
      }));
      shouldBeValid(_.extend({}, minimal, {
        language: 'sqlplus'
      }));
      shouldBeValid(_.extend({}, minimal, {
        language: 'plsql'
      }));
    });

  });

  describe('description', function () {

    it('is required', function () {
      var pkg = _.extend({}, minimal);
      delete pkg.description;
      shouldNotBeValid(pkg);
    });

  });

  describe('license', function () {

    it('is required', function () {
      var pkg = _.extend({}, minimal);
      delete pkg.license;
      shouldNotBeValid(pkg);
    });

  });

  describe('author', function () {

    it('valid person string definition is valid', function () {
      shouldBeValid(_.extend({}, minimal, {
        author: 'joe doe <joe.doe@example.com>'
      }, minimal));
    });

    it('valid person object is valid', function () {
      shouldBeValid(_.extend({}, minimal, {
        author: {
          name: 'joe doe',
          email: 'joe.doe@example.com'
        }
      }));
    });

    it('person object name is required', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        author: {
          email: 'joe.doe@example.com'
        }
      }));
    });

    it('person object email is required', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        author: {
          name: 'joe doe'
        }
      }));
    });

    it('person object email has to be valid email', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        author: {
          name: 'joe doe',
          email: 'joe.doe'
        }
      }));
    });

    it('additional properties are not allowed in person object', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        author: {
          name: 'joe doe',
          email: 'joe.doe@example.com',
          additionalProperty: 'someValue'
        }
      }));
    });

  });

  describe('keywords', function () {

    it('empty keywords array should reject', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        keywords: []
      }));
    });

  });

  describe('repository', function () {

  });

  describe('bugs', function () {

  });

  describe('homepage', function () {

  });

  describe('dependencies', function () {

    it('dependencies object has to have at least one property', function () {
      shouldNotBeValid(_.extend({}, minimal, {
        dependencies: {}
      }));
    });

    it('all valid package name formats are valid as dependency properties', function () {
      shouldBeValid(_.extend({}, minimal, {
        dependencies: {
          'package': '1.0.0',
          'package1name': '1.0.0',
          'package_name': '1.0.0',
          'package#name': '1.0.0',
          'package$name': '1.0.0',
          'package2': {
            'version': '1.0.0'
          },
          'package3': {
            'version': '1.0.0',
            'local': true
          }
        }
      }));
    });

    describe('not so obvious rejections', function () {

      it('dependency with 1st non-alpha character is invalid', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          dependencies: {
            '1packagename': '1.0.0'
          }
        }));
      });

      it('dependency with dash is invalid', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          dependencies: {
            'package-name': '1.0.0'
          }
        }));
      });

      it('dependency with dot is invalid', function () {
        shouldNotBeValid(_.extend({}, minimal, {
          dependencies: {
            'package.name': '1.0.0'
          }
        }));
      });

    });

  });

});