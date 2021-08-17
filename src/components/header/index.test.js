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
	test('image is present', () => {
		let logo = screen.getByLabelText('site logo');
		expect(logo).toBeInTheDocument();
	});
	test('header section is rendered', () => {
		let headerContainer = screen.getByLabelText('header container');
		expect(headerContainer).toBeInTheDocument();
	});
});
