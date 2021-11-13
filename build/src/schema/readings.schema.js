"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadingsSchema = exports.createReadingsSchema = void 0;
var yup_1 = require("yup");
var createReadingsSchema = function () {
    return (0, yup_1.object)({
        body: (0, yup_1.object)({
            value: (0, yup_1.number)().required("body 'value' is required"),
            metricId: (0, yup_1.string)().required("body 'metricId' is required"),
        }),
    });
};
exports.createReadingsSchema = createReadingsSchema;
var getReadingsSchema = function () {
    return (0, yup_1.object)({
        query: (0, yup_1.object)({
            metricId: (0, yup_1.string)().required("query 'metricId' is required"),
            range: (0, yup_1.string)().required("query 'range' is required"),
            period: (0, yup_1.string)().required("query 'period' is required"),
        }),
    });
};
exports.getReadingsSchema = getReadingsSchema;
