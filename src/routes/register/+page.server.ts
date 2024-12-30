import { encodeBase32LowerCase } from '@oslojs/encoding';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';
import { userSchema } from '$lib/schemas/user.schema';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(valibot(userSchema));
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const form = await superValidate(request, valibot(userSchema));
		const { data: formData } = form;

		if (!form.valid) {
			console.error('error', form.errors);
			return fail(400, { message: 'Invalid form data', errors: form.errors });
		}

		const userId = generateUserId();
		const passwordHash = await hash(formData.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({
				id: userId,
				username: formData.username,
				passwordHash,
				resolution: formData.resolution,
				roles: formData.roles
			});
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.log('error', e);
			return { form };
		}
		return redirect(302, '/');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
