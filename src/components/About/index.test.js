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
	test('about section is present', () => {
		let container = screen.getByLabelText('about me section');
		expect(container).toBeInTheDocument();
	});
	test('container is set to display as block', () => {
		let container = screen.getByLabelText('about me section');
		expect(container).toHaveStyle({ display: 'block' });
	});
});
