import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger";
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
				"px-3 py-2 rounded text-sm font-medium transition-colors duration-150",
				{
					"bg-gray-900 text-white hover:bg-gray-800":
						variant === "primary",
					"bg-gray-100 text-gray-900 hover:bg-gray-200":
						variant === "secondary",
					"bg-red-600 text-white hover:bg-red-700":
						variant === "danger",
				},
				className,
			)}
		/>
	);
}
