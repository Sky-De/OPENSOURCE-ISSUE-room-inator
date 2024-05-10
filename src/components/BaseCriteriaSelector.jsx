// React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// MUI
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";

import { addHashToCurrentPage, getURLForCriteria } from "../utils/URLHelper";
import { getJSONKeyForCriteria } from "../utils/JSONHelper";
import { Skeleton } from "@mui/joy";

/**
 * This class is a common class to select Country, Location and Building
 * @param {*} criteria one of "Country", "Location", or "Building"
 * @returns
 */
function BaseCriteriaSelector({ criteria }) {
	const { criteriaValue } = useParams();
	const [data, setData] = useState(undefined);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const response = await fetch(getURLForCriteria(criteria));
		const responseData = await response.json();
		const jsonKey = getJSONKeyForCriteria(criteria);
		setData(responseData["_embedded"][jsonKey]);
	};

	useEffect(() => {
		// If there is only one row of data,
		// just open it directly
		if (data && data.length == 1) {
			openItem(data[0].id);
		}
	}, [data]);

	const calculateNextHashRoute = () => {
		if (criteria === "Country") {
			return "country";
		}
		if (criteria === "Location") {
			return "location";
		}
		if (criteria === "Building") {
			return "building";
		}
	};

	const openItem = (aData, e) => {
		if (typeof aData === "object") {
			// There is a double redirect happening
			// here. The first one is not sending a
			// id. Rather, it is sending an object.
			// I don't know why it is happening
			// though. We are simply going to ignore
			// that call.
			return;
		}
		addHashToCurrentPage(`${calculateNextHashRoute()}/${aData}`);
	};

	return (
		<>
			{!data && (
				<>
					<Typography id="modal-title" level="title-md" my={1}>
						Loading. Please wait.
					</Typography>
				</>
			)}
			{data && data.length > 0 && (
				<>
					<Typography id="modal-title" level="title-md" my={1}>
						{
							// TODO: The criteriaValue below should be
							// extracted into a proper value like India instead of IN.
							<></>
						}
						Please pick a {criteria} {criteriaValue && <>for {criteriaValue}</>}
					</Typography>
					<Table hoverRow>
						<thead>
							<tr>
								<th style={{ width: "10%" }}>Sl No</th>
								<th>{criteria}</th>
							</tr>
						</thead>
						<tbody>
							{data?.map((aData, idx) => (
								<tr key={aData.id}>
									<td>{idx + 1}</td>
									<td>
										<a href={`#${calculateNextHashRoute()}/${aData.id}`}>
											{aData.name}
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
			{!data && (
				<>
					<Table>
						<thead>
							<tr>
								<th style={{ width: "10%" }}>
									<Skeleton variant="text" level="h3" />
								</th>
								<th>
									<Skeleton variant="text" level="h3" />
								</th>
							</tr>
						</thead>
						<tbody>
							{[...Array(2)].map((_, idx) => (
								<tr key={idx}>
									<td>
										<Skeleton variant="text" level="h4" />
									</td>
									<td>
										<Skeleton variant="text" level="h4" />
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
			{data?.length <= 0 && (
				<Typography id="modal-title" level="title-md" my={1}>
					Sorry, {criteria} not found for the given query.
				</Typography>
			)}
		</>
	);
}

export default BaseCriteriaSelector;
