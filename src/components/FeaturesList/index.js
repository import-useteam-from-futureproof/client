import React from 'react';
import styles from './style.module.css';

const FeaturesList = () => {
	return (
		<section aria-label="features section" className={styles.featuresContainer}>
			<article>
				<img className={styles.featuresImages} src="https://i.imgur.com/kfNOVZK.png"></img>
				<h3>Leaderboards</h3>
			</article>
			<article>
				<img className={styles.featuresImages} src="https://i.imgur.com/tj0KNoR.png"></img>
				<h3>Play with friends</h3>
			</article>
			<article>
				<img className={styles.featuresImages} src="https://i.imgur.com/M0ReDd8.png"></img>
				<h3>Built in chat</h3>
			</article>
		</section>
	);
};

export default FeaturesList;
