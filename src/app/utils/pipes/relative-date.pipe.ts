import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as calendar from 'dayjs/plugin/calendar';
import * as isToday from 'dayjs/plugin/isToday';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(isToday);

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = dayjs(value);

    if (date.isToday()) {
      return date.format('h:mm A');
    } else return dayjs(value).calendar(null, {
      nextDay: '[Tomorrow]',
      lastDay: `[Yesterday] [at] h:mm A`,
      lastWeek: 'dddd',
      sameElse: 'DD MMM, YYYY'
    });
  }
}