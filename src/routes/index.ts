import { Express, Request, Response } from 'express';

import { createMetrics, getMetrics } from '../controllers/metrics.controller';
import { createMetricsSchema } from '../schema/metrics.schema';

import {
  createReadings,
  getReadings,
} from '../controllers/readings.controller';
import {
  createReadingsSchema,
  getReadingsSchema,
} from '../schema/readings.schema';

import validateResource from '../middleware/validation';

const routes = (app: Express) => {
  app.post(
    '/api/v1/metrics',
    validateResource(createMetricsSchema()),
    createMetrics
  );
  app.get('/api/v1/metrics', getMetrics);
  app.post(
    '/api/v1/readings',
    validateResource(createReadingsSchema()),
    createReadings
  );
  app.get(
    '/api/v1/readings',
    validateResource(getReadingsSchema()),
    getReadings
  );
};

export default routes;
