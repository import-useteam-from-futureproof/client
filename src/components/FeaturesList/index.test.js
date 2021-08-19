import FeaturesList from './index';
import { screen, within } from '@testing-library/react';

describe('features list', () => {
	beforeEach(() => {
		render(<FeaturesList />);
	});
	test('a section is returned', () => {
		let section = screen.getByLabelText('features section');
		expect(section).toBeInTheDocument();
	});

	test('three articles are returned', () => {
		const articles = screen.queryAllByRole('article');
		expect(articles).toHaveLength(3);
	});
	test('We have Headings in the return', () => {
		const headings = screen.queryAllByRole('heading');
		expect(headings).toBeTruthy();
	});
	test('three headings present', () => {
		const headings = screen.queryAllByRole('heading');
		expect(headings).toHaveLength(3);
	});
});
