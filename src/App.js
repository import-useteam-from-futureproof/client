import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Profile, LandingPage, Leaderboard, Dashboard, Quiz, NotFound } from './pages';

export default function App() {
	return (
		<AuthProvider>
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
