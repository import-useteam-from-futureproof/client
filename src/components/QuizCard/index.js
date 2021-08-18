import React from 'react';

export default ({ answers, question, time, handleClick }) => {
	const renderAnswers = () =>
		answers.map((answer, i) => (
			<button onClick={handleClick} key={i}>
				{answer}
			</button>
		));
	return (
		<div>
			<p>{question}</p>
			{renderAnswers()}
			<p>Time left: {time}s</p>
		</div>
	);
};
