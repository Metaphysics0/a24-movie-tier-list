<script lang="ts">
	import { likedMoviesStore } from '$lib/stores/liked-movies/store';
	import { watchlistStore } from '$lib/stores/watchlist/store';
	import { getMovieTitle } from '$lib/utils/tmdb/get-movie-title.util';
</script>

<section class="p-3">
	<div class="mb-3">
		<strong class="text-lg">Liked Movies:</strong>
		<ul>
			{#each $likedMoviesStore as likedMovie}
				<li>- {getMovieTitle(likedMovie)}</li>
			{/each}
		</ul>
	</div>
	<div>
		<strong class="text-lg">Watchlist:</strong>
		<ul>
			{#each $watchlistStore as watchlistMovie}
				<li>- {getMovieTitle(watchlistMovie)}</li>
			{/each}
		</ul>
	</div>
</section>
