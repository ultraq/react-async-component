/* eslint-env jest */
import AsyncComponent from './AsyncComponent';

import React   from 'react';
import {mount} from 'enzyme';

/**
 * Tests for the async component.
 */
describe('AsyncComponent tests', function() {

	const SomeComponent = () => (
		<div id="some-component">Hello!</div>
	);

	beforeAll(function() {
		jest.useFakeTimers();
	});
	afterAll(function() {
		jest.useRealTimers();
	});

	test('Eventually loads the configured component', function() {
		const componentPromise = new Promise(resolve => {
			setTimeout(() => {
				resolve(SomeComponent);
			}, 1000);
		});
		const wrapper = mount(
			<AsyncComponent loader={componentPromise}/>
		);
		expect(wrapper.find('#some-component')).toHaveLength(0);
		jest.runAllTimers();
		return componentPromise.then(() => {
			wrapper.update();
			expect(wrapper.find('#some-component')).toHaveLength(1);
		});
	});

	test('Calls configured listener once loaded', function() {
		const componentPromise = Promise.resolve(SomeComponent);
		const onComponentLoaded = jest.fn();
		mount (
			<AsyncComponent loader={componentPromise} onComponentLoaded={onComponentLoaded}/>
		);
		return componentPromise.then(() => {
			expect(onComponentLoaded).toHaveBeenCalled();
		});
	});
});
