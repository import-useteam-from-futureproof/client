import { screen } from '@testing-library/react';
import { default as UpdateUsernameModal } from '.';

const closeModal = jest.fn();

describe('Update username modal', () => {
	beforeEach(() => {
		render(<UpdateUsernameModal isVisible={true} closeModal={closeModal} />);
	});

	it('Renders a warning message', () => {
		const warningMessage = screen.getByLabelText('warning message');
		expect(warningMessage).toBeInTheDocument();
	});
});
