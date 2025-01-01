<script lang="ts">
	import Logout from 'phosphor-svelte/lib/SignOut';
	let {
		user
	}: {
		user: {
			username: string;
			resolution: string;
		};
	} = $props();
</script>

<div class="card mb-5 bg-base-300 shadow-xl max-w-md max-h-[80vh] overflow-y-auto">
	<div class="card-body">
		<h1 class="text-xl font-bold capitalize">{user.username}</h1>
		<div class="pt-4">
			<h2 class="mb-2 text-lg font-bold">My New Year's Resolutions</h2>
			<p>
				{user.resolution}
			</p>
		</div>
	</div>
  <div class="flex justify-end sticky bottom-0 bg-base-300 px-4 py-2 border-t border-base-200">
    <form action="/logout" method="post">
      <button class="btn btn-primary capitalize">
        <Logout class="size-5" />
        logout
      </button>
    </form>
  </div>
</div>
