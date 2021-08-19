import Chatroom from './index';
import { screen, within } from '@testing-library/react';

import { auth } from '../../firebase';

describe('Chatroom', () => {
	beforeEach(() => {
		render(<Chatroom />);
	});
	test('a list is returned', () => {
		let section = screen.getByLabelText('chat room');
		expect(section).toBeInTheDocument();
	});
});
