import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	const { pathname } = useLocation();
	const { push } = useHistory();

	useEffect(() => {
		if (pathname === '/GDPR') {
			return;
		} else if (currentUser && pathname === '/') {
			push('/dashboard');
		} else if (!currentUser && pathname !== '/') {
			push('/');
		}
	}, [currentUser]);
	return <></>;
};