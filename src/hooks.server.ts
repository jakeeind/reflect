import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

function isProtectedRoute(url: string | null) {
	if (!url) return false;
	return url.split('/').includes('(auth)');
}

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		if (isProtectedRoute(event.route.id)) {
			redirect(302, '/login');
		}

		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
