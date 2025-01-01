<script lang="ts">
	let {
		user
	}: {
		user: {
			id: string;
			username: string;
      roles: string;
		};
	} = $props();
</script>

<div class="card shadow-lg bg-base-300 min-w-40">
	<div class="card-body gap-2 p-5">
		<h3 class="text-xl font-bold">{user.username}</h3>
    <p class="text-xs">Roles: {user.roles}</p>
		<div class="flex mt-5 w-full">
			<a href="/{user.id}" class="w-full btn btn-primary"> Reflex </a>
		</div>
	</div>
</div>
