import { Card as MuiCard, Typography, Button } from "@mui/material";

import { Photo } from "../CardList";

import "./styles.scss";

interface CardProps extends Photo {
	onEdit: (card: Photo) => void;
	onDelete: (id: number) => void;
}

export default function Card({ id, title, url, onEdit, onDelete }: CardProps) {
	return (
		<MuiCard className="card">
			<img className="photo" src={url} alt={title} />
			<Typography className="title" title={title} component="div">
				{title}
			</Typography>
			<Button
				className="btn"
				variant="contained"
				disableElevation
				disableRipple
				onClick={() => onEdit({ id, title, url })}
			>
				Edit
			</Button>
			<Button
				className="btn"
				variant="contained"
				disableElevation
				disableRipple
				onClick={() => onDelete(id)}
			>
				Delete
			</Button>
		</MuiCard>
	);
}
