import { ChangeEvent, useMemo } from "react";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";

import { Photo } from "../CardList";

import "./styles.scss";

export interface ModalProps extends Partial<Photo> {
	open: boolean;
	onClose: () => void;
	applyLabel: string;
	onApply: () => void;
	modalTitle: string;
	photos: Photo[];
	onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Modal({
	open,
	onClose,
	applyLabel,
	onApply,
	modalTitle,
	photos,
	title,
	onTitleChange,
	url,
	onUrlChange,
	id,
}: ModalProps) {
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

	return (
		<Dialog className="modal" open={open} onClose={onClose}>
			<DialogTitle className="title">{modalTitle}</DialogTitle>
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
					helperText={titleError && "Title already exists or empty"}
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
					helperText={urlError && "Url already exists or invalid"}
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
					onClick={onApply}
					disableRipple
					disabled={titleError || urlError}
				>
					{applyLabel}
				</Button>
			</div>
		</Dialog>
	);
}
