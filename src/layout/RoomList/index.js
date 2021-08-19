import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import io from 'socket.io-client';
import axios from 'axios';
import './style.css';
export default () => {
	const { currentUser } = useAuth();
	const userId = currentUser ? currentUser.uid : '';
	const username = currentUser ? currentUser.displayName : '';
	const socketServer = 'https://pursuit-of-trivia.herokuapp.com/';
	const API_URL = process.env.REACT_APP_BASE_URL;
	const [rooms, setRooms] = useState([]);

	const quiz = useQuiz();
	const { push } = useHistory();
	//fetch all rooms
	useEffect(async () => {
		try {
			const { data } = await axios.get(`${API_URL}/rooms`);
			data.rooms.reverse();
			setRooms(data.rooms);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const redirect = (id) => {
		push(`/quiz/${id}`);
	};

	const postData = async (id) => {
		try {
			const post = await axios.post(`${API_URL}/rooms/${id}/join/${userId}`);
			redirect(id);
		} catch (err) {
			console.log(err);
		}
	};

	const joinRoom = (e, room) => {
		e.preventDefault();
		quiz.joinRoom(room);
		let privacy = e.target.children[1].id;
		if (privacy === 'Private') {
			let privateForm = e.target.nextElementSibling;
			let oldJoinButton = e.target[0];
			oldJoinButton.style.display = 'none';
			privateForm.style.display = 'block';
		} else {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName: room.id, username });
			postData(room.id);
		}
	};

	const joinPrivateRoom = (e, room, passcode) => {
		e.preventDefault();
		quiz.joinRoom(room);
		if (e.target[0].value === passcode) {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName: room.id, username });
			postData(room.id);
		} else {
			e.target.children[2].style.display = 'block';
		}
	};

	const renderRooms = () => {
		return rooms.map((room, i) => {
			let privacyIcon = '../../assets/lock-icon.svg';
			let privacy = 'Private';
			let currentVisitors = 0;
			let passcode = '';
			if (room.participants) {
				currentVisitors = room.participants.length;
			}
			if (room.entry_pass) {
				passcode = room.entry_pass;
			}
			if (room.public_room) {
				privacyIcon = '../../assets/globe-icon.svg';
				privacy = 'Public';
			}
			return (
				<section key={i}>
					<form
						onSubmit={(e) => {
							joinRoom(e, room);
						}}
						className="room"
					>
						<div>
							<p>{room.name}</p>
						</div>
						<div>
							<img className="formIcon" src={privacyIcon} id={privacy}></img>
							<p>
								{currentVisitors}/{room.max_room_size}
							</p>
							<input type="submit" value="Join"></input>
						</div>
					</form>
					<form
						onSubmit={(e) => {
							joinPrivateRoom(e, room, passcode);
						}}
						id="privateJoin"
					>
						<input type="text"></input>
						<input type="submit" value="Join"></input>
						<p id="error">That password was incorrect! Try again!</p>
					</form>
				</section>
			);
		});
	};

	return (
		<section id="roomList">
			<h1>Join a Quiz</h1>
			<div className="rooms">{renderRooms()}</div>
		</section>
	);
};
