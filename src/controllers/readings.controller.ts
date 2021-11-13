import { Request, Response } from 'express';
import readingsModel from '../models/readings.model';
import {
  getLastUpdatedAt,
  getReadingsWithinRange,
} from '../utils/readings.utils';

import { getAverageReadingsForPeriod } from '../utils/readings.average';

export async function createReadings(req: Request, res: Response) {
  const { value, metricId } = req.body;

  await readingsModel.create({ value, metricId });
  return res.json({ message: 'Readings Created' });
}

export async function getReadings(req: Request, res: Response) {
  const { metricId, range, period } = req.query;

  const readings = await readingsModel.find({ metricId });

  const lastUpdatedAt = getLastUpdatedAt(readings);
  const filteredReadings = getReadingsWithinRange(readings, range);

  var response: any = { lastUpdatedAt, data: [] };

  if (!filteredReadings.length) return res.json(response);

  const averageReaadingsInPeriod = getAverageReadingsForPeriod(
    filteredReadings,
    period
  );

  response = { ...response, data: averageReaadingsInPeriod };

  return res.json(response);
}
