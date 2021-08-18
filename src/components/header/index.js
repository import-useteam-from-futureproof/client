import React from 'react';
import styles from './style.module.css';

const Header = () => {
	return (
		<section aria-label="header container">
			<img aria-label="site logo" className={styles.headerImage} src="../../assets/logo.svg"></img>
		</section>
	);
};

export default Header;
