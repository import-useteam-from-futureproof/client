import React, { useState } from 'react';

// Components //
import { Header, LoginForm, SignUpModal, About } from '../../components';

const LandingPage = () => {
	const [showSignupModal, setShowSignupModal] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();

		const userDetails = {
			username: e.target.loginUsername.value,
			password: e.target.loginPassword.value,
		};

		console.log(userDetails);
		return;
	};

	const closeModal = () => {
		setShowSignupModal(false);
	};

	const showModal = () => {
		setShowSignupModal(true);
	};

	const handleSignUp = (e) => {
		e.preventDefault();

		if (e.target.password.value !== e.target.passwordConfirm.value) {
			console.log("passwords don't match");
			return;
		}

		const userDetails = {
			email: e.target.email.value,
			username: e.target.username.value,
			password: e.target.password.value,
		};
		console.log(userDetails);
		return;
	};

	return (
		<>
			<Header />
			<LoginForm handleLogin={handleLogin} />
			<button onClick={showModal}>Sign Up</button>
			<SignUpModal handleSignUp={handleSignUp} closeModal={closeModal} shown={showSignupModal} />
			<About />
		</>
	);
};

export default LandingPage;
