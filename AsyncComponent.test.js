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
