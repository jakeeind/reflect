<script lang="ts">
	import type { PageData } from './$types';
	import User from 'phosphor-svelte/lib/User';
	import Password from 'phosphor-svelte/lib/Password';
	import AddressBook from 'phosphor-svelte/lib/AddressBook';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { userSchema } from '$lib/schemas/user.schema';
	let { data }: { data: PageData } = $props();
	const form = superForm(data.form, {
    validators: valibotClient(userSchema),
  });
  const { form: formData, errors, enhance } = form;
</script>

<div class="card mx-auto max-w-xl bg-base-300 shadow-xl">
	<div class="card-body gap-5">
		<h1 class="text-center text-4xl">Register</h1>
		<form method="post" use:enhance>
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
						bind:value={$formData.resolution}
						name="resolution"
					></textarea>
					<span class="label text-error">
						{#if $errors.resolution}
							{$errors.resolution}
						{/if}
					</span>
				</label>
				<button class="btn btn-primary mt-5"> Register </button>
			</div>
		</form>
	</div>
</div>
