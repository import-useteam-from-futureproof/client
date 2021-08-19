import React from 'react';

export default function Results({ results }) {
	const renderResults = () => {
		results.sort();
		return results.map((result) => (
			<li key={result.userId}>
				<span>{result.username}</span>
				<span>{result.score === null ? 'still playing' : result.score}</span>
			</li>
		));
	};
	return (
		<section>
			<h1>Results</h1>
			<ul>{renderResults()}</ul>
		</section>
	);
}
