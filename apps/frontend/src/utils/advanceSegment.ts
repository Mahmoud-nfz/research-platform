export function advancePath(currentPath: string, fullPath: string): string {
	const currentSegments = currentPath.split('/').filter(Boolean);
	const fullSegments = fullPath.split('/').filter(Boolean);

	const nextSegmentIndex = currentSegments.length;
	if (nextSegmentIndex < fullSegments.length) {
		return '/' + fullSegments.slice(0, nextSegmentIndex + 1).join('/');
	} else {
		return currentPath;
	}
}
