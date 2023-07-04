import { FIREBASE_PRIVATE_KEY } from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	console.log(JSON.parse(FIREBASE_PRIVATE_KEY));
	return {};
}) satisfies PageServerLoad;
