import React, { useState } from 'react';
import styles from './style.module.css';

import { Header, LoginForm, SignUpModal, ErrorModal } from '../../components';

const SignUpLogin = () => {
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const closeModal = () => {
		setShowSignupModal(false);
	};

	const showModal = () => {
		setShowSignupModal(true);
	};

	return (
		<section className={styles.loginContainer}>
			<Header />
			<LoginForm />
			<button className={styles.signUpButton} onClick={showModal}>
				Sign Up
			</button>
			<SignUpModal closeModal={closeModal} shown={showSignupModal} />
		</section>
	);
};

export default SignUpLogin;
