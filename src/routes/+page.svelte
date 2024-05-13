<script lang="ts">
	export let data;
</script>

<h1>A24 movie tier list yooo</h1>
<p>Currently in dev mode</p>

<h3>List:</h3>
{#each data.movieResponses as movieResponse}
	<p>{movieResponse?.title} ({movieResponse.release_date})</p>
{/each}
