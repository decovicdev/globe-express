<script lang="ts">
	import { Flip } from 'gsap/Flip';
	import { tick } from 'svelte';
	import { gsap } from 'gsap';

	import Pagination from '../components/Pagination.svelte';
	import BookMark from '../assets/icons/BookMark.svelte';
	import Loading from '../components/Loading.svelte';

	import saint_antonien from '$lib/images/saint-antonien.jpg';
	import cappadocia from '$lib/images/cappadocia.jpg';
	import japan_alps from '$lib/images/japan-alps.jpg';
	import los_lances from '$lib/images/los-lances.jpg';
	import yosemite from '$lib/images/yosemite.jpg';
	import morocco from '$lib/images/morocco.jpg';
	import getChildren from '$lib/getChildren';

	gsap.registerPlugin(Flip);

	let currentPage = $state(0);

	let container = $state<HTMLDivElement>();

	let q = $state<gsap.utils.SelectorFunc>({} as gsap.utils.SelectorFunc);

	const locations = $state([
		{
			id: 2,
			location: 'Japan - Alps',
			title: `NAGANO\nPREFECTURE`,
			img: japan_alps
		},
		{
			id: 3,
			location: 'Saharan Desert - Morocco',
			title: `MARRAKECH\nMERZOUGA`,
			img: morocco
		},
		{
			id: 4,
			location: 'Sierra Nevada - United States',
			title: `YOSEMITE\nNATIONAL PARK`,
			img: yosemite
		},
		{
			id: 5,
			location: 'Tarife - Spain',
			title: `LOS LANCES\nBEACH`,
			img: los_lances
		},
		{
			id: 6,
			location: 'Cappadocia - Turkey',
			title: `GÖREME\nVALLEY`,
			img: cappadocia
		},
		{
			id: 1,
			location: 'Switzerland - Alps',
			title: `SAINT\nANTÖNIEN`,
			img: saint_antonien
		}
	]);

	const onPageChange = async (page: number) => {
		const dir = page < currentPage ? 'prev' : 'next';

		const state = Flip.getState(
			dir === 'next'
				? q(`#full_cover, #preview_${locations.at(0)?.id}`)
				: q(`#next_image, #preview_${locations.at(0)?.id}`),
			{
				props: 'borderRadius,objectPosition,objectFit'
			}
		);

		if (page < 0) {
			currentPage = locations.length - 1;
		} else if (page > locations.length - 1) {
			currentPage = 0;
		} else {
			currentPage = page;
		}

		if (dir === 'next') {
			const ele = locations.shift();
			locations.push(ele!);
		} else {
			locations.unshift(locations.pop()!);
		}

		await tick();

		gsap.fromTo(
			q(`#prev_image`),
			{ opacity: 1, scale: 1 },
			{ opacity: 0, scale: 1.3, duration: 0.4 }
		);

		if (dir === 'next') {
			gsap.set(q(`#preview_${locations.at(0)?.id}`).at(0)?.parentElement!, {
				opacity: 1
			});

			gsap.set(q('#next_image'), {
				opacity: 0
			});

			Flip.from(state, {
				absolute: true,
				targets: q(`#full_cover`)
			});

			gsap.fromTo(
				getChildren('#carousel', q),
				{ x: '100%' },
				{
					x: '0%',
					stagger: 0.1,
					delay: 0.3,
					ease: 'power3'
				}
			);
		} else {
			gsap.set(q('#next_image'), {
				opacity: 1,
				top: 0,
				position: 'absolute',
				transform: 'none',
				width: '100%',
				height: '100%',
				borderRadius: 0
			});

			gsap.set(q(`#preview_${locations.at(0)?.id}`).at(0)?.parentElement!, {
				opacity: 0,
				zIndex: 100
			});

			gsap.fromTo(
				getChildren('#carousel', q),
				{ x: '-108%' },
				{
					x: '0%',
					ease: 'power3',
					stagger: -0.1
				}
			);

			Flip.to(state, {
				zIndex: 1,
				delay: 0.4,
				absolute: true,
				borderRadius: 16,
				targets: q(`#next_image`),
				onComplete: () => {
					gsap.to(q('#next_image'), {
						opacity: 0,
						delay: 0.4,
						overwrite: false
					});
					gsap.to(q(`#preview_${locations.at(0)?.id}`).at(0)?.parentElement!, {
						opacity: 1,
						delay: 0.2,
						overwrite: false
					});
				}
			});
		}

		gsap.fromTo(
			getChildren('#active_content', q),
			{ y: '50%', opacity: 0 },
			{
				y: '0%',
				opacity: 1,
				stagger: 0.3,
				clearProps: 'all'
			}
		);
	};

	$effect(() => {
		gsap.defaults({ overwrite: true, ease: 'power1.in' });
		q = gsap.utils.selector(container!);
	});

	$effect(() => {
		gsap.fromTo(
			q('#full_cover'),
			{ scale: 1.5 },
			{
				delay: 1.4,
				scale: 1
			}
		);

		gsap.fromTo(
			getChildren('#carousel', q),
			{ x: '380%' },
			{
				x: '0%',
				delay: 1.6,
				stagger: 0.1,
				duration: 0.8,
				clearProps: 'all'
			}
		);

		gsap.fromTo(
			getChildren('#active_content', q),
			{ y: '50%', opacity: 0 },
			{
				y: '0%',
				delay: 1.7,
				opacity: 1,
				stagger: 0.3,
				clearProps: 'all'
			}
		);
	});
</script>

<Loading />

<div class="relative h-svh w-svw overflow-hidden" bind:this={container}>
	<div class="relative">
		<img
			id="next_image"
			src={locations.at(0)?.img}
			alt={locations.at(0)?.title}
			data-flip-id={`cover-${locations.at(1)?.id}`}
			class="absolute top-0 -z-30 h-svh w-svw object-cover object-[20%] opacity-0 lg:object-center"
		/>

		<img
			id="prev_image"
			src={locations.at(-2)?.img}
			alt={locations.at(-2)?.title}
			class="absolute -z-20 h-svh w-svw object-cover object-[20%] lg:object-center"
		/>

		<img
			id={`full_cover`}
			src={locations.at(-1)?.img}
			alt={locations.at(-1)?.title}
			data-flip-id={`cover-${locations.at(-1)?.id}`}
			class="-z-10 h-svh w-svw object-cover object-[20%] lg:object-center"
		/>
		<div class="overlay" />
	</div>
	<div class="absolute bottom-0 z-50 w-full justify-between gap-y-10 lg:flex">
		<div
			id="active_content"
			class="grid max-w-lg place-items-center gap-2 px-4 pb-10 md:place-items-start lg:gap-4 lg:px-10 lg:pb-36"
		>
			<div class="h-1 w-5 rounded-2xl bg-white" />

			<p id="active_location" class="font-medium md:text-lg">{locations.at(-1)?.location}</p>

			<h2
				id="active_title"
				class="relative text-3xl font-bold !leading-[1.1] md:whitespace-pre md:text-8xl"
			>
				{locations.at(-1)?.title}
			</h2>

			<p
				id="active_description"
				class="relative text-center text-sm md:text-left lg:text-base lg:opacity-70"
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quis quam totam quo aperiam
				obcaecat.
			</p>

			<div id="active_actions" class="relative flex items-center gap-5 overflow-hidden">
				<button class="rounded-full bg-primary p-3">
					<BookMark />
				</button>
				<button
					class="rounded-full border border-white px-8 py-3.5 text-xs font-semibold transition-all duration-700 hover:border-primary hover:bg-primary"
					>DISCOVER LOCATION</button
				>
			</div>
		</div>

		<div class="lg:0 max-w-4xl self-end overflow-hidden pl-4 lg:w-7/12">
			<div class="flex gap-5" id="carousel">
				{#each locations as location, i}
					<div class="relative block flex-shrink-0 rounded-xl shadow-xl shadow-black/25">
						<img
							src={location.img}
							alt={location.title}
							id={`preview_${location.id}`}
							data-flip-id={`cover-${location.id}`}
							class="h-[220px] w-[140px] rounded-2xl object-cover object-[20%] md:h-[320px] md:w-[220px]"
						/>
						<div
							class="absolute bottom-2 grid w-full gap-1 bg-black/5 p-2 text-left backdrop-blur-[1px] md:bottom-5 md:gap-2 md:p-4"
						>
							<div class="h-1 w-5 rounded-2xl bg-white" />
							<p class="text-xs font-medium lg:text-sm">{location.location}</p>
							<h2 class="line-clamp-2 whitespace-pre-line font-bold md:text-2xl">
								{location.title}
							</h2>
						</div>
					</div>
				{/each}
			</div>
			<Pagination totalPages={locations.length} {onPageChange} page={currentPage} />
		</div>
	</div>
</div>

<style lang="postcss">
	.overlay {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 70%);
		z-index: 2;
	}
</style>
