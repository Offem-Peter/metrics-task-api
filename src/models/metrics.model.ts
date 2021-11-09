import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
});

const metricsModel = mongoose.model<any>('metricsModel', schema);

export default metricsModel;
