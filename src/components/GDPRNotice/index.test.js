import GDPRNotice from './index';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('GDPR Notice', () => {
	beforeEach(() => {
		render(<GDPRNotice />);
	});
	test('a link is present', () => {
		let link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
	});
	test('the div is rendered in the document', () => {
		let div = screen.getByLabelText('gdpr notice');

		expect(div).toBeInTheDocument();
	});
	test('div is removed on click', () => {
		let div = screen.getByLabelText('gdpr notice');
		let dismiss = screen.getByLabelText('dismiss the form');
		userEvent.click(dismiss);
		expect(div).not.toHaveStyle('display: none');
	});
});
