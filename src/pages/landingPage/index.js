import React from 'react';

import styles from './style.module.css';

// Components //
import { About, Review, Footer, GDPRNotice, Header } from '../../components';

import { SignUpLogin } from '../../layout';

const LandingPage = () => {
	return (
		<>
			<Header />
			<SignUpLogin />
			<About />
			<section className={styles.reviewContainer}>
				<Review />
				<Review />
				<Review />
			</section>
			<Footer />
			<GDPRNotice />
		</>
	);
};

export default LandingPage;
