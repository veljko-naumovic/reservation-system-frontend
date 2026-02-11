"use client";

import { useEffect } from "react";

interface Props {
	message: string;
	onClose: () => void;
}

const Toast = ({ message, onClose }: Props) => {
	useEffect(() => {
		const t = setTimeout(onClose, 3000);
		return () => clearTimeout(t);
	}, [onClose]);

	return (
		<div
			className="
			fixed bottom-6 right-6 z-50
			rounded-lg bg-gray-900 px-4 py-3
			text-sm text-white shadow-lg
			animate-fade-in
		"
		>
			{message}
		</div>
	);
};

export default Toast;
