
export function formatDate(date: Date): string {

  let day = date.getDate() + '';
  let month = (date.getMonth() + 1) + '';
  let year = date.getFullYear() + '';
  let hour = date.getHours() + '';
  let minutes = date.getMinutes() + '';
  let seconds = date.getSeconds() + '';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  // YYYY-MM-DD HH:MM:SS
  return (year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds);


  function checkZero(data) {
    if (data.length === 1) {
      data = '0' + data;
    }
    return data;
  }
}
