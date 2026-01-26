import { format, parseISO, differenceInDays } from "date-fns";

export function formatDate(date: string) {
	return format(parseISO(date), "dd.MM.yyyy");
}

export function getDuration(from: string, to: string) {
	return differenceInDays(parseISO(to), parseISO(from)) + 1;
}
