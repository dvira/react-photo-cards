import { useCallback, useEffect, useState } from "react";

import Card from "../Card";
import DeleteCardModal from "../DeleteCardModal";
import EditCardModal from "../EditCardModal";

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

	const [openEditModal, setOpenEditModal] = useState(false);
	const [title, setTitle] = useState<string>();
	const [url, setUrl] = useState<string>();
	const [id, setId] = useState<number>();

	const handleEdit = (card: Photo) => {
		setTitle(card.title);
		setUrl(card.url);
		setId(card.id);
		setOpenEditModal(true);
	};

	const handleSave = (newPhotos: Photo[]) => {
		setPhotos(newPhotos);
		setOpenEditModal(false);
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
			<EditCardModal
				open={openEditModal}
				onClose={() => setOpenEditModal(false)}
				onSave={handleSave}
				photos={photos}
				title={title}
				onTitleChange={(e) => setTitle(e.target.value)}
				url={url}
				onUrlChange={(e) => setUrl(e.target.value)}
				id={id}
			/>
			<DeleteCardModal
				open={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				onConfirm={handleConfirmDelete}
			/>
		</div>
	);
}
