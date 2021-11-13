"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var metrics_controller_1 = require("../controllers/metrics.controller");
var metrics_schema_1 = require("../schema/metrics.schema");
var readings_controller_1 = require("../controllers/readings.controller");
var readings_schema_1 = require("../schema/readings.schema");
var validation_1 = __importDefault(require("../middleware/validation"));
var routes = function (app) {
    app.get('/', function (req, res) {
        return res.json('Server Running');
    });
    app.post('/api/v1/metrics', (0, validation_1.default)((0, metrics_schema_1.createMetricsSchema)()), metrics_controller_1.createMetrics);
    app.get('/api/v1/metrics', metrics_controller_1.getMetrics);
    app.post('/api/v1/readings', (0, validation_1.default)((0, readings_schema_1.createReadingsSchema)()), readings_controller_1.createReadings);
    app.get('/api/v1/readings', (0, validation_1.default)((0, readings_schema_1.getReadingsSchema)()), readings_controller_1.getReadings);
};
exports.default = routes;
