import { ChangeEvent, useMemo } from "react";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";

import { Photo } from "../CardList";

import "./styles.scss";

export interface EditCardModalProps extends Partial<Photo> {
	open: boolean;
	onClose: () => void;
	onSave: (photos: Photo[]) => void;
	photos: Photo[];
	onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditCardModal({
	open,
	onClose,
	onSave,
	photos,
	title,
	onTitleChange,
	url,
	onUrlChange,
	id,
}: EditCardModalProps) {
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
		onSave(newPhotos);
	};

	return (
		<Dialog className="edit-card-modal" open={open} onClose={onClose}>
			<DialogTitle className="title">Edit Card</DialogTitle>
			<div className="content">
				<TextField
					className="input"
					id="title"
					label="Title"
					fullWidth
					variant="standard"
					value={title}
					onChange={onTitleChange}
					error={titleError}
				/>
				<TextField
					className="input"
					id="url"
					label="Url"
					fullWidth
					variant="standard"
					value={url}
					onChange={onUrlChange}
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
			<div className="actions">
				<Button className="btn" onClick={onClose} disableRipple>
					Cancel
				</Button>
				<Button
					className="btn"
					onClick={handleSave}
					disableRipple
					disabled={titleError || urlError}
				>
					Save
				</Button>
			</div>
		</Dialog>
	);
}
