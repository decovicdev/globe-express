<script lang="ts">
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	let loader: HTMLDivElement;

	onMount(() => {
		animate(loader, { left: [0, '100%'] }, { duration: 1 });
	});
</script>

<div bind:this={loader} />

<style>
	div {
		width: 100vw;
		height: 100vh;

		top: 0;
		position: fixed;
		background-color: wheat;

		display: grid;
		place-content: center;
	}
</style>
