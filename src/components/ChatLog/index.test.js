import ChatLog from './index';
import { screen, within } from '@testing-library/react';

describe('About me section', () => {
	beforeEach(() => {
		render(<ChatLog chatHistory={[{ username: 'test', message: 'message' }]} />);
	});
	test('a list is returned', () => {
		let list = screen.queryByLabelText('list');
		expect(list).toBeInTheDocument();
	});
});
