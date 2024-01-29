import * as moment from 'moment';
import { TimeInput } from './interface/time.input';

const holidays: { [p: string]: boolean } = [
  '29-06-2023',
  '30-06-2023',
  '28-07-2023',
  '29-07-2023',
  '28-09-2023',
  '29-09-2023',
  '08-10-2023',
].reduce((dict: { [p: string]: boolean }, elem) => {
  dict[elem] = true;
  return dict;
}, {});

export default class Time {
  private readonly now: moment.Moment;
  private readonly shiftStart: moment.Moment;
  private readonly shiftEnd: moment.Moment;

  constructor(data?: TimeInput) {
    const [startH, startM] = data?.shiftStart.split(':').map(Number) ?? [
      10, 30,
    ];
    const [endH, endM] = data?.shiftEnd.split(':').map(Number) ?? [21, 30];
    this.now = moment().add(5, 'h');
    this.shiftStart = moment().hour(startH).minute(startM).second(0);
    this.shiftEnd = moment().hour(endH).minute(endM).second(0);
  }

  get isWorkingHour() {
    return this.now.isBetween(this.shiftStart, this.shiftEnd);
  }

  get nextShiftStart() {
    return moment()
      .add(
        14 -
          this.now.hour() +
          Math.pow(25, Number(this.now.hour() > this.shiftStart.hour())),
        'h',
      )
      .minute(this.shiftStart.minute())
      .second(0)
      .unix();
  }

  get nextDay() {
    return moment(this.now).add(1, 'd').unix();
  }

  get isHoliday() {
    return holidays[this.now.format('DD-MM-YYYY')];
  }

  private get unix() {
    return this.now.unix();
  }

  isBefore(unix: number) {
    return unix > this.unix;
  }

  isAfter(unix: number) {
    return this.unix > unix;
  }
}
