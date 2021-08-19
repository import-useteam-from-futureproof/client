import React from 'react';
import styles from './style.module.css';
import logo from '../../assets/logo.svg';

const Header = () => {
	return (
		<section className={styles.headerContainer} aria-label="header container">
			<img aria-label="site logo" className={styles.headerImage} src={logo}></img>
		</section>
	);
};

export default Header;
