import LoginForm from './index';
import { screen, within } from '@testing-library/react';

describe('Login Form', () => {
	beforeEach(() => {
		render(<LoginForm />);
	});
	test('form is present', () => {
		let form = screen.getByLabelText('login form');
		expect(form).toBeInTheDocument();
	});
});
