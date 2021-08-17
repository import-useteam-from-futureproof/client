import React, { useState } from 'react';
import styles from './style.module.css';

const GDPRNotice = () => {
	const [hidden, setHidden] = useState(false);

	const hideGDPR = () => {
		setHidden(true);
	};

	return (
		<div aria-label="gdpr notice" className={hidden ? styles.hidden : styles.gdprNotice}>
			<p>
				<a href="#">Click here to see view our GDPR policy </a>
				<span aria-label="dismiss the form" onClick={hideGDPR} className={styles.dismiss}>
					or dismiss this notice
				</span>
			</p>
		</div>
	);
};

export default GDPRNotice;
