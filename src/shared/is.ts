function IsArray(data: any): boolean {
	if (data === null || typeof data === "undefined") {
		return false;
	}

	return data.constructor === Array;
}

function IsNull(data: any): boolean {
	return (
		typeof data === "undefined" ||
		data === null ||
		(typeof data === "string" && data.length === 0) ||
		(IsArray(data) && data.length === 0)
	);
}

export const is = {
	null: IsNull,
};
