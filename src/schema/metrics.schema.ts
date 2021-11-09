import { object, string } from 'yup';

const createMetricsSchema = () => {
  return object({
    body: object({
      name: string().required(`body 'name' is required`),
    }),
  });
};

export { createMetricsSchema };
