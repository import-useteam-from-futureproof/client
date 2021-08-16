import React from 'react';
import styles from './style.module.css';

const About = () => {
	return (
		<section className={styles.aboutMeSection}>
			<img
				className={styles.images}
				src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
			></img>
			<section className={styles.aboutMeSectionText}>
				<h2>Love to quiz?</h2>
				<h3>of course you do...</h3>
			</section>
		</section>
	);
};

export default About;
