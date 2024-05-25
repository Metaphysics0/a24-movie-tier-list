<script>
	import '../app.css';
	import { initializeStores, Modal, Toast, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Toast />
<Modal />
<slot></slot>

<style></style>
