import React from 'react';
import styles from './style.module.css';

const Review = () => {
	return (
		<article className={styles.reviewArticle}>
			<h3 className="reviewTitle">I'm a review</h3>
			<p className="reviewAuthor">Reviewer</p>
			<p className="reviewBody">
				This is the review body
				<br /> here is some more
			</p>
		</article>
	);
};

export default Review;
