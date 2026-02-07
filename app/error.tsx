"use client";

interface Props {
	error: Error;
	reset: () => void;
}

const GlobalError = ({ error, reset }: Props) => {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-4">
			<h1 className="text-2xl font-semibold">Something went wrong</h1>

			<p className="text-gray-600 max-w-md">
				An unexpected error occurred. Please try again.
			</p>

			<button
				onClick={reset}
				className="
                        rounded px-4 py-2 text-sm
                        bg-gray-900 text-white
                        hover:bg-gray-800
                        transition"
			>
				Try again
			</button>
		</div>
	);
};

export default GlobalError;
