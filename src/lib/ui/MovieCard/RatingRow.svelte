<script lang="ts">
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import Icon from '@iconify/svelte';
	export let movie: TmdbSearchResult;

	const { imdbRating } = movie.omdbData!;
</script>

<div class="text-bold flex items-center text-lg">
	<Icon icon="ph:star-fill" class="mr-1 text-amber-400" />
	<span class="text-bold">
		{imdbRating}
	</span>
</div>
