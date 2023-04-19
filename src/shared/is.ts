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

function IsDate(data: any): boolean {
	return data instanceof Date;
}

function IsDateString(data: any): boolean {
	return !IsNull(data) && data.indexOf("/Date(") === 0;
}

function IsJsonString(data: any): boolean {
	try {
		JSON.parse(data);

		return true;
	} catch {
		return false;
	}
}

function IsNumeric(data: any): boolean {
	return (
		typeof data !== "undefined" &&
		data !== null &&
		data.toString().length > 0 &&
		data.toString().replace(/[\d.]+/gi, "").length === 0 &&
		!isNaN(data)
	);
}

function IsString(data: any): boolean {
	return !IsNull(data) && typeof data === "string";
}

function IsValidHttpUrl(data: any): boolean {
	// Copyright (c) 2010-2013 Diego Perini, MIT licensed
	// https://gist.github.com/dperini/729294
	// see also https://mathiasbynens.be/demo/url-regex
	// modified to allow protocol-relative URLs
	// and modified again to remove ftp (Jordan)
	if (IsNull(data)) {
		return false;
	}
	const validUrlRegex =
		/^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

	return validUrlRegex.test(data);
}

function IsFunction(data: any): boolean {
	return !IsNull(data) && data instanceof Function;
}

const IsReactRoute = (uri: string): boolean => {
	const reactRouteRegex = /[a-z]{1,4}-[a-z]{1,4}\/r\/[ts]\//gi;

	return !IsNull(uri) && reactRouteRegex.test(uri);
};

const IsArrayDifferent = (array1: any[], array2: any[], useDeepComparison = false): boolean => {
	const isArray1Null = IsNull(array1);
	const isArray2Null = IsNull(array2);

	if (isArray1Null && isArray2Null) {
		return false;
	}

	const shallowResult =
		isArray1Null !== isArray2Null || (!isArray1Null && !isArray2Null && array1.length !== array2.length);

	if (shallowResult) {
		return true;
	}

	if (!useDeepComparison) {
		return array1 !== array2;
	}

	return array1.some((array1Item, index) => {
		return array2[index] !== array1Item;
	});
};

const IsInArray = (array: any[], element: any): boolean => {
	return !IsNull(array) && array.indexOf(element) !== -1;
};

const IsShallowEqual = (obj1: any, obj2: any, ignorePrivateProperties: boolean = false): boolean => {
	if (is.null(obj1) && is.null(obj2)) {
		return true;
	} else if (is.null(obj1) !== is.null(obj2)) {
		return false;
	} else if (typeof obj1 !== "object" && typeof obj2 !== "object") {
		return obj1 === obj2;
	}

	for (const p in obj1) {
		if (ignorePrivateProperties && p.startsWith("_")) {
			continue;
		}
		if (obj1.hasOwnProperty(p)) {
			if (obj1[p] !== obj2[p]) {
				return false;
			}
		}
	}
	for (const p in obj2) {
		if (ignorePrivateProperties && p.startsWith("_")) {
			continue;
		}
		if (obj2.hasOwnProperty(p)) {
			if (obj1[p] !== obj2[p]) {
				return false;
			}
		}
	}

	return true;
};

const IsAnythingDifferent = (props: any, nextProps: any, ...keys: string[]): boolean => {
	return keys.some(key => {
		if (IsArray(props[key])) {
			return IsArrayDifferent(props[key], nextProps[key], true);
		}

		return props[key] !== nextProps[key];
	});
};

export const is = {
	array: IsArray,
	arrayDifferent: IsArrayDifferent,
	null: IsNull,
	date: IsDate,
	dateString: IsDateString,
	numeric: IsNumeric,
	string: IsString,
	validHttpUrl: IsValidHttpUrl,
	function: IsFunction,
	reactRoute: IsReactRoute,
	jsonString: IsJsonString,
	inArray: IsInArray,
	shallowEqual: IsShallowEqual,
	anythingDifferent: IsAnythingDifferent,
};
