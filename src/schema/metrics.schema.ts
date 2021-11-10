import { object, string } from 'yup';

const createMetricsSchema = () => {
	return object({
		body: object({
			name: string().required(`property 'name' is required`),
		}),
	});
};

export { createMetricsSchema };
