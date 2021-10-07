import moment from 'moment';

export const datesToDue = (date: string) => {
  const eventDate = moment(date);
  const today = moment();
  today.add(9, 'hours');    // JSTに変換
  return eventDate.diff(today, 'days');
};
