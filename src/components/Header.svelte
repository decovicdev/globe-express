<script lang="ts">
	import { Flip } from 'gsap/dist/Flip';
	import { gsap } from 'gsap/dist/gsap';
	import { tick } from 'svelte';

	import SearchIcon from '../assets/icons/SearchIcon.svelte';
	import UserIcon from '../assets/icons/UserIcon.svelte';
	import Menu from '../assets/icons/Menu.svelte';
	import Logo from './Logo.svelte';

	gsap.registerPlugin(Flip);

	let header = $state<HTMLElement>();
	let lineElement = $state<HTMLElement>();

	let activeIndex = $state(0);
	const links = ['Home', 'Holidays', 'Destinations', 'Flights', 'Offers', 'Contacts'];

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

	$effect(() => {
		gsap.fromTo(
			header!,
			{
				y: -200
			},
			{
				y: 0,
				duration: 1,
				delay: 1.8
			}
		);
	});
</script>

<header
	bind:this={header}
	class="absolute z-50 flex w-full items-center justify-between gap-4 p-5 text-white lg:p-10"
>
	<nav class="flex items-center gap-4 uppercase">
		<Logo />
		<h4 class="font-bold">GLOBE EXPRESS</h4>
	</nav>

	<div class="hidden items-center gap-16 lg:flex">
		<nav id="nav" class="flex items-start gap-6 text-xs">
			{#each links as link, i}
				<button
					id="button"
					on:click={() => onClick(i)}
					class="relative text-xs font-bold uppercase"
				>
					{link}
					{#if i === activeIndex}
						<div
							id="active_line"
							bind:this={lineElement}
							data-flip-id="active_line"
							class="absolute mt-1 h-1 w-full rounded-full bg-primary"
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
