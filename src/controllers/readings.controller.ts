import { Request, Response } from 'express';
import readingsModel from '../models/readings.model';
import {
	getLastUpdated,
	filterReadings,
	calcAverageDay,
	calcAverageHour,
	calcAverageMinute,
} from '../utils/readings.utils';

export async function createReadings(req: Request, res: Response) {
	const { value, metricId } = req.body;

	await readingsModel.create({ value, metricId });
	return res.json({ message: 'Readings Created' });
}

export async function getReadings(req: Request, res: Response) {
	const { metricId, range, period } = req.query;

	const readings = await readingsModel.find({ metricId });

	const lastUpdated = getLastUpdated(readings);

	const filteredReadings = filterReadings(readings, range);

	var resData: any;

	if (!filteredReadings.length) {
		resData = { lastUpdated, data: [] };

		return res.json(resData);
	}

	const averageMinuteReadings = calcAverageMinute(filteredReadings);
	const averageHourReadings = calcAverageHour(filteredReadings);
	const averageDayReadings = calcAverageDay(filteredReadings);

	const allAverage: any = {
		minute: averageMinuteReadings,
		hour: averageHourReadings,
		day: averageDayReadings,
	};

	const getAverage = allAverage[`${period}`];

	resData = { lastUpdated, data: getAverage };

	return res.json(resData);
}
