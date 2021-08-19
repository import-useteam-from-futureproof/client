import React from 'react';

export default function Results({ results }) {
	const renderResults = () => {
		results.sort((a, b) => {
			if (a.score === null) {
				return -1;
			} else if (b.score === null) {
				return 1;
			} else {
				return b.score - a.score;
			}
		});
		return results.map((result, i) => (
			<li key={i}>
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
