import Leaderboard from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Profile Page', () => {
	beforeEach(() => {
		render(<Leaderboard />, { wrapper: MemoryRouter });
	});

	it('Renders a list heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('High Scores');
	});

	it('Renders the list of high scores', () => {
		let list = screen.getByRole('list', { name: 'leaderboard' });
		expect(list).toBeInTheDocument();
	});

	it('Renders a navigation menu', () => {
		let nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});
});
