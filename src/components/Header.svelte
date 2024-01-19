<script lang="ts">
	import { Flip } from 'gsap/dist/Flip';
	import { gsap } from 'gsap/dist/gsap';
	import { tick } from 'svelte';

	import SearchIcon from '../assets/icons/SearchIcon.svelte';
	import UserIcon from '../assets/icons/UserIcon.svelte';
	import Menu from '../assets/icons/Menu.svelte';
	import Logo from './Logo.svelte';

	gsap.registerPlugin(Flip);

	let lineElement = $state<HTMLElement>();

	const links = ['Home', 'Holidays', 'Destinations', 'Flights', 'Offers', 'Contacts'];
	let activeIndex = $state(0);

	async function onClick(i: number) {
		const flipState = Flip.getState(lineElement!);

		activeIndex = i;

		await tick();

		Flip.from(flipState, {
			scale: true,
			absolute: true,
			targets: lineElement
		});
	}
</script>

<header class="flex p-5 lg:p-10 items-center justify-between w-full absolute z-50 gap-4 text-white">
	<nav class="flex items-center gap-4 uppercase">
		<Logo />
		<h4 class="font-bold">GLOBE EXPRESS</h4>
	</nav>

	<div class="items-center gap-16 hidden lg:flex">
		<nav id="nav" class="flex items-start gap-6 text-xs">
			{#each links as link, i}
				<button id="button" onclick={() => onClick(i)} class="uppercase font-bold text-sm relative">
					{link}
					{#if i === activeIndex}
						<div
							id="active_line"
							bind:this={lineElement}
							data-flip-id="active_line"
							class="h-1 bg-orange-300 mt-1 w-full rounded-full absolute"
						/>
					{/if}
				</button>
			{/each}
		</nav>

		<div class="flex items-center gap-4">
			<button aria-label="search">
				<SearchIcon />
			</button>

			<button aria-label="user">
				<UserIcon />
			</button>
		</div>
	</div>

	<button class="lg:hidden">
		<Menu />
	</button>
</header>

<style>
</style>
