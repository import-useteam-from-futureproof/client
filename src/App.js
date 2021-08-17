import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RedirectUser } from './components';
import { Profile, LandingPage, Leaderboard, Dashboard, Quiz, NotFound, GDPR } from './pages';

import './style.css';

export default function App() {
	return (
		<AuthProvider>
			<RedirectUser />
			<Switch>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/leaderboard">
					<Leaderboard />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/quiz/:id">
					<Quiz />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/GDPR">
					<GDPR />
				</Route>
				<Route exact path="/">
					<LandingPage />
				</Route>
				<Route path="/">
					<NotFound />
				</Route>
			</Switch>
		</AuthProvider>
	);
}
