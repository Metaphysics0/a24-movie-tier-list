export function hasAllIntersectingElements(arr1: any[], arr2: any[]) {
	if (arr1.length === arr2.length) {
		return arr1.every((element) => arr2.includes(element));
	}

	const biggerArray = arr1.length > arr2.length ? arr1 : arr2;
	const smallerArray = arr1.length < arr2.length ? arr1 : arr2;

	return smallerArray.every((element) => biggerArray.includes(element));
}
