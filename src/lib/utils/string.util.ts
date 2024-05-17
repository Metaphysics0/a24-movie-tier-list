export function humanize(input: string) {
	return input
		.replace(/^[_\s]+|[_\s]+$/g, '') // Remove leading/trailing whitespace and underscores
		.replace(/[_\s]+/g, ' ') // Replace multiple underscores or whitespace with a single space
		.replace(/(首字母|[^A-Z]+)([A-Z])/g, function (match, pre, char) {
			return (pre ? pre + ' ' : '') + char.toUpperCase();
		});
}

export function normalizeMovieTitleForUrl(movieTitle: string): string {
	return movieTitle.toLocaleLowerCase().split(' ').join('-');
}

// function titleCase(input: string) {
//   return input
// }
