<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Import Star Resolution</title>
</svelte:head>

<div class="mx-auto mt-5 max-w-6xl">
	{@render children()}
</div>
