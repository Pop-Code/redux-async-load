'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state, _ref) {
    var loadId = _ref.loadId;

    var loading = state.asyncComponent[loadId] && state.asyncComponent[loadId].loading === true || false;
    return { loading: loading };
}, { asyncComponentStatus: _actions2.default })(_Loader2.default);