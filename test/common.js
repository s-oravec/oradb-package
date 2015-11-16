'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();

var ValidationFunctionFactory = require('../lib/oradbpm-package-schema');
var validate = ValidationFunctionFactory();

exports.shouldBeValid = function (data) {
  var valid = validate(data);
  expect(validate.errors).to.be.eq(null);
  valid.should.be.eq(true);
};

exports.shouldNotBeValid = function (data) {
  var valid = validate(data);
  expect(validate.errors).to.be.not.eq(null);
  valid.should.be.eq(false);
};

