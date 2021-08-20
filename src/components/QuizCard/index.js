import React from 'react';
import styles from './style.module.css';

export default ({ answers, question, time, handleClick }) => {
	const renderAnswers = () =>
		answers.map((answer, i) => (
			<button
				className={styles.button}
				dangerouslySetInnerHTML={{ __html: answer }}
				onClick={handleClick}
				key={i}
			></button>
		));

	const timerStyle = {
		color: time <= 10 ? '#DF2E2E' : '#1d506d',

		border: `solid 5px ${time <= 10 ? '#DF2E2E' : '#1d506d'}`,
	};

	return (
		<div className={styles.container}>
			<h1>Question</h1>
			<p className={styles.question} dangerouslySetInnerHTML={{ __html: question }}></p>
			<h2>Answers</h2>
			<div className={styles.buttons}>{renderAnswers()}</div>
			<p style={timerStyle} className={styles.timer}>
				{time}s
			</p>
		</div>
	);
};
