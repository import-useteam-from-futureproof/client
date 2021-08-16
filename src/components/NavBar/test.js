import NavBar from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Profile Page', () => {
	beforeEach(() => {
		render(<NavBar />, { wrapper: MemoryRouter });
	});

	it('Renders a list of navgation links', () => {
		let links = screen.getAllByRole('link');
		expect(links.length).toBe(3);
		expect(links[0].textContent).toBe('Dashboard');
		expect(links[1].textContent).toBe('Leaderboard');
		expect(links[2].textContent).toBe('Profile');
	});

	it('Renders a logout button', () => {
		let button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe('Logout');
	});
});
