import { ChangeEvent, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import Card from "../Card";
import DeleteCardModal from "../DeleteCardModal";
import Modal from "../Modal";

import "./styles.scss";

const fetchPhotos = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/photos");

	return await response.json();
};

export interface Photo {
	id: number;
	title: string;
	url: string;
}

export default function CardList() {
	const [photos, setPhotos] = useState<Photo[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const json = await fetchPhotos();
				setPhotos(json.slice(0, 10));
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const [title, setTitle] = useState<string>();
	const [url, setUrl] = useState<string>();
	const [id, setId] = useState<number>();

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const [openEditModal, setOpenEditModal] = useState(false);

	const handleEdit = (card: Photo) => {
		setTitle(card.title);
		setUrl(card.url);
		setId(card.id);
		setOpenEditModal(true);
	};

	const handleSave = () => {
		const newPhotos = [...photos];
		const idx = photos.findIndex((photo) => photo.id === id);

		if (!id || !url || !title) return;

		newPhotos[idx] = { title, url, id };
		setPhotos(newPhotos);
		setOpenEditModal(false);
	};

	const [openAddModal, setOpenAddModal] = useState(false);

	const handleClickAdd = async () => {
		try {
			const json = await fetchPhotos();
			const lastPhotoId = photos[photos.length -1].id;
			const [card] = json.slice(lastPhotoId, lastPhotoId + 1);
			setTitle(card.title);
			setUrl(card.url);
			setId(card.id);
			setOpenAddModal(true);
		} catch (e) {
			console.error(e);
		}
	};

	const handleApplyAdd = () => {
		const newPhotos = [...photos];

		if (!id || !url || !title) return;

		newPhotos.push({ title, url, id });
		setPhotos(newPhotos);
		setOpenAddModal(false);
	};

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();

	const handleDelete = (id: number) => {
		setDeleteId(id);
		setOpenDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		const newPhotos = photos.filter((photo) => photo.id !== deleteId);
		setPhotos(newPhotos);
		setOpenDeleteModal(false);
	};

	return (
		<div className="card-list">
			<header className="header">
				<Typography className="title" component="h1">
					Card List
				</Typography>
				<Button
					className="btn"
					variant="contained"
					disableElevation
					disableRipple
					onClick={handleClickAdd}
				>
					Add
				</Button>
			</header>
			<div className="cards">
				{photos.map(({ id, url, title }) => (
					<Card
						key={id}
						id={id}
						url={url}
						title={title}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				))}
			</div>
			<Modal
				open={openEditModal}
				onClose={() => setOpenEditModal(false)}
				applyLabel="Save"
				onApply={handleSave}
				modalTitle="Edit Card"
				photos={photos}
				title={title}
				onTitleChange={handleTitleChange}
				url={url}
				onUrlChange={handleUrlChange}
				id={id}
			/>
			<DeleteCardModal
				open={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				onConfirm={handleConfirmDelete}
			/>
			<Modal
				open={openAddModal}
				onClose={() => setOpenAddModal(false)}
				applyLabel="Add"
				onApply={handleApplyAdd}
				modalTitle="Add Card"
				photos={photos}
				title={title}
				onTitleChange={handleTitleChange}
				url={url}
				onUrlChange={handleUrlChange}
				id={id}
			/>
		</div>
	);
}
