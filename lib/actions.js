'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = undefined;

var _reduxActions = require('redux-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Type = exports.Type = '@@redux-async-load/STATUS';
exports.default = (0, _reduxActions.createAction)(Type, function (key, value) {
  return _defineProperty({}, key, value);
});