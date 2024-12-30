<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas/user.schema';
	import User from 'phosphor-svelte/lib/User';
	import Password from 'phosphor-svelte/lib/Password';

	let { data }: { data: PageData } = $props();
	const form = superForm(data.form, {
		validators: valibotClient(loginSchema)
	});

	const { form: formData, enhance, errors } = form;
</script>

<div class="card mx-auto max-w-xl bg-base-300">
	<div class="card-body">
		<h1 class="mb-3 text-center text-xl">Login</h1>
		<form method="post" use:enhance class="flex flex-col gap-2">
			<div class="form-control">
				<label class="input input-bordered flex items-center gap-2">
					<User />
					<input type="text" class="grow" placeholder="Username" bind:value={$formData.username} name="username" />
				</label>
				{#if $errors.username}
					<p class="text-error">{$errors.username}</p>
				{/if}
			</div>
			<div class="form-control">
				<label class="input input-bordered flex items-center gap-2">
					<Password />
					<input
						type="password"
						class="grow"
						placeholder="Password"
						bind:value={$formData.password}
            name="password"
					/>
				</label>
				{#if $errors.password}
					<p class="text-error">{$errors.password}</p>
				{/if}
			</div>
			<button class="btn btn-primary">Login</button>
		</form>
	</div>
</div>
