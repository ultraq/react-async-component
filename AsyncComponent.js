/* 
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
