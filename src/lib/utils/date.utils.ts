// i.e. "January 2024"
export function getMonthAndYear(date: Date) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

export function getYear(date: Date) {
	return date.getFullYear();
}
