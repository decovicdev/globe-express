<script lang="ts">
	let { ...props } = $props();
</script>

<div class="flex gap-5" {...props}>
	<slot />
	<slot />
</div>
