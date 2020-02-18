
import PropTypes          from 'prop-types';
import React, {Component} from 'react';

/**
 * A component for loading other components asynchronously.
 * 
 * @author Emanuel Rabina
 */
export default class AsyncComponent extends Component {

	static propTypes = {
		children: PropTypes.func,
		// Accept promise-shaped objects for the loader
		loader: PropTypes.shape({
			catch: PropTypes.func,
			then: PropTypes.func
		}).isRequired
	};

	static defaultProps = {
		children: (Component, componentProps) => {
			return Component ?
				<Component {...componentProps}/> :
				null;
		}
	};

	/**
	 * Create a new component with props to pass to the future-loaded component.
	 * 
	 * @param {Object} props
	 */
	constructor(props) {

		super(props);
		this.state = {
			Component: null
		};
	}

	/**
	 * Start loading the intended component.
	 */
	componentDidMount() {

		let {loader} = this.props;

		loader.then(Component => {
			this.setState({
				// The `.default` seems to be an ES6 import thing
				Component: Component.default || Component
			});
		});
	}

	/**
	 * Render the intended component once it has been loaded.
	 * 
	 * @return {*}
	 */
	render() {

		let {children, loader, ...componentProps} = this.props;
		let {Component} = this.state;

		return children(Component, componentProps);
	}
}
