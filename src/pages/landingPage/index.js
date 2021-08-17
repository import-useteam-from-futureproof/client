import React, { useEffect } from 'react';
import styles from './style.module.css';
import { About, Review } from '../../components';
import { SignUpLogin } from '../../layout';

const LandingPage = () => {
	return (
		<>
			<SignUpLogin />
			<About />
			<section className={styles.reviewContainer}>
				<Review />
				<Review />
				<Review />
			</section>
		</>
	);
};

export default LandingPage;
