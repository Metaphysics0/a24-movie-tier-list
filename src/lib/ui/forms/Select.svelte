<script lang="ts">
	import type { SelectOption } from '$lib/types/form.types';
	import { css } from '$lib/utils/css.utils';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let options: SelectOption[];
	export let label: string;
	export let name: string = '';

	export let cssClass: CssClasses = '';

	export let withDefaultEmptyPlaceholderOption: boolean = false;
</script>

<label class="label mr-5">
	<strong class="text-lg">{label}</strong>
	<select {name} class={css('select', cssClass)} on:change>
		{#if withDefaultEmptyPlaceholderOption}
			<option value="" disabled selected>Select an option</option>
		{/if}
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>
