import React, { useState, useEffect } from 'react';
import { QuizCard } from '..';
import { useQuiz } from '../../contexts/QuizContext';

export default ({ onGameEnd }) => {
	// const { quizData } = useQuiz();
	// const { questions } = quizData;
	// const [userAnswers, setUserAnswers] = useState([]);
	// const [questionNumber, setQuestionNumnber] = useState(0);

	// const handleAnswerClick = (e) => {
	// 	const answer = e.target.textContent;
	// 	setUserAnswers((prevState) => {
	// 		return [
	// 			...prevState,
	// 			{
	// 				answer,
	// 				correct: answer === questions[questionNumber].correct_answer,
	// 				score: 0,
	// 			},
	// 		];
	// 	});
	// };

	// useEffect(() => {
	// 	const advanceGameState = () => {
	// 		if (userAnswers.length === questions.length) {
	// 			onGameEnd(userAnswers);
	// 		} else if (userAnswers.length === questionNumber + 1) {
	// 			setQuestionNumnber((prevNumber) => prevNumber + 1);
	// 		}
	// 	};
	// 	advanceGameState();
	// }, [userAnswers]);

	return (
		<></>
		// <section>
		// 	<QuizCard
		// 		handleClick={handleAnswerClick}
		// 		question={questions[questionNumber].question}
		// 		answers={[
		// 			...questions[questionNumber].incorrect_answers,
		// 			questions[questionNumber].correct_answer,
		// 		]}
		// 	/>
		// </section>
	);
};
