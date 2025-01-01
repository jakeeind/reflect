import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	resolution: text('resolution').notNull(),
	roles: text('roles').notNull()
});

export const reflection = sqliteTable('reflection', {
	id: text('id').primaryKey(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	description: text('description').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
