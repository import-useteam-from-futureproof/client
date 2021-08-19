import { screen } from '@testing-library/react';
import { default as UpdateAvatarModal } from '.';

const closeModal = jest.fn();

describe('Update avatar modal', () => {
	beforeEach(() => {
		render(<UpdateAvatarModal isVisible={true} closeModal={closeModal} />);
	});

	it('Renders a warning message', () => {
		const warningMessage = screen.getByLabelText('warning message');
		expect(warningMessage).toBeInTheDocument();
	});
});
