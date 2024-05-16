<script lang="ts">
	import { page } from '$app/stores';

	const movieStreamRoute = `media/${$page.params.movieId}`;
</script>

<p>
	{$page.route.id}
</p>

<a href={`https://sudo-flix.lol/${movieStreamRoute}`}>watch here</a>
