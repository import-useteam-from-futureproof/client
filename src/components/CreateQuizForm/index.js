import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ onSubmit }) => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		category: 9,
		difficulty: 'easy',
		numberOfQuestions: 10,
	});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get('https://opentdb.com/api_category.php');
				setCategories(data.trivia_categories);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCategories();
	}, []);

	const renderCategoryOptions = () =>
		categories.map((category) => (
			<option key={category.id} value={category.id}>
				{category.name}
			</option>
		));

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
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<label htmlFor="category">Category</label>
					<select
						id="category"
						name="category"
						onChange={handleSelectChange}
						required
						value={formData.category}
					>
						{renderCategoryOptions()}
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
					<input type="submit" />{' '}
				</>
			)}
		</form>
	);
};
