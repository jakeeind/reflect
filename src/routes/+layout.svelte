<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Reflection</title>
</svelte:head>

<div class="mt-5 px-5">
	{@render children()}
</div>
