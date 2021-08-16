import React from 'react';

const LoginForm = ({ handleLogin }) => {
	return (
		<form aria-label="login form" onSubmit={handleLogin}>
			<label>
				Username: <input id="loginUsername" type="text" placeholder="username" />
			</label>
			<label>
				Password: <input id="loginPassword" type="password" placeholder="password" />
			</label>
			<input type="submit" value="log in" />
		</form>
	);
};

export default LoginForm;
