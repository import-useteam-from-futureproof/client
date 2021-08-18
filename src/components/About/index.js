import React from 'react';
import styles from './style.module.css';

const About = () => {
	return (
		<section id="about" className={styles.aboutMeSection}>
			<div className={styles.imageContainer}></div>

			<section className={styles.aboutMeSectionText}>
				<h2>Test your knowledge against your friends & the world.</h2>
				<h3>...we know you’ve got what it takes.</h3>
			</section>
		</section>
	);
};

export default About;
