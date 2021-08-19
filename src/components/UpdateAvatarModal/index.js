import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ avatar, isVisible, closeModal, updateAvatarState }) => {
	const [currentAvatar, setCurrentAvatar] = useState(avatar);
	const [newAvatars, setNewAvatars] = useState([]);
	const { currentUser, updateAvatar } = useAuth();

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	useEffect(() => {
		fetchNewAvatars();
	}, []);

	const fetchNewAvatars = () => {
		const username = currentUser.displayName;
		const avatarsList = [];

		for (let step = 0; step < 5; step++) {
			const random = Math.floor(Math.random() * 1000);
			const avatarUrl = `https://avatars.dicebear.com/api/bottts/${username}${random}.svg`;
			avatarsList.push(avatarUrl);
		}

		setNewAvatars(avatarsList);
	};

	const renderAvatars = (data) => {
		const avatars = [];
		data.forEach((avatar, index) => {
			avatars.push(
				<img
					onClick={() => chooseAvatar(avatar)}
					key={index}
					src={avatar}
					className={styles.small_avatar}
				/>
			);
		});
		return avatars;
	};

	const handleRefresh = () => {
		fetchNewAvatars();
	};

	const chooseAvatar = (avatar) => {
		setCurrentAvatar(avatar);
	};

	const handleUpdateAvatar = async () => {
		try {
			updateAvatar(currentAvatar);
			updateAvatarState(currentAvatar);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section aria-label="pick avatar" style={modalStyle} className={styles.updateAvatarModal}>
			<div role="presentation">
				<button
					className={styles.buttonClose}
					onClick={() => {
						closeModal();
						setCurrentAvatar(avatar);
					}}
				>
					&times;
				</button>
				<div className={styles.avatars}>
					<img className={styles.main_avatar} src={currentAvatar}></img>
					<div className={styles.avatarPicker}>{renderAvatars(newAvatars)}</div>
				</div>
				<button className={styles.button} onClick={handleRefresh}>
					&#x21bb; Refresh Avatars
				</button>
				<button className={styles.button} onClick={handleUpdateAvatar} aria-label="update avatar">
					Update Avatar
				</button>
			</div>
		</section>
	);
};
