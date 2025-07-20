export function endOfDayUTC(date: Date) {
	const utc = new Date(
		Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			23,
			59,
			59,
			999,
		),
	)
	return utc
}

export function startOfDayUTC(date: Date) {
	const utc = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0),
	)
	return utc
}
