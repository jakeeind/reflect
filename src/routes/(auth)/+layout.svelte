<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import UserCard from '$lib/components/UserCard.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="flex flex-row gap-5">
	{#if data.user}
		<UserCard user={data.user} />
	{/if}
	{@render children()}
</div>
