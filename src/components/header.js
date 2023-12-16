"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var is_1 = require("../shared/is");
var Header = function (_a) {
    var icon = _a.icon, title = _a.title;
    return "\n\t\t<div className=\"p-2 xl:p-4 flex flex-nowrap justify-center items-center gap-2 xl:flex-wrap\">\n\t\t\t".concat(!is_1.is.null(icon) && "<img src={icon} alt={title} className=\"inline-block w-16 h-16\" />", "\n\t\t\t<h1>{title}</h1>\n\t\t</div>\n\t");
};
exports.Header = Header;
