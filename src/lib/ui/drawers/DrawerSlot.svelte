<script lang="ts">
	import { DRAWER_IDS } from '$lib/constants/ui.constants';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import UserListDrawer from './UserListDrawer.svelte';

	const drawerStore = getDrawerStore();
</script>

<div>
	{#if $drawerStore.id === DRAWER_IDS.userListDrawer}
		<UserListDrawer />
	{/if}
</div>
