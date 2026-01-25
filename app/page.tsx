export default function Page() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-900">
			<div className="p-8 rounded-xl bg-white shadow-xl">
				<h1 className="text-4xl font-bold text-emerald-500">
					Tailwind radi ✅
				</h1>

				<p className="mt-4 text-gray-600">
					Ako vidiš ovu karticu – sve je OK.
				</p>

				<button className="mt-6 px-6 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
					Test dugme
				</button>
			</div>
			<div className="min-h-screen bg-slate-900 p-8">
				<div className="mx-auto max-w-md border border-slate-900 rounded-br-full bg-slate-900 p-6">
					<h1 className="text-white text-xl">Nova rezervacija</h1>
				</div>
			</div>
		</div>
	);
}
