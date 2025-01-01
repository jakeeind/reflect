<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms';
	import Submit from 'phosphor-svelte/lib/PaperPlaneRight';
	import type { PageData } from './$types';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form);
	const { form: formData } = form;
</script>

<div class="flex w-full flex-col gap-4">
	<div>
		<h3 class="text-xl font-bold capitalize">
			{data.user?.username}
		</h3>
		<p class="text-xs text-gray-500">
			{data.user?.roles}
		</p>
		<form method="post" use:form.enhance>
			<label class="form-control">
				<div class="label">
					<span class="label-text"
						>Your reflect to <span class="capitalize">{data.user?.username}</span></span
					>
				</div>
				<textarea class="textarea textarea-bordered h-[300px]" placeholder="Bio"></textarea>
			</label>
			<div class="mt-3 flex justify-end">
				<button class="btn btn-primary">
					Submit
					<Submit class="size-4" />
				</button>
			</div>
		</form>
	</div>
</div>
