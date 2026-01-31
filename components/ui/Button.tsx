"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "danger" | "ghost";
}

export default function Button({
	variant = "primary",
	className,
	...props
}: Props) {
	return (
		<button
			{...props}
			className={clsx(
				"rounded px-4 py-2 text-sm font-medium transition-all duration-150 ease-out active:scale-95",
				{
					"bg-gray-900 text-white hover:bg-gray-800":
						variant === "primary",
					"bg-red-600 text-white hover:bg-red-700":
						variant === "danger",
					"bg-transparent text-gray-700 hover:bg-gray-100":
						variant === "ghost",
				},
				className,
			)}
		/>
	);
}
