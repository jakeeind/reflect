import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, ne } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const userId = String(event.locals.user?.id);
	const users = await db
		.select()
		.from(table.user)
		.leftJoin(table.reflection, eq(table.reflection.createdBy, userId))
		.where(ne(table.user.id, userId));

	return json(users);
};
