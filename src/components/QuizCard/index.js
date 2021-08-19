import React from 'react';

export default ({ answers, question, time, handleClick }) => {
	const renderAnswers = () =>
		answers.map((answer, i) => (
			<button dangerouslySetInnerHTML={{ __html: answer }} onClick={handleClick} key={i}></button>
		));

	return (
		<div>
			<p dangerouslySetInnerHTML={{ __html: question }}></p>
			{renderAnswers()}
			<p>Time left: {time}s</p>
		</div>
	);
};
