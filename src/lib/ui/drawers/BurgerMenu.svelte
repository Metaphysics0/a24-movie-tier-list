<script lang="ts">
	import { DRAWER_IDS } from '$lib/constants/ui.constants';
	import Icon from '@iconify/svelte';
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: DRAWER_IDS.userListDrawer,
		meta: { foo: 'bar', fizz: 'buzz', age: 40 },
		width: 'w-96',
		position: 'right'
	};

	function toggleDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<button class="w- m-3" on:click={toggleDrawer}>
	<Icon icon="charm:menu-hamburger" class="cursor-pointer text-3xl" />
</button>
