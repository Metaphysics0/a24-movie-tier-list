<script lang="ts">
	import type { SelectOption } from '$lib/types/form.types';

	export let options: SelectOption[];

	export let defaultValue: string = '';

	export let size: number = 4;
</script>

<select class="select" {size} value={defaultValue}>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
