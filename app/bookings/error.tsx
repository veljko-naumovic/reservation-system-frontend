"use client";

interface Props {
	error: Error;
	reset: () => void;
}

const Error = ({ error, reset }: Props) => {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-red-600">
				Something went wrong
			</h2>

			<p className="text-gray-600">{error.message}</p>

			<button
				onClick={reset}
				className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800"
			>
				Try again
			</button>
		</div>
	);
};

export default Error;
