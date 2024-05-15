<script lang="ts">
	export let name = '';
	export let value = '';
</script>

<input type="checkbox" {name} {value} on:change />
