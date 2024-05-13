import { DOMParser } from 'xmldom';
import { S3Respository } from './repositories/s3.repository';

export class A24FilmPageParser {
	async getMovieTitles() {
		const pageData = await this.fetchPageData();
		const doc = new DOMParser().parseFromString(pageData, 'text/html');
		return [...this.getFeaturedMovies(doc), ...this.getMoviesFromList(doc)];
	}

	private async fetchPageData() {
		const pageResponse = await new S3Respository().get('assets/a24-films.html');
		return pageResponse?.Body.transformToString();
	}

	private getMoviesFromList(doc: Document) {
		const titleElements = doc.getElementsByClassName('title');
		const movieTitles = Array.from(titleElements)
			.map((titleElement) => titleElement.textContent?.trim() || '')
			.map(this.formatMovieTitle)
			.filter((titleText) => !['Upcoming', 'All Films'].includes(titleText));

		return movieTitles;
	}

	private getFeaturedMovies(doc: Document) {
		const featuredMovieTitleElements = doc.getElementsByClassName('media-tile');
		const featuredMovieTitles = Array.from(featuredMovieTitleElements)
			.map((ele) => {
				const titleElement = ele.getElementsByTagName('a')?.[0];
				return titleElement?.getAttribute('title');
			})
			.filter(Boolean);

		return featuredMovieTitles;
	}

	private formatMovieTitle(movieTitle: string) {
		const titleWithoutLineBreaks = movieTitle.replaceAll('\n', '');
		const titleWithOnlySingleSpaces = titleWithoutLineBreaks.replace(/\s+/g, ' ');

		return titleWithOnlySingleSpaces;
	}
}
