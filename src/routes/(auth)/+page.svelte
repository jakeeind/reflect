<script lang="ts">
	import ColleagueCard from '$lib/components/ColleagueCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h2 class="text-2xl font-semibold mb-4">Colleagues</h2>
	<div class="grid grid-cols-3 gap-3">
		{#each data.users as user}
			<ColleagueCard {user} />
		{/each}
	</div>
</div>
