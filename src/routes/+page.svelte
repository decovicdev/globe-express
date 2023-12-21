<script lang="ts">
	import { animate } from 'motion';

	import Loading from '../components/Loading.svelte';
	import { onMount } from 'svelte';

	// let div: HTMLDivElement;

	// onMount(() => {
	// 	animate(div, { transform: ['scale(1.5)', 'scale(1)'] }, { duration: 1 });
	// });
</script>

<Loading />

<div>
	<img src="/images/photo-1508789454646-bef72439f197.avif" alt="" />
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
		box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.5);
		position: relative;
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	div::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
		-webkit-mask-image: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0) 40%,
			rgba(0, 0, 0, 0.5) 80%
		);
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.5) 80%);
		/* filter: blur(10px); Adjust the blur radius as needed */
		z-index: 33;
	}
</style>
