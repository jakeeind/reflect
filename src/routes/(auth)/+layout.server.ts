import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const userId = String(event.locals.user?.id);
	const user = (await db.select().from(table.user).where(eq(table.user.id, userId))).at(0);
	return { user };
}) satisfies LayoutServerLoad;
