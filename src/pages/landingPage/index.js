import React, { useState } from 'react';

// Components //
import { Header, LoginForm, SignUpModal } from '../../components';

const LandingPage = () => {
	const [showSignupModal, setShowSignupModal] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(e);
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
		</>
	);
};

export default LandingPage;
