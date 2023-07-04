import { assert, type Equals } from 'tsafe';
import { z } from 'zod';

export const User = z
	.object({
		username: z.string().min(3).max(20),
		email: z.string().email(),
		favoriteNumber: z.number().int().positive()
	})
	.strict();
export const UserParse = z.object({
	username: z.string().catch('Invalid Username'),
	email: z.string().catch('invalid@email.invalid'), // Should be guaranteed not to exist by https://www.rfc-editor.org/rfc/rfc6761
	favoriteNumber: z.number().catch(NaN)
});

assert<Equals<z.infer<typeof User>, z.infer<typeof UserParse>>>();

export type User = z.infer<typeof User>;
