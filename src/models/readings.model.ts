import mongoose, { Document } from 'mongoose';

export interface Readings extends Document {
	shortUrl: string;
	originalUrl: string;
	noOfVisit: number;
}

const schema = new mongoose.Schema(
	{
		metricId: {
			type: String,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'timestamp', updatedAt: false } }
);

const readingsModel = mongoose.model<Readings>('readingsModel', schema);

export default readingsModel;
