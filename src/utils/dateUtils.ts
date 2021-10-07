import moment from 'moment';

export const datesToDue = (date: string) => {
  const today = moment();

  // momentが解釈できる形に変換
  if (date.match(/\d{4}[\/\.\-]\d+[\/\.\-]\d+/)) {    // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
    date = date.replace(/[\/\.]/g, "-");
  } else if (date.match(/\d+[\/\.\-]\d+/)) {          // mm-dd or mm/dd or mm.dd
    date = today.year() + "-" + date;               // 年を追加
    date = date.replace(/[\/\.]/g, "-");
  } else {
    return null;
  }

  const eventDate = moment(date);
  
  return eventDate.diff(today, 'days');
};
