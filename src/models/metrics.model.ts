import mongoose, { Document } from 'mongoose';

export interface Metrics extends Document {
	shortUrl: string;
	originalUrl: string;
	noOfVisit: number;
}

const schema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
});

const metricsModel = mongoose.model<Metrics>('metricsModel', schema);

export default metricsModel;
