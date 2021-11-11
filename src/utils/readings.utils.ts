import moment from 'moment';

export function getLastUpdatedAt(readings: any[]): string {
  if (!readings.length) {
    return 'No data to show';
  }

  const currentDateTime = moment().utc();
  const lastTimestampInReadings = readings[readings.length - 1].timestamp;
  const diffInTimestamps = moment(lastTimestampInReadings)
    .utc()
    .from(currentDateTime);

  return diffInTimestamps;
}

export function getReadingsWithinRange(readings: any[], range: any): any[] {
  const timeRange = moment().utc().subtract(1, range);
  var newReadings: any[] = [];

  newReadings = readings.filter((reading) => {
    //get timestamp in moment for each reading
    const timestamp = moment(reading.timestamp).utc();

    //checks if timestamp is not outside time range
    return timeRange.isBefore(timestamp);
  });

  return newReadings;
}
