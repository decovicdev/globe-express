<script lang="ts">
	import ChevronLeft from '../assets/icons/ChevronLeft.svelte';
	import ChevronRight from '../assets/icons/ChevronRight.svelte';

	interface PropTypes {
		page: number;
		totalPages: number;
		onPageChange: (page: number) => void;
	}

	let { page = 0, onPageChange, totalPages } = $props<PropTypes>();

	$effect(() => {
		const handleKeyboard = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				onPageChange(page - 1);
				e.preventDefault();
			}
			if (e.key === 'ArrowRight') {
				onPageChange(page + 1);
				e.preventDefault();
			}
		};

		window.addEventListener('keyup', handleKeyboard);

		return () => window.removeEventListener('keyup', handleKeyboard);
	});
</script>

<div class="flex gap-5 items-center my-8 mr-10">
	<button
		class="border border-white/50 rounded-full aspect-square h-16 grid place-content-center"
		on:click={() => onPageChange(page - 1)}
	>
		<ChevronLeft />
	</button>
	<button
		class="border border-white/50 rounded-full aspect-square h-16 grid place-content-center"
		on:click={() => onPageChange(page + 1)}
	>
		<ChevronRight />
	</button>

	<div
		class="line border border-white/50 flex-1 relative"
		style="--data-percent: {page / totalPages}"
	/>

	<p class="text-6xl">
		{(page + 1).toString().padStart(2, '0')}
	</p>
</div>

<style scoped>
	.line::after {
		content: '';
		position: absolute;
		border-radius: 8px;
		top: 1/2;
		left: 0;
		transform: translateY(-50%);
		transition: width 0.3s;
		width: calc(var(--data-percent) * 100%);
		height: 2px;
		background-color: orange;
	}
</style>
