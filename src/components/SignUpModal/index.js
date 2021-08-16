import React from 'react';
import styles from './style.module.css';

const SignUpModal = ({ handleSignUp, closeModal, shown }) => {
	const modalStyle = {
		opacity: shown ? 1 : 0,
		pointerEvents: shown ? 'all' : 'none',
	};

	return (
		<section style={modalStyle} className={styles.registerAccountModal}>
			<form aria-label="sign up" onSubmit={handleSignUp}>
				<label>
					Email:
					<input id="email" type="email" placeholder="email" />
				</label>
				<label>
					Username:
					<input id="username" type="text" placeholder="username" />
				</label>
				<label>
					Password:
					<input id="password" type="password" placeholder="password" />
				</label>
				<label>
					Confirm Password:
					<input id="passwordConfirm" type="password" placeholder="confirm password" />
				</label>
				<input type="submit" />
				<input onClick={closeModal} type="button" value="Cancel" />
			</form>
		</section>
	);
};

export default SignUpModal;
