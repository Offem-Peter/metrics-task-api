"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageReadingsForPeriod = void 0;
var moment_1 = __importDefault(require("moment"));
var _ = require('lodash');
var dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
function getAverageReadingsForPeriod(readings, period) {
    var _a = roundDownReadingsTime(readings, period), roundDownReadingsList = _a.roundDownReadingsList, uniqueDateTimeList = _a.uniqueDateTimeList;
    var avgList = calcAverage(roundDownReadingsList, uniqueDateTimeList);
    return avgList;
}
exports.getAverageReadingsForPeriod = getAverageReadingsForPeriod;
//helper functions
function roundDownReadingsTime(readings, period) {
    var uniqueDateTimeList = [];
    var roundDownReadingsList = [];
    //for each reading, get the nearest timestamp in 'period: second,minute,hour,...'
    readings.forEach(function (_a) {
        var timestamp = _a.timestamp, value = _a.value;
        var timestampMoment = (0, moment_1.default)(timestamp).utc();
        var roundDown = timestampMoment.startOf(period).format(dateTimeFormat);
        //adds rounded-down timestamp to list, there might be many duplicates of roundedDown timestamps
        uniqueDateTimeList.push(roundDown);
        //might contain multiple keys with the same time-rounded-down
        roundDownReadingsList.push({
            timeRoundedDown: roundDown,
            value: value,
        });
    });
    //Removes duplicates in dates
    uniqueDateTimeList = uniqueDateTimeList.filter(function (element, index) {
        return uniqueDateTimeList.indexOf(element) === index;
    });
    return {
        roundDownReadingsList: roundDownReadingsList,
        uniqueDateTimeList: uniqueDateTimeList,
    };
}
function calcAverage(roundDownReadingsList, uniqueDateTimeList) {
    var avgArray = [];
    uniqueDateTimeList.forEach(function (datetime) {
        //This sums all the values with the same timestamp
        var sum = _.sumBy(roundDownReadingsList, function (o) {
            return o.timeRoundedDown === datetime ? o.value : 0;
        });
        ////This counts all the values with the same timestamp
        var count = roundDownReadingsList.reduce(function (counter, _a) {
            var timeRoundedDown = _a.timeRoundedDown;
            return timeRoundedDown === datetime ? (counter += 1) : counter;
        }, 0);
        var average = +(sum / count).toFixed(2); //average to 2dp
        avgArray.push({
            timestamp: datetime,
            average: average,
        });
    });
    return avgArray;
}
