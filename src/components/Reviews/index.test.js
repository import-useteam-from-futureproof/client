import Review from './index';
import { screen, within } from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		render(<Review />);
	});
	test('articles', () => {
		let articles = screen.getAllByRole('article');
		expect(articles).toHaveLength(2);
	});

	test('reviewer says reviewer', () => {
		const review = screen.getAllByText('Reviewer');
		expect(review).toHaveLength(2);
	});
	test('We have two review Bodies', () => {
		const reviewBody = screen.getAllByLabelText('review body');
		expect(reviewBody).toHaveLength(2);
	});
});
