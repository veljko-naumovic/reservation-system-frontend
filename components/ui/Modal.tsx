"use client";

interface Props {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: Props) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6">
				{title && (
					<h2 className="mb-4 text-lg font-semibold">{title}</h2>
				)}

				{children}
			</div>
		</div>
	);
};

export default Modal;
