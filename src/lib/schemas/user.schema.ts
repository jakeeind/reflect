import { object, string, pipe, minLength } from 'valibot';

export const userSchema = object({
	username: pipe(string(), minLength(3)),
	password: pipe(string(), minLength(3)),
	resolution: pipe(string(), minLength(10)),
	roles: pipe(string(), minLength(1))
});

export const loginSchema = object({
	username: pipe(string(), minLength(3)),
	password: pipe(string(), minLength(3))
});
