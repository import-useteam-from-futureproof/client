import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import io from 'socket.io-client';
import axios from 'axios';
import './style.css';
export default () => {
	const { currentUser } = useAuth();
	const userId = currentUser.uid;
	const username = currentUser.displayName;
	const socketServer = 'https://pursuit-of-trivia.herokuapp.com/';
	const API_URL = process.env.REACT_APP_BASE_URL;
	const [rooms, setRooms] = useState([]);

	const quiz = useQuiz();

	//fetch all rooms
	useEffect(async () => {
		try {
			const { data } = await axios.get(`${API_URL}/rooms`);
			console.log(data);
			setRooms(data.rooms);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const redirect = (id) => {
		window.location.assign(`/quiz/${id}`);
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
		if (e.target[0].value === passcode) {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName: room.id, username });
			postData(room.id);
		} else {
			console.log('You entered the wrong passcode');
		}
	};

	const renderRooms = () => {
		return rooms.map((room, i) => {
			let privacyIcon =
				'https://cdn.iconscout.com/icon/premium/png-512-thumb/lock-1967458-1668608.png';
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
				privacyIcon =
					'https://mpng.subpng.com/20180410/bvw/kisspng-computer-icons-globe-world-clip-art-globe-5acd31f76797c0.3831539515233971114243.jpg';
				privacy = 'Public';
			}
			return (
				<>
					<form
						onSubmit={(e) => {
							joinRoom(e, room);
						}}
						key={i}
						className="room"
					>
						<p>{room.name}</p>
						<img className="formIcon" src={privacyIcon} id={privacy}></img>
						<p>
							{currentVisitors}/{room.max_room_size}
						</p>
						<input type="submit" value="Join"></input>
					</form>
					<form
						onSubmit={(e) => {
							joinPrivateRoom(e, room, passcode);
						}}
						key={'private' + i}
						id="privateJoin"
					>
						<input type="text"></input>
						<input type="submit" value="Join"></input>
					</form>
				</>
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
