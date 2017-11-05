'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
	function Logger(componentName) {
		_classCallCheck(this, Logger);

		this._componentName = componentName;
		this._propsChanges = [];
		this._stateChanges = [];

		this._init();
	}

	_createClass(Logger, [{
		key: '_init',
		value: function _init() {
			console.log('%c render', 'color: #848d95;', this._componentName);
		}
	}, {
		key: '_printChange',
		value: function _printChange(change) {
			if ((typeof change === 'undefined' ? 'undefined' : _typeof(change)) === 'object') {
				console.groupCollapsed(change.key + ' %c [' + change.type + ']', 'color: #848d95; font-style: italic;');
				console.log('%c old ', 'background: #ff6347; color: #fff', change.oldValue);
				console.log('%c new ', 'background: #5fba7d; color: #fff', change.nextValue);
				console.groupEnd();
			} else {
				console.log(change);
			}
		}
	}, {
		key: 'printComparisonsResults',
		value: function printComparisonsResults() {
			console.group('%c re-render', 'color: #848d95;', this._componentName);
			this._printComparisonResult('props', this._propsChanges);
			this._printComparisonResult('state', this._stateChanges);
			console.groupEnd();
		}
	}, {
		key: '_printComparisonResult',
		value: function _printComparisonResult(title) {
			var changes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			if (changes.length === 0) {
				return;
			}
			console.group(title);
			changes.forEach(this._printChange);
			console.groupEnd();
		}
	}, {
		key: '_differenceBetweenObjects',
		value: function _differenceBetweenObjects() {
			var oldObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var nextObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (!nextObj || !oldObj) {
				return [];
			}
			var difference = [];
			Object.keys(nextObj).forEach(function (key) {
				if (nextObj[key] !== oldObj[key]) {
					var type = _typeof(nextObj[key]);
					difference.push({
						key: key,
						type: type,
						oldValue: oldObj[key],
						nextValue: nextObj[key]
					});
				}
			});
			return difference;
		}
	}, {
		key: 'shallowCompareProps',
		value: function shallowCompareProps(prevProps, nextProps) {
			this._propsChanges = this._differenceBetweenObjects(prevProps, nextProps);
		}
	}, {
		key: 'shallowCompareState',
		value: function shallowCompareState(prevState, nextState) {
			this._stateChanges = this._differenceBetweenObjects(prevState, nextState);
		}
	}]);

	return Logger;
}();

var wrap = function wrap(extendedComponent, forcedDisplayedName) {
	var extendedComponentName = extendedComponent.displayName;

	return function (_extendedComponent) {
		_inherits(Wrapper, _extendedComponent);

		function Wrapper(props) {
			_classCallCheck(this, Wrapper);

			return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));
		}

		_createClass(Wrapper, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.logger = new Logger(forcedDisplayedName || extendedComponentName);
				return _get(Wrapper.prototype.__proto__ || Object.getPrototypeOf(Wrapper.prototype), 'componentDidMount', this).call(this);
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps, nextState) {
				this.logger.printComparisonsResults();
				if (_get(Wrapper.prototype.__proto__ || Object.getPrototypeOf(Wrapper.prototype), 'componentWillUpdate', this)) {
					_get(Wrapper.prototype.__proto__ || Object.getPrototypeOf(Wrapper.prototype), 'componentWillUpdate', this).call(this, nextProps, nextState);
				}
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				this.logger.shallowCompareState(this.state, nextState);
				this.logger.shallowCompareProps(this.props, nextProps);

				return _get(Wrapper.prototype.__proto__ || Object.getPrototypeOf(Wrapper.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState);
			}
		}]);

		return Wrapper;
	}(extendedComponent);
};

module.exports = function () {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	if (args.length > 2) {
		console.error('clear-render: Too many arguments');
		return null;
	}

	if (args.length === 0) {
		console.error('clear-render: extended React сomponent is requied');
		return null;
	}

	var extendedComponent = null;
	var forcedDisplayedName = null;

	args.forEach(function (arg) {
		var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

		switch (type) {
			case 'symbol':
			case 'string':
				{
					forcedDisplayedName = arg;
				}break;
			default:
				{
					extendedComponent = arg;
				}break;
		}
	});

	if (!extendedComponent) {
		console.error('clear-render: extended React сomponent is requied');
		return null;
	}

	return wrap(extendedComponent, forcedDisplayedName);
};
