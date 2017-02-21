'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isReady = exports.reducer = exports.actions = exports.ReduxLoader = exports.Loader = undefined;

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isReady = function isReady(_ref) {
    var asyncComponent = _ref.asyncComponent;

    var comps = Object.keys(asyncComponent).filter(function (k) {
        return asyncComponent[k].loading;
    });
    if (!comps.length) {
        return true;
    }
};

exports.Loader = _Loader2.default;
exports.ReduxLoader = _Container2.default;
exports.actions = _actions2.default;
exports.reducer = _reducer2.default;
exports.isReady = isReady;