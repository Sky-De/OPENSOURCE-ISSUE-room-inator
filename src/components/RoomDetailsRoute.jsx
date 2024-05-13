import { useParams } from "react-router-dom";
import RoomDetails from "./RoomDetails";
import { useState, useEffect } from "react";
import Constants from "../utils/Constants";
function RoomDetailsRoute() {
	const { roomName } = useParams();
	const [room, setRoom] = useState({});

	useEffect(() => {
		loadRoom();
	}, []);

	const loadRoom = async () => {
		const response = await fetch(`${Constants.BACKEND_SERVER_ROOT}/rooms/${roomName}`);
		const data = await response.json();
		setRoom(data);
	};

	return (
		<>
			<RoomDetails room={room} />
		</>
	);
}

export default RoomDetailsRoute;
