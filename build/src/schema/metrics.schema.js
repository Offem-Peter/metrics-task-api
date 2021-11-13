"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetricsSchema = void 0;
var yup_1 = require("yup");
var createMetricsSchema = function () {
    return (0, yup_1.object)({
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().required("body 'name' is required"),
        }),
    });
};
exports.createMetricsSchema = createMetricsSchema;
