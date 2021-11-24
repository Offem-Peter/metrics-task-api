import moment from 'moment';

export function getLastUpdatedAt(readings: any[]): string {
  if (!readings.length) return 'No data to show';

  const currentDateTime = moment().utc();
  const lastTimestampInReadings = readings[readings.length - 1].timestamp;
  const diffInTimestamps = moment(lastTimestampInReadings)
    .utc()
    .from(currentDateTime);

  return diffInTimestamps;
}
