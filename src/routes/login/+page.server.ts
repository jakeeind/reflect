import type { PageServerLoad } from './$types';
import { loginSchema } from '$lib/schemas/user.schema';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(valibot(loginSchema));
	return { form };
}) satisfies PageServerLoad;
