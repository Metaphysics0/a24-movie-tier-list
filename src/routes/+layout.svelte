<script>
	import '../app.css';
	import { initializeStores, Modal, Toast, Drawer, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Drawer />
<Toast />
<Modal />
<slot></slot>

<style></style>
