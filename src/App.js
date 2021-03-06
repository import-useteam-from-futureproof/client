import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import { RedirectUser } from './components';
import { Profile, LandingPage, Leaderboard, Lobby, Quiz, NotFound, GDPR } from './pages';

import './style.css';

export default function App() {
	return (
		<AuthProvider>
			<QuizProvider>
				<RedirectUser />
				<Switch>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/leaderboard">
						<Leaderboard />
					</Route>
					<Route path="/lobby">
						<Lobby />
					</Route>
					<Route path="/quiz/:id">
						<Quiz />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/gdpr">
						<GDPR />
					</Route>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route path="/">
						<NotFound />
					</Route>
				</Switch>
			</QuizProvider>
		</AuthProvider>
	);
}
