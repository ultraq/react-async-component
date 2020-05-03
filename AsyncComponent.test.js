/* eslint-env jest */
import AsyncComponent from './AsyncComponent.js';

import {render} from '@testing-library/react';
import React    from 'react';

/**
 * Tests for the async component.
 */
describe('AsyncComponent tests', function() {

	const SomeComponent = () => (
		<div>Hello!</div>
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
		const {getByText, queryByText} = render(
			<AsyncComponent loader={componentPromise}/>
		);
		expect(queryByText('Hello!')).toBe(null);
		jest.runAllTimers();
		await componentPromise;
		expect(getByText('Hello!')).toBeInTheDocument();
	});
});
