import { DateTime } from 'luxon';

type DateFormatOptions = {
  localeMatcher?: 'lookup' | 'best fit';
  timeZoneName?: 'long' | 'short';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
};

export const formatDate = (date: string, options: DateFormatOptions) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  DateTime.fromISO(date)
    // Use the setZone method to set the time zone to UTC
    .setZone('UTC')
    // Use the toLocaleString method to format the date
    .toLocaleString(options);

// export const formatDate = (date: string) =>
//   utc(date).toDate().toLocaleString('en-US', {
//     localeMatcher: 'lookup',
//     timeZoneName: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   }) as string;

// export const formatDateAlert = (date: number) =>
//   utc(date).toDate().toLocaleString('en-US', {
//     localeMatcher: 'lookup',
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   });
