import moment from 'moment';
var _ = require('lodash');

const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';

export function getAverageReadingsForPeriod(
  readings: any[],
  period: any
): any[] {
  const { roundDownReadingsList, uniqueDateTimeList } = roundDownReadingsTime(
    readings,
    period
  );

  const avgList = calcAverage(roundDownReadingsList, uniqueDateTimeList);

  return avgList;
}

//helper functions
function roundDownReadingsTime(readings: any[], period: any) {
  var uniqueDateTimeList: any = [];
  var roundDownReadingsList: any[] = [];

  //for each reading, get the nearest timestamp in 'period: second,minute,hour,...'
  readings.forEach(({ timestamp, value }) => {
    var timestampMoment = moment(timestamp).utc();
    var roundDown = timestampMoment.startOf(period).format(dateTimeFormat);

    //adds rounded-down timestamp to list, there might be many duplicates of roundedDown timestamps
    uniqueDateTimeList.push(roundDown);

    //might contain multiple keys with the same time-rounded-down
    roundDownReadingsList.push({
      timeRoundedDown: roundDown,
      value,
    });
  });

  //Removes duplicates in dates
  uniqueDateTimeList = uniqueDateTimeList.filter((element: any, index: any) => {
    return uniqueDateTimeList.indexOf(element) === index;
  });

  return {
    roundDownReadingsList,
    uniqueDateTimeList,
  };
}

function calcAverage(roundDownReadingsList: any, uniqueDateTimeList: any) {
  const avgArray: any[] = [];

  uniqueDateTimeList.forEach((datetime: any) => {
    //This sums all the values with the same timestamp
    const sum = _.sumBy(roundDownReadingsList, (o: any) => {
      return o.timeRoundedDown === datetime ? o.value : 0;
    });

    //This counts all the values with the same timestamp
    const count = roundDownReadingsList.reduce(
      (counter: any, { timeRoundedDown }: any) => {
        return timeRoundedDown === datetime ? (counter += 1) : counter;
      },
      0
    );

    const average = +(sum / count).toFixed(2); //average to 2dp

    avgArray.push({
      timestamp: datetime,
      average,
    });
  });

  return avgArray;
}
