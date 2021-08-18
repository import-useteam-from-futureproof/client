import React from 'react';

export default ({ answers, question, handleClick }) => {
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
		</div>
	);
};
