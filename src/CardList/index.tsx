import { useCallback, useEffect, useState } from "react";

import Card from "../Card";
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

	const handleSave = (newPhotos: Photo[]) => {
		setPhotos(newPhotos);
		setOpen(false);
	};

	return (
		<div className="card-list">
			{photos.map(({ id, url, title }) => (
				<Card key={id} id={id} url={url} title={title} onEdit={onEdit} />
			))}
			<EditCardModal
				open={open}
				onClose={handleClose}
				onSave={handleSave}
				photos={photos}
				title={title}
				onTitleChange={(e) => setTitle(e.target.value)}
				url={url}
				onUrlChange={(e) => setUrl(e.target.value)}
				id={id}
			/>
		</div>
	);
}
