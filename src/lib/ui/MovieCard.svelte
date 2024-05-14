<script lang="ts">
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';

	export let movie: TmdbSearchResult;
</script>

<div class="mx-auto flex w-max flex-col items-center">
	<div class="card rounded-md">
		<img
			src={movie.poster_path || movie.backdrop_path}
			alt={`${movie.title} poster`}
			class="max-w-36 rounded-md"
		/>
	</div>
	<p>
		{movie.title}
	</p>
	{#if movie.release_date}
		<p>({movie.release_date})</p>
	{/if}
</div>
