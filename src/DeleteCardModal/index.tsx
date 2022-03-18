import { Dialog, DialogTitle, Button, DialogContentText } from "@mui/material";

import "./styles.scss";

export interface DeleteCardModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function DeleteCardModal({
	open,
	onClose,
	onConfirm,
}: DeleteCardModalProps) {
	return (
		<Dialog className="delete-card-modal" open={open} onClose={onClose}>
			<DialogTitle className="title">Delete Card</DialogTitle>
			<div className="content">
				<DialogContentText>
					Are you sure you want delete this card?
				</DialogContentText>
			</div>
			<div className="actions">
				<Button className="btn" onClick={onClose} disableRipple>
					Cancel
				</Button>
				<Button
					className="btn delete"
					onClick={onConfirm}
					variant="contained"
					disableRipple
					disableElevation
				>
					Confirm
				</Button>
			</div>
		</Dialog>
	);
}
