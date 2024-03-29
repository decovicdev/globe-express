<script lang="ts">
	import gsap from 'gsap';
	import ChevronLeft from '../assets/icons/ChevronLeft.svelte';
	import ChevronRight from '../assets/icons/ChevronRight.svelte';

	interface PropTypes {
		page: number;
		totalPages: number;
		autoplayTL?: GSAPTimeline;
		onPageChange: (page: number) => void;
	}

	let container = $state<HTMLElement>();

	let { page = 0, onPageChange, totalPages, autoplayTL } = $props<PropTypes>();

	const handleKeyboard = (e: KeyboardEvent) => {
		if (autoplayTL?.isActive()) {
			autoplayTL?.restart(true);
		}

		if (e.key === 'ArrowLeft') {
			onPageChange(page - 1);
		} else if (e.key === 'ArrowRight') {
			onPageChange(page + 1);
		}
	};

	$effect(() => {
		window.addEventListener('keyup', handleKeyboard);

		return () => window.removeEventListener('keyup', handleKeyboard);
	});

	$effect(() => {
		gsap.fromTo(container!, { y: 300 }, { y: 0, duration: 1, delay: 1.6 });
	});
</script>

<div bind:this={container} class="my-8 mr-4 flex items-center gap-5 lg:mr-10">
	<button
		class="grid aspect-square h-11 place-content-center rounded-full border border-white/50 lg:h-16"
		on:click={() => onPageChange(page - 1)}
	>
		<ChevronLeft />
	</button>
	<button
		class="grid aspect-square h-11 place-content-center rounded-full border border-white/50 lg:h-16"
		on:click={() => onPageChange(page + 1)}
	>
		<ChevronRight />
	</button>

	<div
		class="line relative flex-1 border border-white/50"
		style="--data-percent: {page / totalPages}"
	/>

	<div class="w-max overflow-hidden">
		<h2 id="page_number" class="text-4xl lg:text-5xl">
			{(page + 1).toString().padStart(2, '0')}
		</h2>
	</div>
</div>

<style>
	.line::after {
		content: '';
		position: absolute;
		border-radius: 8px;
		top: 1/2;
		left: 0;
		transform: translateY(-50%);
		transition: width 0.5s;
		height: 2px;
		width: calc(var(--data-percent) * 100%);
		background-color: theme('colors.primary');
	}
</style>
