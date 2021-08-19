import { screen } from '@testing-library/react';
import { default as UpdatePasswordModal } from '.';
import { AuthProvider } from '../../contexts/AuthContext';

const closeModal = jest.fn();

describe('Update password modal', () => {
	beforeEach(() => {
		render(<UpdatePasswordModal isVisible={true} closeModal={closeModal} />);
	});

	it('Renders a warning message', () => {
		const warningMessage = screen.getByLabelText('warning message');
		expect(warningMessage).toBeInTheDocument();
	});
});
