import LobbyWaitingRoom from './index';
import { screen, within } from '@testing-library/react';

describe('Lobby Waiting room', () => {
	beforeEach(() => {
		render(<LobbyWaitingRoom />);
	});

	test('image is present', () => {
		let logo = screen.getByLabelText('site logo');
		expect(logo).toBeInTheDocument();
	});
});
