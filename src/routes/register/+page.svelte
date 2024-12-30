<script lang="ts">
	import type { PageData } from './$types';
	import User from 'phosphor-svelte/lib/User';
	import Password from 'phosphor-svelte/lib/Password';
	import AddressBook from 'phosphor-svelte/lib/AddressBook';
	import { superForm } from 'sveltekit-superforms';
	let { data }: { data: PageData } = $props();
	const { form: formData } = superForm(data.form);
</script>

<div class="card mx-auto max-w-xl bg-base-300 shadow-xl">
	<div class="card-body gap-5">
		<h1 class="text-center text-4xl">Register</h1>
		<form method="post">
			<div class="flex flex-col gap-2">
				<span>User Info</span>
				<label class="input input-bordered flex items-center gap-2">
					<User />
					<input
						type="text"
						class="grow"
						name="username"
						placeholder="Username"
						required
						bind:value={$formData.username}
					/>
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<Password />
					<input
						type="password"
						class="grow"
						name="password"
						placeholder="Password"
						required
						bind:value={$formData.password}
					/>
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<AddressBook />
					<input
						type="text"
						class="grow"
						name="roles"
						placeholder="Roles"
						required
						bind:value={$formData.roles}
					/>
				</label>
				<label class="form-control">
					<span class="label">New Year's Resolutions</span>
					<textarea
						class="textarea textarea-bordered h-[250px]"
						placeholder="New Year's Resolutions"
						required
						bind:value={$formData.resolution}
						name="resolution"
					></textarea>
				</label>
				<button class="btn btn-primary mt-5"> Register </button>
			</div>
		</form>
	</div>
</div>
