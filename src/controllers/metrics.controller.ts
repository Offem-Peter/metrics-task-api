import { Request, Response } from 'express';
import metricsModel from '../models/metrics.model';

export async function createMetrics(req: Request, res: Response) {
  const { name } = req.body;

  const metricExist = await metricsModel.findOne({ name }).lean();

  if (metricExist) return res.status(400).json('Metric name exist');

  await metricsModel.create({ name });
  return res.json({ message: 'Metrics Created' });
}

export async function getMetrics(req: Request, res: Response) {
  const metrics = await metricsModel.find();

  return res.json(metrics);
}
