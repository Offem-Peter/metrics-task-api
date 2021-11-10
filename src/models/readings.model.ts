import mongoose from 'mongoose';

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

const readingsModel = mongoose.model<any>('readingsModel', schema);

export default readingsModel;
