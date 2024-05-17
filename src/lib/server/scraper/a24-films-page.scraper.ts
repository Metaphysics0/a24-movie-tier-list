import { DOMParser } from 'xmldom';
import { S3Respository } from '../repositories/s3.repository';

export class A24FilmPageParser {
	async getMovieTitles(): Promise<string[]> {
		const pageData = await this.fetchPageData();
		const doc = new DOMParser().parseFromString(pageData, 'text/html');
		return [...this.getFeaturedMovieTitles(doc), ...this.getMovieTitlesFromList(doc)].filter(
			Boolean
		) as string[];
	}

	private async fetchPageData() {
		const pageResponse = await new S3Respository().get('assets/a24-films.html');
		if (!pageResponse?.Body) {
			throw new Error('Error getting page data from S3');
		}
		return pageResponse.Body.transformToString();
	}

	private getMovieTitlesFromList(doc: Document) {
		try {
			const titleElements = doc.getElementsByClassName('title');
			const movieTitles = Array.from(titleElements)
				.map((titleElement) => titleElement.textContent?.trim() || '')
				.map(this.formatMovieTitle)
				.filter((titleText) => !['Upcoming', 'All Films'].includes(titleText));

			return movieTitles;
		} catch (error) {
			console.error('error getting movies from list', error);
			return [];
		}
	}

	private getFeaturedMovieTitles(doc: Document) {
		try {
			const featuredMovieTitleElements = doc.getElementsByClassName('media-tile');
			const featuredMovieTitles = Array.from(featuredMovieTitleElements)
				.map((ele) => {
					const titleElement = ele.getElementsByTagName('a')?.[0];
					return titleElement?.getAttribute('title');
				})
				.filter(Boolean);

			return featuredMovieTitles;
		} catch (error) {
			console.error('error getting featured movies', error);
			return [];
		}
	}

	// not currently used, since the getMovieTitles response already includes it
	private getComingSoonMovieTitles(doc: Document) {
		try {
			const comingSoonMovieElements = doc.getElementsByClassName(
				'media-tile film active has-thumb'
			);
			return Array.from(comingSoonMovieElements).map((comingSoonMovieElement) => {
				const href = comingSoonMovieElement.getElementsByTagName('a')[0];
				return href.getAttribute('title');
			});
		} catch (error) {
			console.error('erro getting coming soon movies', error);
			return [];
		}
	}

	private formatMovieTitle(movieTitle: string) {
		const titleWithoutLineBreaks = movieTitle.replaceAll('\n', '');
		const titleWithOnlySingleSpaces = titleWithoutLineBreaks.replace(/\s+/g, ' ');

		return titleWithOnlySingleSpaces;
	}
}
