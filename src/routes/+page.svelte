<script lang="ts">
	export let data;
</script>

{#each data.movieResponses as movieResponse}
	<p>{movieResponse?.title} ({movieResponse.release_date})</p>
{/each}

<h1>A24 movie tier list yooo</h1>
<p>Currently in dev mode</p>
