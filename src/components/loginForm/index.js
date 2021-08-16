import React from 'react';

const LoginForm = ({ handleLogin }) => {
	return (
		<form aria-label="login form" onSubmit={handleLogin}>
			<label>
				Email: <input id="loginEmail" type="email" placeholder="email" />
			</label>
			<label>
				Password: <input id="loginPassword" type="password" placeholder="password" />
			</label>
			<input type="submit" value="log in" />
		</form>
	);
};

export default LoginForm;
