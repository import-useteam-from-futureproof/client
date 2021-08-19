import React from 'react';
import styles from './style.module.css';
import logo from '../../assets/logo.svg';

const Header = () => {
	return (
		<section>
			<img
				aria-label="site logo"
				className={styles.headerImage}
				src="https://i.imgur.com/OM3ye6t.png"
			></img>
		</section>
	);
};

export default Header;
