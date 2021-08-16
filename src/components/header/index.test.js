import LoginForm from './index';
import { screen, within } from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		render(<LoginForm />);
	});
	test('header is present', () => {
		let strapline = screen.getByLabelText('strapline');
		expect(strapline).toBeInTheDocument();
	});
});
