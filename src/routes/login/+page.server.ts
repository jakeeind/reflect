import type { PageServerLoad } from './$types';
import { loginSchema } from '$lib/schemas/user.schema';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';

export const load = (async () => {
	const form = await superValidate(valibot(loginSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, valibot(loginSchema));
		const formData = form.data;

		// query users from db
		const users = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, formData.username));

		const existingUser = users.at(0);
		if (!existingUser) {
			return message(form, 'Incorrect username or password');
		}

		// check password
		const validPassword = await verify(existingUser.passwordHash, formData.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return message(form, 'Incorrect username or password');
		}

		// create session
		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	}
};
