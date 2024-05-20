import { Button } from "@mui/joy";
import React from "react";

const BackButton = () => {
	const handleClick = () => {
		history.back();
	};

	return (
		<Button variant="plain" onClick={handleClick}>
			&#8592;
		</Button>
	);
};

export default BackButton;