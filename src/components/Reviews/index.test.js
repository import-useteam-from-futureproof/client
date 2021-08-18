import Review from './index';
import { screen, within } from '@testing-library/react';

describe('header', () => {
	beforeEach(() => {
		render(<Review />);
	});
	test('heading to be present', () => {
		let heading = screen.getAllByRole('heading');
		expect(heading).toHaveLength(1);
	});
	test('There is one article in the structure', () => {
		let article = screen.getAllByRole('article');
		expect(article).toHaveLength(1);
	});
	test('reviewer says reviewer', () => {
		const review = screen.getByText('Reviewer');
		expect(review).toBeInTheDocument();
	});
	test('reviewer says reviewer', () => {
		const reviewBody = screen.getByLabelText('review-body');
		expect(reviewBody).toBeInTheDocument();
	});
});
