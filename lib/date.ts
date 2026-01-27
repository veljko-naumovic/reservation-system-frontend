import { format, parseISO, differenceInDays } from "date-fns";

export function formatDate(date?: string) {
	if (!date) return "-";

	const parsed = parseISO(date);
	if (isNaN(parsed.getTime())) return "-";

	return format(parsed, "dd.MM.yyyy");
}

export function getDuration(from?: string, to?: string) {
	if (!from || !to) return 0;

	const start = parseISO(from);
	const end = parseISO(to);

	if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

	return differenceInDays(end, start) + 1;
}
