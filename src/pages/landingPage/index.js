import React, { useState } from 'react';

// Components //
import { Header, LoginForm, SignUpModal, About } from '../../components';

const LandingPage = () => {
	const [showSignupModal, setShowSignupModal] = useState(false);

	const closeModal = () => {
		setShowSignupModal(false);
	};

	const showModal = () => {
		setShowSignupModal(true);
	};

	return (
		<>
			<Header />
			<LoginForm />
			<button onClick={showModal}>Sign Up</button>
			<SignUpModal closeModal={closeModal} shown={showSignupModal} />
			<About />
		</>
	);
};

export default LandingPage;
