import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = React.createContext();
const BASE_URL = 'http://localhost:5000';

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password, displayName) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				const user = result.user;
				user.updateProfile({ displayName });
				return user;
			})
			.then((user) => {
				axios.post(`${BASE_URL}/user`, {
					firebase_id: user.uid,
					username: displayName,
				});
			});
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	async function deleteAccount() {
		const userId = currentUser.uid;
		try {
			await axios.delete(`${BASE_URL}/user/${userId}`);
			return auth.currentUser.delete();
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		deleteAccount,
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
