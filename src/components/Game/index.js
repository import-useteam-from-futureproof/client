import React, { useState, useEffect } from 'react';
import { QuizCard } from '..';
import { useQuiz } from '../../contexts/QuizContext';

export default ({ onGameEnd }) => {
	const { quizData } = useQuiz();
	const { questions } = quizData;
	const [userAnswers, setUserAnswers] = useState([]);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [timerStart, setTimerStart] = useState(Date.now());
	const [remainingTime, setRemainingTime] = useState(60);
	const [currentAnswers, setCurrentAnswers] = useState([]);

	const setAnswers = () => {
		const answers = [
			...questions[questionNumber].incorrect_answers,
			questions[questionNumber].correct_answer,
		];
		function shuffleAnswers() {
			const length = answers.length;
			for (let i = 0; i < length; i++) {
				let random = Math.floor(Math.random() * length);
				const stored = answers[i];
				answers[i] = answers[random];
				answers[random] = stored;
			}
		}
		shuffleAnswers();
		setCurrentAnswers(answers);
	};

	const handleAnswerClick = (e) => {
		const answer = e.target.textContent;
		setUserAnswers((prevState) => {
			return [
				...prevState,
				{
					answer,
					correct: answer === questions[questionNumber].correct_answer,
					score: answer === questions[questionNumber].correct_answer ? calculateScore() : 0,
				},
			];
		});
		setTimerStart(Date.now());
	};

	const calculateRemaingTime = () => {
		const currentTime = Date.now();
		const timeLeft = 60 - Math.floor((currentTime - timerStart) / 1000);
		setRemainingTime(timeLeft);
	};

	const calculateScore = () => {
		const scoreWeight = Math.floor(10000 / questions.length);
		return Math.floor((scoreWeight * remainingTime) / 60);
	};

	useEffect(() => {
		setAnswers();
	}, [questionNumber]);

	useEffect(() => {
		const advanceGameState = () => {
			if (userAnswers.length === questions.length) {
				onGameEnd(userAnswers);
			} else if (userAnswers.length === questionNumber + 1) {
				setQuestionNumber((prevNumber) => prevNumber + 1);
				setTimerStart(Date.now());
			}
		};

		const addTimedOutAnswer = () => {
			setUserAnswers((prevState) => {
				return [
					...prevState,
					{
						answer: 'Question timed out.',
						correct: false,
						score: 0,
					},
				];
			});
		};

		if (remainingTime <= 0) {
			addTimedOutAnswer();
			setTimerStart(Date.now());
			calculateRemaingTime();
		}

		advanceGameState();

		const intervalId = setInterval(calculateRemaingTime, 100);
		return () => {
			clearInterval(intervalId);
		};
	}, [userAnswers, remainingTime]);

	return (
		<>
			<QuizCard
				time={remainingTime}
				handleClick={handleAnswerClick}
				question={questions[questionNumber].question}
				answers={currentAnswers}
			/>
		</>
	);
};
