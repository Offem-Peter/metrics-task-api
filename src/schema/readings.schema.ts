import { object, string, number } from 'yup';

const createReadingsSchema = () => {
  return object({
    body: object({
      value: number().required(`body 'value' is required`),
      metricId: string().required(`body 'metricId' is required`),
    }),
  });
};

const getReadingsSchema = () => {
  return object({
    query: object({
      metricId: string().required(`query 'metricId' is required`),
      range: string().required(`query 'range' is required`),
      period: string().required(`query 'period' is required`),
    }),
  });
};

export { createReadingsSchema, getReadingsSchema };
