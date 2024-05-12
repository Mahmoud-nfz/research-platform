export function getHref(
	path: string,
	searchParams: Record<string, string | undefined | null>
) {
	const urlSearchParams = new URLSearchParams();
	Object.entries(searchParams).forEach(([key, value]) => {
		if (value) urlSearchParams.set(key, value);
	});
	return path + '?' + urlSearchParams.toString();
}
