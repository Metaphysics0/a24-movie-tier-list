export const missingMovieData: MissingMovieData[] = [
	{
		tmdbId: '1209780',
		title: 'Close',
		imdbId: 'tt9660502'
	},
	{
		tmdbId: '972538',
		title: 'High Life',
		imdbId: 'tt4827558'
	},
	{
		tmdbId: 'tt3704050',
		title: 'Remember',
		imdbId: 'tt3704050'
	}
];

export function getStoredImdbMovieIdFromTmdbMovieId(
	tmdbMovieId: string | number
): string | undefined {
	const movieDataItem = missingMovieData.find(
		(movieData) => movieData.tmdbId === String(tmdbMovieId)
	);

	return movieDataItem?.imdbId;
}
interface MissingMovieData {
	tmdbId: string;
	title: string;
	imdbId: string;
}
