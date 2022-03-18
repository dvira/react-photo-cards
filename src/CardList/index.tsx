import { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";

import Card from "../Card";

import "./styles.scss";

export interface Photo {
	id: number;
	title: string;
	url: string;
}

export default function CardList() {
	const [photos, setPhotos] = useState<Photo[]>([]);

	const fetchPhotos = useCallback(async () => {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/photos",
			);
			const json = await response.json();
			setPhotos(json.slice(0, 20));
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		fetchPhotos();
	}, [fetchPhotos]);

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const [title, setTitle] = useState<string>();
	const [url, setUrl] = useState<string>();
	const [id, setId] = useState<number>();

	const onEdit = (card: Photo) => {
		setTitle(card.title);
		setUrl(card.url);
		setId(card.id);
		setOpen(true);
	};

	const titleError = useMemo(() => {
		const isEmpty = title?.trim() === "";
		const titleAlreadyExists = photos
			.filter((photo) => photo.id !== id)
			.some((photo) => photo.title === title);

		return isEmpty || titleAlreadyExists;
	}, [id, photos, title]);

	const urlError = useMemo(() => {
		const isValidUrl =
			/^https:\/\/via\.placeholder\.com\/600\/([a-z0-9]){6}$/.test(url ?? "");
		const urlAlreadyExists = photos
			.filter((photo) => photo.id !== id)
			.some((photo) => photo.url === url);

		return !isValidUrl || urlAlreadyExists;
	}, [id, photos, url]);

	const handleSave = () => {
		const newPhotos = [...photos];
		const idx = photos.findIndex((photo) => photo.id === id);

		if (!id || !url || !title) return;

		newPhotos[idx] = { title, url, id };
		setPhotos(newPhotos);
		setOpen(false);
	};

	return (
		<div className="card-list">
			{photos.map(({ id, url, title }) => (
				<Card key={id} id={id} url={url} title={title} onEdit={onEdit} />
			))}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle className="dialog-title">Edit Card</DialogTitle>
				<div className="dialog-content">
					<TextField
						className="input"
						id="title"
						label="Title"
						fullWidth
						variant="standard"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						error={titleError}
					/>
					<TextField
						className="input"
						id="url"
						label="Url"
						fullWidth
						variant="standard"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						error={urlError}
					/>
					<TextField
						className="input"
						id="id"
						label="ID"
						fullWidth
						variant="standard"
						value={id}
						disabled
					/>
				</div>
				<div className="dialog-actions">
					<Button className="dialog-btn" onClick={handleClose} disableRipple>
						Cancel
					</Button>
					<Button
						className="dialog-btn"
						onClick={handleSave}
						disableRipple
						disabled={titleError || urlError}
					>
						Save
					</Button>
				</div>
			</Dialog>
		</div>
	);
}
