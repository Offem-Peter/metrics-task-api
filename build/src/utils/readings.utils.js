"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadingsWithinRange = exports.getLastUpdatedAt = void 0;
var moment_1 = __importDefault(require("moment"));
function getLastUpdatedAt(readings) {
    if (!readings.length) {
        return 'No data to show';
    }
    var currentDateTime = (0, moment_1.default)().utc();
    var lastTimestampInReadings = readings[readings.length - 1].timestamp;
    var diffInTimestamps = (0, moment_1.default)(lastTimestampInReadings)
        .utc()
        .from(currentDateTime);
    return diffInTimestamps;
}
exports.getLastUpdatedAt = getLastUpdatedAt;
function getReadingsWithinRange(readings, range) {
    var timeRange = (0, moment_1.default)().utc().subtract(1, range);
    var newReadings = [];
    newReadings = readings.filter(function (reading) {
        //get timestamp in moment for each reading
        var timestamp = (0, moment_1.default)(reading.timestamp).utc();
        //checks if timestamp is not outside time range
        return timeRange.isBefore(timestamp);
    });
    return newReadings;
}
exports.getReadingsWithinRange = getReadingsWithinRange;
