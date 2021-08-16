import React from 'react';
import styles from './style.module.css';

const SignUpModal = ({ handleSignUp, closeModal, shown }) => {
	const modalStyle = {
		opacity: shown ? 1 : 0,
		pointerEvents: shown ? 'all' : 'none',
	};

	return (
		<section style={modalStyle} className={styles.registerAccountModal}>
			<button onClick={closeModal}>Close</button>
			<form aria-label="sign up" onSubmit={handleSignUp}>
				<label>
					Email:
					<input type="email" placeholder="email" />
				</label>
				<label>
					Username:
					<input type="email" placeholder="username" />
				</label>
				<label>
					Password:
					<input type="password" placeholder="password" />
				</label>
				<label>
					Confirm Password:
					<input type="password" placeholder="confirm password" />
				</label>
				<input type="submit" />
			</form>
		</section>
	);
};

export default SignUpModal;
