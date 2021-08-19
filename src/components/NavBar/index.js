import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import styles from './style.module.css';

export default () => {
	const { logout } = useAuth();
	const { push } = useHistory();

	const handleClick = async () => {
		try {
			await logout();
			push('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<nav>
			<a href="#">
				<img src="https://i.imgur.com/OM3ye6t.png"></img>
			</a>
			<ul>
				<li>
					<NavLink exact to="/lobby">
						Lobby
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/leaderboard">
						Leaderboard
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/profile">
						Profile
					</NavLink>
				</li>
				<li>
					<button onClick={handleClick}>Logout</button>
				</li>
			</ul>
		</nav>
	);
};
