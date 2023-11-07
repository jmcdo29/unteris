import { render } from '@testing-library/react';

import UiLocation from './ui-location';

describe('UiLocation', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<UiLocation />);
		expect(baseElement).toBeTruthy();
	});
});
