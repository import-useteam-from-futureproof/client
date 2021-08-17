import RoomList from '.';
import { screen } from '@testing-library/react';

describe('RoomList component', () => {
	beforeEach(() => {
		render(<RoomList />);
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('Join a Quiz');
	});
});
