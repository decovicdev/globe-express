<script lang="ts">
	import { Flip } from 'gsap/dist/Flip';
	import { gsap } from 'gsap/dist/gsap';
	import { tick } from 'svelte';

	import SearchIcon from '../assets/icons/SearchIcon.svelte';
	import UserIcon from '../assets/icons/UserIcon.svelte';
	import Logo from './Logo.svelte';
	import Menu from '../assets/icons/Menu.svelte';

	let nav = $state<HTMLElement>();
	let button = $state<HTMLElement>();
	let flipState = $state<Flip.FlipState>();

	const links = ['Home', 'Holidays', 'Destinations', 'Flights', 'Offers', 'Contacts'];
	let activeIndex = $state(0);

	// const state = Flip.getState(nav!);

	function onClick(i: number) {
		flipState = Flip.getState(nav!);
		activeIndex = i;

		// await tick();
	}

	$effect(() => {
		gsap.registerPlugin(Flip);

		if (flipState) {
			Flip.from(flipState, {
				// target: nav,
				duration: 1,

				target: '#line33',
				scale: true,
				ease: 'power4.inOut',
				absolute: true
			});
		}
	});
</script>

<header class="flex p-5 lg:p-10 items-center justify-between w-full absolute z-50 gap-4 text-white">
	<nav class="flex items-center gap-4 uppercase">
		<Logo />
		<h4 class="font-bold">GLOBE EXPRESS</h4>
	</nav>

	<div class="items-center gap-16 hidden lg:flex">
		<nav class="flex items-start gap-6 text-xs" bind:this={nav}>
			{#each links as link, i}
				<button bind:this={button} onclick={() => onClick(i)} class="uppercase font-bold text-sm">
					{link}
					{#if i === activeIndex}
						<div id="line33" class="h-1 bg-orange-300 mt-1 rounded-full" />
					{/if}
				</button>
			{/each}
		</nav>

		<div class="flex items-center gap-8">
			<SearchIcon />
			<UserIcon />
		</div>
	</div>

	<button class="lg:hidden">
		<Menu />
	</button>
</header>

<style>
</style>
