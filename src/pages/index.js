"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPage = void 0;
var header_1 = require("../components/header");
var config_json_1 = require("../config.json");
var config_json_2 = require("../config/config.json");
var is_1 = require("../shared/is");
var variables_1 = require("../variables");
var IndexPage = function (props) {
    var icon = props.icon, title = props.title;
    var mySerices = (is_1.is.null(config_json_1.default) ? config_json_2.default : config_json_1.default);
    var headerClassName = "p-4";
    if (variables_1.SHOWHEADERTOP) {
        headerClassName += " w-full";
    }
    else {
        headerClassName += " w-full xl:w-auto xl:max-w-xs xl:min-h-screen";
    }
    if (variables_1.SHOWHEADERLINE) {
        headerClassName += "border-0 border-solid border-gray-300 dark:border-gray-700";
        if (variables_1.SHOWHEADERTOP) {
            headerClassName += " border-b";
        }
        else {
            headerClassName += " border-b xl:border-r xl:border-b-0";
        }
    }
    var pageWrapperClassName = "min-h-screen flex flex-col  max-w-screen-2xl mx-auto";
    if (!variables_1.SHOWHEADERTOP) {
        pageWrapperClassName += " xl:flex-row";
    }
    var serviceCatalogListWrapperClassName = "p-4 flex-grow";
    if (!variables_1.SHOWHEADERTOP) {
        serviceCatalogListWrapperClassName += " min-h-screen";
    }
    return "\n\t\t<div className=\"min-h-screen\">\n\t\t\t<div className=".concat(pageWrapperClassName, ">\n\t\t\t\t").concat(variables_1.SHOWHEADER &&
        "\n\t\t\t\t\t<div className=".concat(headerClassName, ">\n\t\t\t\t\t").concat((0, header_1.Header)({ icon: icon, title: title }), "\n\t\t\t\t\t</div>\n\t\t\t\t"), "\n\t\t\t\t<div className=").concat(serviceCatalogListWrapperClassName, ">\n\t\t\t\t\t<ServiceCatalogList catalogs={mySerices} />\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t");
};
exports.IndexPage = IndexPage;
