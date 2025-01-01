import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { minLength, object, pipe, string } from 'valibot';
import { valibot } from 'sveltekit-superforms/adapters';

const reflectionForm = object({
	reflection: pipe(string(), minLength(3))
});

export const load = (async (event) => {
	const form = await superValidate(valibot(reflectionForm));

	const userId = event.params.user_id;
	const user = (await db.select().from(table.user).where(eq(table.user.id, userId))).at(0);

	return { user, form };
}) satisfies PageServerLoad;
