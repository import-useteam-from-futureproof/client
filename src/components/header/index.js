import React from 'react';
import styles from './style.module.css';
import test from '../../assets/logo.png';

const Header = () => {
	return (
		<section className={styles.headerContainer} aria-label="header container">
			<img aria-label="site logo" className={styles.headerImage} src={test}></img>
		</section>
	);
};

export default Header;
