import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({
	className,
	...props
}: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className={clsx(
				"w-full rounded border px-3 py-2 text-sm",
				"focus:outline-none focus:ring-2 focus:ring-gray-900",
				className,
			)}
		/>
	);
}
