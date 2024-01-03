<script lang="ts">
	import ChevronLeft from '../assets/icons/ChevronLeft.svelte';
	import ChevronRight from '../assets/icons/ChevronRight.svelte';

	interface PropTypes {
		page: number;
		onPageChange: (page: number) => void;
	}

	let { page = 0, onPageChange } = $props<PropTypes>();

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

	<hr class="border border-white/50 flex-1" />

	<p class="text-6xl">
		<!-- 01 -->
		{(page + 1).toString().padStart(2, '0')}
	</p>
</div>
