import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const userId = String(event.locals.user?.id);
	const users = await db.select().from(table.user).where(ne(table.user.id, userId));
	return { users };
}) satisfies PageServerLoad;
