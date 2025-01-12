import { DateTime } from 'luxon';

export class DateService {
  fromISOToDateTimeText(value: string) {
    const datetime = DateTime.fromISO(value);

    if (!datetime.isValid) {
      return '';
    }

    return datetime.toFormat('yyyy-MM-dd HH:mm:ss');
  }
}

export const dateService = new DateService();
