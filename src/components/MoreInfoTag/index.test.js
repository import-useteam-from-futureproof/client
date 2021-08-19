import MoreInfoTag from './index';
import { screen, within } from '@testing-library/react';

describe('More info tag', () => {
	beforeEach(() => {
		render(<MoreInfoTag />);
	});

	test('our link has a label', () => {
		let logo = screen.getByLabelText('link to view more info');
		expect(logo).toBeInTheDocument();
	});
});
