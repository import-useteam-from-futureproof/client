import Header from './index';
import { screen, within } from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		render(<Header />);
	});
	test('Our strapline is present', () => {
		let strapline = screen.getByLabelText('strapline');
		expect(strapline).toBeInTheDocument();
	});
});
