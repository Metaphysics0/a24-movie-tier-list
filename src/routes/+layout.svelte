<script>
	import '../app.css';
	import { initializeStores, Modal, Toast, Drawer, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import Header from '$lib/ui/typography/Header.svelte';
	import ToggleDrawerIcon from '$lib/ui/drawers/BurgerMenu.svelte';
	import DrawerIndex from '$lib/ui/drawers/DrawerSlot.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Drawer>
	<DrawerIndex />
</Drawer>
<Toast />
<Modal />

<div class="flex">
	<div />
	<Header />
	<ToggleDrawerIcon />
</div>
<slot></slot>

<style></style>
