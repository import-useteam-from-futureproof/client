import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import './style.css';
export default () => {
	const { currentUser } = useAuth();
	const userId = currentUser.uid;
	const username = currentUser.displayName;
	const socketServer = 'http://localhost:3000';
	const API_URL = 'http://localhost:5000';
	const [rooms, setRooms] = useState([]);
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

	const joinRoom = (e, id) => {
		e.preventDefault();
		let roomName = e.target.getElementsByTagName('p')[0].textContent;
		let privacy = e.target.getElementsByTagName('p')[1].textContent;
		if (privacy === 'Private') {
			let privateForm = e.target.nextElementSibling;
			let oldJoinButton = e.target[0];
			oldJoinButton.style.display = 'none';
			privateForm.style.display = 'block';
		} else {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName, username });
			postData(id);
		}
	};

	const joinPrivateRoom = (e, id, passcode) => {
		e.preventDefault();
		let otherForm = e.target.previousElementSibling;
		let roomName = otherForm.children[0].textContent;
		if (e.target[0].value === passcode) {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName, username });
			postData(id);
		} else {
			console.log('You entered the wrong passcode');
		}
	};

	const renderRooms = () => {
		return rooms.map((r, i) => {
			let privacy = 'Private';
			let currentVisitors = 0;
			let passcode = '';
			let id = r.id;
			if (r.participants) {
				currentVisitors = r.participants.length;
			}
			if (r.entry_pass) {
				passcode = r.entry_pass;
			}
			if (r.public_room) {
				privacy = 'Public';
			}
			return (
				<>
					<form
						onSubmit={(e) => {
							joinRoom(e, id);
						}}
						key={i}
						className="room"
					>
						<p>{r.name}</p>
						<p>{privacy}</p>
						<p>
							{currentVisitors}/{r.max_room_size}
						</p>
						<input type="submit" value="Join"></input>
					</form>
					<form
						onSubmit={(e) => {
							joinPrivateRoom(e, id, passcode);
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
