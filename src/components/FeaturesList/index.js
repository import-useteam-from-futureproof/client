import React from 'react';
import styles from './style.module.css';

const FeaturesList = () => {
	return (
		<section className={styles.featuresContainer}>
			<article>
				<img className={styles.featuresImages} src="../../assets/leaderboard-icon.svg"></img>
				<h3>Leaderboards</h3>
			</article>
			<article>
				<img className={styles.featuresImages} src="../../assets/friends-icon.svg"></img>
				<h3>Play with friends</h3>
			</article>
			<article>
				<img className={styles.featuresImages} src="../../assets/chat-icon.svg"></img>
				<h3>Built in chat</h3>
			</article>
		</section>
	);
};

export default FeaturesList;
