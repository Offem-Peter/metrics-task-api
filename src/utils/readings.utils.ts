import moment from 'moment';
var _ = require('lodash');

const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';

export function getLastUpdated(readings: any[]): string {
	if (!readings.length) {
		return 'No data to show';
	}

	const currentDateTime = moment().utc();
	const lastTimestamp = readings[readings.length - 1].timestamp;
	const lastTimestampMoment = moment(lastTimestamp).utc().from(currentDateTime);

	return lastTimestampMoment;
}



export function filterReadings(readings: any[], range: any): any[] {
	const timeRange = moment().utc().subtract(1, range);
	var newReadings: any[] = [];

	//removes date that are outside range
	newReadings = readings.filter((reading) => {
		const timestamp = moment(reading.timestamp).utc();

		return timeRange.isBefore(timestamp);
	});

	return newReadings;
}

interface PERIOD {
	minute: string;
	hour: string;
	day: string;
}

const period: PERIOD = {
	minute: 'minute',
	hour: 'hour',
	day: 'day',
};

function roundDownReadingsTime(readings: any[], period: any) {
	var roundDownReadings: any[] = [];
	var uniqueDateTime: any = [];

	//for each database timestamp, get the nearest time in 'period'
	readings.forEach((reading) => {
		var timestamp = moment(reading.timestamp).utc();
		var roundDown = timestamp.startOf(period).format(dateTimeFormat);

		//adds rounded-down timestamp to list, there might be duplicates
		uniqueDateTime.push(roundDown);

		roundDownReadings.push({
			timeRoundedDown: roundDown,
			value: reading.value,
		});
	});

	//Removes duplicates in dates
	uniqueDateTime = uniqueDateTime.filter((element: any, index: any) => {
		return uniqueDateTime.indexOf(element) === index;
	});

	return {
		roundDownReadings,
		uniqueDateTime,
	};
}

function calcAverage(roundDownReadings: any, uniqueDateTime: any) {
	const avgArray: any[] = [];

	uniqueDateTime.forEach((timestamp: any) => {
		//This sums all the values with the same timestamp
		const sum = _.sumBy(roundDownReadings, (o: any) => {
			return o.timeRoundedDown === timestamp ? o.value : 0;
		});

		////This counts all the values with the same timestamp
		const count = roundDownReadings.reduce(
			(counter: any, { timeRoundedDown }: any) => {
				return timeRoundedDown === timestamp ? (counter += 1) : counter;
			},
			0
		);

		const average = +(sum / count).toFixed(2); //get average to 2dp

		avgArray.push({
			timestamp: timestamp,
			average: average,
		});
	});

	return avgArray;
}

export function calcAverageMinute(readings: any[]): any[] {
	const { roundDownReadings, uniqueDateTime } = roundDownReadingsTime(
		readings,
		period.minute
	);

	const avgList = calcAverage(roundDownReadings, uniqueDateTime);

	return avgList;
}

export function calcAverageHour(readings: any[]): any[] {
	const { roundDownReadings, uniqueDateTime } = roundDownReadingsTime(
		readings,
		period.hour
	);

	const avgList = calcAverage(roundDownReadings, uniqueDateTime);
	return avgList;
}

export function calcAverageDay(readings: any[]): any[] {
	const { roundDownReadings, uniqueDateTime } = roundDownReadingsTime(
		readings,
		period.day
	);

	const avgList = calcAverage(roundDownReadings, uniqueDateTime);

	return avgList;
}
