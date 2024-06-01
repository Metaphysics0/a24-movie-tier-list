<script lang="ts">
	import { DRAWER_IDS } from '$lib/constants/ui.constants';
	import Icon from '@iconify/svelte';
	import { Drawer, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import UserListDrawer from './UserListDrawer.svelte';
	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: DRAWER_IDS.userListDrawer,
		meta: { foo: 'bar', fizz: 'buzz', age: 40 }
	};
	function toggleDrawer() {
		drawerStore.open(drawerSettings);
		console.log('i was clicked');
	}
</script>

<div class="m-3">
	<Icon on:click={toggleDrawer} icon="charm:menu-hamburger" class="cursor-pointer text-3xl" />
</div>

<Drawer>
	{#if $drawerStore.id === DRAWER_IDS.userListDrawer}
		<UserListDrawer />
	{/if}
</Drawer>
