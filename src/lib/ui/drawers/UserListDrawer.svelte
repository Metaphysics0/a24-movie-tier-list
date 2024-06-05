<script lang="ts">
	import { likedMoviesStore } from '$lib/stores/liked-movies/store';
	import { watchlistStore } from '$lib/stores/watchlist/store';
</script>

<section class="p-3">
	<div class="mb-3">
		<strong class="text-lg">Liked Movies:</strong>
		<ul>
			{#each $likedMoviesStore as likedMovie}
				<li>- {likedMovie.title}</li>
			{/each}
		</ul>
	</div>
	<div>
		<strong class="text-lg">Watchlist:</strong>
		<ul>
			{#each $watchlistStore as watchlistMovie}
				<li>- {watchlistMovie.title}</li>
			{/each}
		</ul>
	</div>
</section>
