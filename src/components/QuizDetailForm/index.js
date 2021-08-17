import React, { useState } from 'react';

export default ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		category: 9,
		difficulty: 'easy',
		numberOfQuestions: 10,
	});

	const handleSelectChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const handleNumQuestionsChange = (e) => {
		const { value } = e.target;
		if (value !== '' && (value > 20 || value < 1)) {
			return;
		}
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<label htmlFor="category">Category</label>
			<select
				id="category"
				name="category"
				onChange={handleSelectChange}
				required
				value={formData.category}
			>
				<option value="9">General Knowledge</option>
				<option value="21">Sports</option>
				<option value="27">Animals</option>
				<option value="23">History</option>
				<option value="26">Celebrities</option>
				<option value="28">Vehicles</option>
			</select>

			<label htmlFor="difficulty">difficulty</label>
			<select
				onChange={handleSelectChange}
				value={formData.numberOfQuestions}
				id="difficulty"
				name="difficulty"
				required
			>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>

			<label htmlFor="numberOfQuestions">Number of questions</label>
			<input
				onChange={handleNumQuestionsChange}
				value={formData.numberOfQuestions}
				id="numberOfQuestions"
				name="numberOfQuestions"
				type="number"
				min={1}
				max={20}
				required
			/>

			<input type="submit" />
		</form>
	);
};
