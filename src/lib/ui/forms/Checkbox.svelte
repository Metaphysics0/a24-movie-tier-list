<script lang="ts">
	import { css } from '$lib/utils/css.utils';

	export let name = '';
	export let value = '';
	export let label: string;

	export let cssClasses: string = '';
</script>

<label class={css('flex items-center space-x-2', cssClasses)}>
	<span class="mr-2">
		{label}
	</span>
	<input class="checkbox" type="checkbox" {name} {value} on:change />
</label>
