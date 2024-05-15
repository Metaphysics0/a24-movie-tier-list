<script lang="ts">
	import type { SelectOption } from '$lib/types/form.types';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let options: SelectOption[];
	export let name: string = '';
	export let value;

	export let cssClass: CssClasses = '';
</script>

<select {name} {value} class={cssClass} on:change>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
