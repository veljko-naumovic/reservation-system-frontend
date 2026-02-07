"use client";

import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger";
}

const Button = ({
	variant = "primary",
	className,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			className={clsx(
				// base
				"inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors duration-150",

				// primary
				variant === "primary" &&
					"bg-gray-900 text-white hover:bg-gray-800",

				// secondary ✅ FIXED
				variant === "secondary" &&
					"bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200",

				// danger
				variant === "danger" &&
					"bg-red-600 text-white hover:bg-red-700",

				// disabled state
				disabled &&
					"opacity-50 cursor-not-allowed disabled:hover:bg-gray-700",

				className,
			)}
			{...props}
		/>
	);
};

export default Button;
