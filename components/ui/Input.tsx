"use client";

import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
	return (
		<div className="space-y-1">
			{label && (
				<label className="block text-sm font-medium text-gray-600">
					{label}
				</label>
			)}

			<input
				{...props}
				className={clsx(
					"w-full rounded-md border px-3 py-2 text-base",
					"focus:outline-none focus:ring-1 transition-colors",

					error
						? "border-red-500 focus:ring-red-400 focus:border-red-500"
						: "border-gray-300 focus:ring-blue-400 focus:border-blue-400",
				)}
			/>

			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default Input;
