import moment from 'moment';

/**
 * Calculate Elapsed Time
 *
 * @param date
 * @returns
 */
export const calcTimeElapsed = (date: Date | string | number): string => {
  if (date instanceof Date) {
    return moment(date).fromNow();
  } else {
    return moment(new Date(date)).fromNow();
  }
};
