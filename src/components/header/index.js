import React from 'react';
import styles from './style.module.css';

const Header = () => {
	return (
		<section aria-label="header container">
			<img aria-label="site logo" className={styles.headerImage} src="../../assets/logo.svg"></img>
			<p aria-label="strapline">Our strap-line goes here.</p>
		</section>
	);
};

export default Header;
