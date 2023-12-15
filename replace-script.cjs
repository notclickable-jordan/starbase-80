module.exports = {
	files: "./dist/index.html",
	from: /<script[^>]+><\/script>/gi,
	to: "",
};
