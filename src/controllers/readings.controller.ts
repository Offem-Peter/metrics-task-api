import { Request, Response } from 'express';
import moment from 'moment';

import readingsModel from '../models/readings.model';
import { getLastUpdatedAt } from '../utils/readings.utils';
import { getAverageReadingsForPeriod } from '../utils/readings.average';

export async function createReadings(req: Request, res: Response) {
  const { value, metricId } = req.body;

  await readingsModel.create({ value, metricId });
  return res.json({ message: 'Readings Created' });
}

export async function getReadings(req: Request, res: Response) {
  const { metricId, period } = req.query;
  const range: any = req.query.range;

  const dateTimeRange = moment().utc().subtract(1, range);

  const readings = await readingsModel.find({
    metricId,
    timestamp: {
      $gte: dateTimeRange,
    },
  });

  const lastUpdatedAt = getLastUpdatedAt(readings);

  var response: any = { lastUpdatedAt, data: [] };

  if (!readings.length) return res.json(response);

  const averageReadingsInPeriod = getAverageReadingsForPeriod(readings, period);

  response = { ...response, data: averageReadingsInPeriod };

  return res.json(response);
}
