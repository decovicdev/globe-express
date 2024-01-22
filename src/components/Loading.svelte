<script lang="ts">
	import { gsap } from 'gsap';

	let loader = $state<HTMLDivElement>();

	$effect(() => {
		const timeline = gsap.timeline();

		if (loader) {
			timeline
				.fromTo(loader, { x: '-100%' }, { x: '0%', ease: 'power1.in', duration: 1 })
				.to(loader, { x: '100%', ease: 'power1', duration: 1, delay: 0.3 });
		}
	});
</script>

<div class="loader" bind:this={loader} />

<style>
	.loader {
		width: 100vw;
		height: 100vh;
		top: 0;
		z-index: 999;
		position: fixed;
		background-color: whitesmoke;
	}
</style>
