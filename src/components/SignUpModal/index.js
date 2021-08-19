import React, { useState } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const SignUpModal = ({ throwError, closeModal, shown }) => {
	const modalStyle = {
		opacity: shown ? 1 : 0,
		pointerEvents: shown ? 'all' : 'none',
	};

	const { signup, login } = useAuth();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
		username: '',
	});

	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const handleSignUp = async (e) => {
		try {
			e.preventDefault();
			if (formData.password !== formData.passwordConfirm) {
				console.log("passwords don't match");
				handleError({ code: "passwords don't match" });
				return;
			}
			const firebaseResponse = await signup(formData.email, formData.password, formData.username);
			console.log(firebaseResponse);
			const firebaseLoginResponse = await login(formData.email, formData.password);
		} catch (error) {
			handleError(error);
			console.error(error);
			throwError(error.message);
		}
	};

	const handleError = (error) => {
		let displayedError;
		switch (error.code) {
			case 'auth/email-already-in-use':
				displayedError = 'Email is already in use.';
				break;
			case "passwords don't match":
				displayedError = "Passwords don't match.";
				break;
			case 'auth/weak-password':
				displayedError = 'Password should be at least 6 characters';
				break;

			default:
				displayedError = 'Login error. Please try again.';
				break;
		}
		setError(displayedError);
	};

	return (
		<section style={modalStyle} className={styles.registerAccountModal}>
			<form aria-label="sign up" onSubmit={handleSignUp}>
				<label>
					E-mail:
					<input
						onChange={handleInputChange}
						value={formData.email}
						id="email"
						type="email"
						placeholder="email"
					/>
				</label>
				<label>
					Username:
					<input
						onChange={handleInputChange}
						value={formData.username}
						id="username"
						type="text"
						placeholder="username"
					/>
				</label>
				<label>
					Password:
					<input
						onChange={handleInputChange}
						value={formData.password}
						id="password"
						type="password"
						placeholder="password"
					/>
				</label>
				<label>
					Confirm Password:
					<input
						onChange={handleInputChange}
						value={formData.passwordConfirm}
						id="passwordConfirm"
						type="password"
						placeholder="confirm password"
					/>
				</label>
				<input type="submit" />
				<input onClick={closeModal} type="button" value="Cancel" />
				<p className={styles.errorDisplay}>{error}</p>
			</form>
		</section>
	);
};

export default SignUpModal;
