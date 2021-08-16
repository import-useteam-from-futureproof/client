import { screen } from '@testing-library/react';
import { default as DeleteAccountModal } from '.';

const closeModal = jest.fn();

describe('Delete account modal', () => {
	beforeEach(() => {
		render(<DeleteAccountModal isVisible={true} closeModal={closeModal} />);
	});

	it('Renders a warning message', () => {
		const warningMessage = screen.getByLabelText('warning message');
		expect(warningMessage).toBeInTheDocument();
	});
});
