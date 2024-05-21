// React
import React from "react";
// MUI
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";

import { addHashToCurrentPage } from "../utils/URLHelper";
import { Container, Grid } from "@mui/joy";
import NavButtons from "./navbuttons/NavButtons";

function SearchResultsListView({ rooms, buildingData }) {
	const openRoom = (aRoom, e) => {
		if (typeof aRoom === "object") {
			// There is a double redirect happening
			// here. The first one is not sending a
			// id. Rather, it is sending an object.
			// I don't know why it is happening
			// though. We are simply going to ignore
			// that call.
			return;
		}
		addHashToCurrentPage(`room/${aRoom}`);
	};

	return (
		<>
			{rooms && rooms.length > 0 && (
				<Container>
					<Grid container>
						<Grid mr={1}>
							<NavButtons />
						</Grid>
						<Grid>
							<Typography level="title-md" mt={1}>
								Pick a room {buildingData && <>from {buildingData.name}</>}
							</Typography>
						</Grid>
						<Grid xs={12}>
							<Typography level="body-xs">Total rooms: {rooms.length}</Typography>
						</Grid>
					</Grid>
					<Table hoverRow>
						<thead>
							<tr>
								<th>Room Name</th>
								<th>Floor</th>
								<th>Seating Capacity</th>
							</tr>
						</thead>
						<tbody>
							{rooms?.map((aRoom) => (
								<tr key={aRoom.id}>
									<td>
										<a href={`#room/${aRoom.id}`}>{aRoom.name}</a>
									</td>
									<td>{aRoom.floor}</td>
									<td>{aRoom.capacity}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Container>
			)}
			{(!rooms || rooms.length <= 0) && (
				<Typography component="h2" id="modal-title" level="h4" fontWeight="lg" mb={3}>
					Sorry, no rooms were found for the given query.
				</Typography>
			)}
		</>
	);
}

export default SearchResultsListView;
