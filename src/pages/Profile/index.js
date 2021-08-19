import React, { useState, useEffect } from 'react';
import {
	DeleteAccountModal,
	UpdateUsernameModal,
	UpdatePasswordModal,
	UpdateAvatarModal,
} from '../../components';
import { NavBar } from '../../components';
import { useAuth } from '../../contexts/AuthContext';

import styles from './style.module.css';

export default () => {
	const { currentUser } = useAuth();

	const [showUpdateAvatarModal, setShowUpdateAvatarModal] = useState(false);
	const [showUpdateUsernameModal, setShowUpdateUsernameModal] = useState(false);
	const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [userAvatar, setUserAvatar] = useState(currentUser ? currentUser.photoURL : '');

	//Show Modals
	const handleAvatarClick = () => {
		setShowUpdateAvatarModal((prevState) => !prevState);
	};

	const handleUpdateUsernameClick = () => {
		setShowUpdateUsernameModal((prevState) => !prevState);
	};

	const handleUpdatePasswordClick = () => {
		setShowUpdatePasswordModal((prevState) => !prevState);
	};

	const handleDeleteClick = () => {
		setShowDeleteModal((prevState) => !prevState);
	};

	//Close Modals
	const closeDeleteAccountModal = () => {
		setShowDeleteModal(false);
	};

	const closeUpdateAvatarModal = () => {
		setShowUpdateAvatarModal(false);
	};

	const closeUpdateUsernameModal = () => {
		setShowUpdateUsernameModal(false);
	};

	const closeUpdatePasswordModal = () => {
		setShowUpdatePasswordModal(false);
	};

	const updateUserAvatar = (avatar) => {
		setUserAvatar(avatar);
	};

	return (
		<>
			<UpdateAvatarModal
				avatar={userAvatar}
				closeModal={closeUpdateAvatarModal}
				isVisible={showUpdateAvatarModal}
				updateAvatarState={updateUserAvatar}
			/>
			<UpdateUsernameModal
				displayName={currentUser ? currentUser.displayName : ''}
				closeModal={closeUpdateUsernameModal}
				isVisible={showUpdateUsernameModal}
			/>
			<UpdatePasswordModal
				closeModal={closeUpdatePasswordModal}
				isVisible={showUpdatePasswordModal}
			/>
			<DeleteAccountModal closeModal={closeDeleteAccountModal} isVisible={showDeleteModal} />
			<NavBar />
			<main>
				<h1 className={styles.welcomeHeader}>
					Hello {currentUser ? currentUser.displayName : 'Profile'}
				</h1>
				<div className={styles.avatar_container}>
					<img className={styles.avatar} onClick={handleAvatarClick} src={userAvatar}></img>
				</div>
				<button
					className={styles.button}
					aria-label="access update username button"
					onClick={handleUpdateUsernameClick}
				>
					Update Username
				</button>
				<button
					className={styles.button}
					aria-label="access change password button"
					onClick={handleUpdatePasswordClick}
				>
					Change Password
				</button>
				<button
					className={`${styles.button} ${styles.danger}`}
					aria-label="access delete account button"
					onClick={handleDeleteClick}
				>
					Delete Account
				</button>
			</main>
		</>
	);
};
