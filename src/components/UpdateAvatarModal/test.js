import { screen } from '@testing-library/react';
import { default as UpdateAvatarModal } from '.';
import React from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const closeModal = jest.fn();
// useAuth.mockResolvedValue({ data: stubStories });

describe('Update avatar modal', () => {
	beforeEach(() => {
		render(
			<AuthProvider>
				<UpdateAvatarModal isVisible={true} closeModal={closeModal} />
			</AuthProvider>
		);
	});

	it('Renders a warning message', async () => {
		jest.spyOn(useAuth(), 'currentUser').mockResolvedValue({ uid: '20', displayName: 'testing' });
		const warningMessage = screen.getByLabelText('pick avatar');
		expect(warningMessage).toBeInTheDocument();
	});
});
