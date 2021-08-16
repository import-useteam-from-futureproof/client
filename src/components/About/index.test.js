import About from './index';
import { screen, within } from '@testing-library/react';

describe('About me section', () => {
	beforeEach(() => {
		render(<About />);
	});
	test('headers are present', () => {
		let headings = screen.queryAllByRole('heading');
		expect(headings).toHaveLength(2);
	});
});
