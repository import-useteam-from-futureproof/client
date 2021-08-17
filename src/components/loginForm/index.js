import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuth();

	const handleEmailInputChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordInputChange = (e) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();
			const response = await login(email, password);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form aria-label="login form" onSubmit={handleFormSubmit}>
			<label>
				Email:{' '}
				<input
					onChange={handleEmailInputChange}
					value={email}
					id="loginEmail"
					type="email"
					placeholder="email"
				/>
			</label>
			<label>
				Password:{' '}
				<input
					onChange={handlePasswordInputChange}
					value={password}
					id="loginPassword"
					type="password"
					placeholder="password"
				/>
			</label>
			<input type="submit" value="log in" />
		</form>
	);
};

export default LoginForm;
