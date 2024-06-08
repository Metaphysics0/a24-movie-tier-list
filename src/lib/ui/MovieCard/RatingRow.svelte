<script lang="ts">
	import imdbLogo from '$lib/assets/imdb-logo.png';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import Icon from '@iconify/svelte';
	export let movie: TmdbSearchResult;

	const { imdbRating } = movie.omdbData!;
</script>

<div class="text-bold flex items-center text-lg">
	<Icon icon="ph:star-fill" class="mr-1 text-amber-400" />
	<span class="font-semibold">
		{imdbRating}
	</span>
	<img src={imdbLogo} alt="imdb" class="ml-2 w-10" />
</div>
