import LoginForm from './index';
import { screen, within } from '@testing-library/react';

describe('Sign up modal', () => {
	beforeEach(() => {
		render(<LoginForm />);
	});
	test('form is present', () => {
		let form = screen.getByLabelText('sign up');
		expect(form).toBeInTheDocument();
	});
});
