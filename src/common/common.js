// 全局功能
export default {
  // 中国标准时间转为yyyy-mm-dd格式
  transformDate(dates) {
    let times = [];
    for (let i = 0; i < dates.length; i++) {
      times.push(
        dates[i].getFullYear() +
        "-" +
        (dates[i].getMonth() + 1) +
        "-" +
        dates[i].getDate()
      );
    }
    return times;
  },
  // 调用：let times = transformDate(["2Sun Jul 19 2020 08:00:00 GMT+0800 (中国标准时间)","Mon Jul 20 2020 08:00:00 GMT+0800 (中国标准时间)"]);  
  // 输出：["2020-6-19" "2020-6-20"]


  // 获取指定日期前几/后几天的日期
  getNearDate(timing, number) {
    let time = new Date(timing);
    time.setDate(time.getDate() + number);
    let year = time.getFullYear();
    let month =
      time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    return year + "-" + month + "-" + date;
  },
  // 调用：let times = getNextDate(new Date(), -5);  
  // 输出：前五天


  // 获取指定月前几/后几月
  getNearMonth(timing, number) {
    let time = new Date(timing);
    time.setMonth(time.getMonth() + number);
    let year = time.getFullYear();
    let month =
      time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    return year + "-" + month;
  },
  // 调用：let times = getNextDate(new Date(), -5);  
  // 输出：前五月
}
