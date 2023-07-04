import { FIREBASE_PRIVATE_KEY } from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	console.log(FIREBASE_PRIVATE_KEY);
	return {};
}) satisfies PageServerLoad;
