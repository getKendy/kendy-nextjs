import { utc } from 'moment/moment';

export const formatDate = (date) => utc(date).toDate().toLocaleString('en-US', {
  localeMatcher: 'lookup',
  timeZoneName: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export const formatDateAlert = (date) => utc(date).toDate().toLocaleString('en-US', {
  localeMatcher: 'lookup',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});
