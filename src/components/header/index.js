import React from 'react';
import styles from './style.module.css';

const Header = () => {
	return (
		<section className={styles.headerContainer} aria-label="header container">
			<img
				aria-label="site logo"
				className={styles.headerImage}
				src={require('../../assets/logo.svg').default}
			></img>
		</section>
	);
};

export default Header;
