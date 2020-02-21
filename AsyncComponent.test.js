/* eslint-env jest */
import AsyncComponent from './AsyncComponent.js';

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

	test('Eventually loads the configured component', async function() {
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
		await componentPromise;
		wrapper.update();
		expect(wrapper.find('#some-component')).toHaveLength(1);
	});
});
