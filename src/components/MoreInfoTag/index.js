import React from 'react';
import styles from './style.module.css';

const MoreInfoTag = () => {
	return (
		<a aria-label="link to view more info" className={styles.link} href="#about">
			take a look at some of our features.
		</a>
	);
};

export default MoreInfoTag;
