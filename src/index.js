const Logger = class Logger {
	constructor(componentName) {
		this._componentName = componentName;
		this._propsChanges = [];
		this._stateChanges = [];

		this._init();
	}
	_init() {
		console.log('%c render', 'color: #848d95;', this._componentName);
	}
	_printChange(change) {
		if (typeof change === 'object') {
			console.groupCollapsed(`${change.key} %c [${change.type}]`, 'color: #848d95; font-style: italic;');
			console.log('%c old ', 'background: #ff6347; color: #fff', change.oldValue);
			console.log('%c new ', 'background: #5fba7d; color: #fff', change.nextValue);
			console.groupEnd();
		} else {
			console.log(change);
		}
	}
	printComparisonsResults(){
		console.group('%c re-render', 'color: #848d95;', this._componentName);
		this._printComparisonResult('props', this._propsChanges);
		this._printComparisonResult('state', this._stateChanges);
		console.groupEnd();
	}
	_printComparisonResult(title, changes = []) {
		if (changes.length === 0) {
			return;
		}
		console.group(title);
		changes.forEach(this._printChange);
		console.groupEnd();
	}
	_differenceBetweenObjects(oldObj = {}, nextObj = {}) {
		if (!nextObj || !oldObj) {
			return [];
		}
		let difference = [];
		Object.keys(nextObj).forEach(key => {
			if (nextObj[key] !== oldObj[key]) {
				const type = typeof nextObj[key];
				difference.push({
					key,
					type,
					oldValue: oldObj[key],
					nextValue: nextObj[key],
				});
			}
		});
		return difference;
	}
	shallowCompareProps(prevProps, nextProps) {
		this._propsChanges = this._differenceBetweenObjects(prevProps, nextProps);
	}
	shallowCompareState(prevState, nextState) {
		this._stateChanges = this._differenceBetweenObjects(prevState, nextState);
	}

};

const wrap = (extendedComponent, forcedDisplayedName) => {
	const extendedComponentName = extendedComponent.displayName;

	return class Wrapper extends extendedComponent {
		constructor(props) {
			super(props);

		}
		componentDidMount() {
			this.logger = new Logger(forcedDisplayedName || extendedComponentName);
			return super.componentDidMount();
		}

		componentWillUpdate(nextProps, nextState) {
			this.logger.printComparisonsResults();
			if (super.componentWillUpdate) {
				super.componentWillUpdate(nextProps, nextState);
			}
		}

		shouldComponentUpdate(nextProps, nextState) {
			this.logger.shallowCompareState(this.state, nextState);
			this.logger.shallowCompareProps(this.props, nextProps);

			return super.shouldComponentUpdate(nextProps, nextState);
		}
	};
};

module.exports = function (...args) {
	if (args.length > 2) {
		console.error('clear-render: Too many arguments');
		return null;
	}

	if (args.length === 0) {
		console.error('clear-render: extended React сomponent is requied');
		return null;
	}

	let extendedComponent = null;
	let forcedDisplayedName = null;

	args.forEach(arg => {
		const type = typeof arg;

		switch (type) {
			case 'symbol':
			case 'string': {
				forcedDisplayedName = arg;
			} break;
			default: {
				extendedComponent = arg;
			} break;
		}
	});

	if (!extendedComponent) {
		console.error('clear-render: extended React сomponent is requied');
		return null;
	}

	return wrap(extendedComponent, forcedDisplayedName);
};
