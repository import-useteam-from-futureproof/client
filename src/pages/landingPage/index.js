import React from 'react';

import styles from './style.module.css';

// Components //
import { About, Review, Footer, GDPRNotice, Header, FeaturesList } from '../../components';

import { SignUpLogin } from '../../layout';

const LandingPage = () => {
	return (
		<>
			<Header />
			<SignUpLogin />
			<About />
			<FeaturesList />
			<Footer />
			<GDPRNotice />
		</>
	);
};

export default LandingPage;
