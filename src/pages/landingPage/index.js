import React, { useEffect } from 'react';
import styles from './style.module.css';
import { About, Review } from '../../components';
import { SignUpLogin } from '../../layout';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
	const { currentUser } = useAuth();
	const { push } = useHistory();

	useEffect(() => {
		if (currentUser) {
			push('/dashboard');
		}
	}, [currentUser]);
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
