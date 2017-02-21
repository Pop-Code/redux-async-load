'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_Component) {
    _inherits(Loader, _Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
    }

    _createClass(Loader, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var _props = this.props,
                loadId = _props.loadId,
                shouldLoad = _props.shouldLoad,
                load = _props.load,
                loading = _props.loading,
                asyncComponentStatus = _props.asyncComponentStatus;

            if (!shouldLoad(this.props) && !loading) {
                asyncComponentStatus(loadId, { loading: true });
                load(this.props).then(function () {
                    return _this2.props.asyncComponentStatus(loadId, { loading: false });
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var shouldReload = props.shouldReload,
                load = props.load;

            if (shouldReload(props, this.props)) {
                load(props);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                render = _props2.render;

            var props = _extends({}, this.props);
            delete props.children;
            delete props.render;
            if (render) {
                return render(props);
            }
            return _react2.default.cloneElement(Array.isArray(children) ? children[0] : _react2.default.Children.only(children), props);
        }
    }]);

    return Loader;
}(_react.Component);

Loader.propTypes = {
    loadId: _react2.default.PropTypes.string.isRequired,
    shouldLoad: _react2.default.PropTypes.func.isRequired,
    load: _react2.default.PropTypes.func.isRequired,
    shouldReload: _react2.default.PropTypes.func.isRequired,
    render: _react2.default.PropTypes.func,
    loading: _react2.default.PropTypes.bool.isRequired,
    asyncComponentStatus: _react2.default.PropTypes.func
};
exports.default = Loader;