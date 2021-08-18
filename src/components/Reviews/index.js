import React from 'react';
import styles from './style.module.css';

const Reviews = () => {
	return (
		<section className={styles.reviewsContainer}>
			<article>
				<p className={styles.reviewBody}>
					This app isn’t as bad as I thought it would be. I expected a trainwreck.
				</p>
				<hr />
				<p className={styles.reviewer}>Reviewer</p>
			</article>
			<article>
				<p className={styles.reviewBody}>I play this when i’m bored. I guess it’s okay.</p>
				<hr />
				<p className={styles.reviewer}>Reviewer</p>
			</article>
		</section>
	);
};

export default Reviews;
