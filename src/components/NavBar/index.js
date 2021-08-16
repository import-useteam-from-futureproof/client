import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
	const pages = ['Dashboard', 'Profile', 'Leaderboard'];
	return (
		<nav>
			<ul>
				<li>
					<NavLink exact to='/dashboard'>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink exact to='/leaderboard'>
						Leaderboard
					</NavLink>
				</li>
				<li>
					<NavLink exact to='/profile'>
						Profile
					</NavLink>
				</li>
				<li>
					<button>Logout</button>
				</li>
			</ul>
		</nav>
	);
};
