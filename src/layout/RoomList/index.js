import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
	const { push } = useHistory();

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/rooms/open`);
				data.rooms.reverse();
				setRooms(data.rooms);
			} catch (err) {
				console.log(err);
			}
		};
		fetchRooms();
		const pollRoomsInterval = setInterval(fetchRooms, 5000);
		return () => {
			clearInterval(pollRoomsInterval);
		};
	}, []);

	const redirect = (id) => {
		push(`/quiz/${id}`);
	};

	const postData = async (room) => {
		try {
			redirect(room.id);
		} catch (err) {
			console.log(err);
		}
	};

	const joinRoom = (e, room) => {
		e.preventDefault();
		if (!room.public_room) {
			let privateForm = e.target.nextElementSibling;
			let oldJoinButton = e.target[0];
			oldJoinButton.style.display = 'none';
			privateForm.style.display = 'flex';
		} else {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName: room.id, username });
			postData(room);
		}
	};

	const joinPrivateRoom = (e, room, passcode) => {
		e.preventDefault();
		if (e.target[0].value === passcode) {
			const socket = io.connect(socketServer);
			socket.emit('joinRoom', { roomName: room.id, username });
			postData(room);
		} else {
			e.target.children[2].style.display = 'block';
		}
	};

	const renderRooms = () => {
		return rooms.map((room, i) => {
			let privacyIcon = 'https://i.imgur.com/qGylfjr.png';
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
				privacyIcon = 'https://i.imgur.com/2bR3QG2.png';
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
