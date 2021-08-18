import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
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

	const redirect = () => {
		console.log('You are being redirected');
	};

	const postData = async (id) => {
		try {
			const post = await axios.post(`${API_URL}/rooms/${id}/join/${userId}`);
			redirect();
		} catch (err) {
			console.log(err);
		}
	};

	const joinRoom = (e, id) => {
		e.preventDefault();
		let roomName = e.target.getElementsByTagName('p')[0].textContent;
		const socket = io.connect(socketServer);
		console.log(username);
		socket.emit('joinRoom', { roomName, username });
		postData(id);
	};

	const renderRooms = () => {
		return rooms.map((r, i) => {
			let privacy = 'Private';
			let currentVisitors = 0;
			if (r.participants) {
				currentVisitors = r.participants.length;
			}
			if (r.public_room) {
				privacy = 'Public';
			}
			return (
				<form
					onSubmit={(e) => {
						let id = r.id;
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
			);
		});
	};

	return (
		<section>
			<h1>Join a Quiz</h1>
			<div className="rooms">{renderRooms()}</div>
		</section>
	);
};
