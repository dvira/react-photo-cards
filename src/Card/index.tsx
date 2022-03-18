import { Card as MuiCard, Typography, Button } from "@mui/material";

import { Photo } from "../CardList";

import "./styles.scss";

interface CardProps extends Photo {
	onEdit: (id: Photo) => void;
}

export default function Card({ id, title, url, onEdit }: CardProps) {
	return (
		<MuiCard className="card">
			<img className="photo" src={url} alt={title} />
			<Typography className="title" title={title} component="div">
				{title}
			</Typography>
			<Button
				className="edit-btn"
				variant="contained"
				disableElevation
				disableRipple
				onClick={() => onEdit({ id, title, url })}
			>
				Edit
			</Button>
		</MuiCard>
	);
}
