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
  // 调用：let times = getNearDate(new Date(), -5);
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
  // 调用：let times = getNearMonth(new Date(), -5);
  // 输出：前五月


  // 创建唯一标识
  createID() {
    // console.log(this.transformDate([new Date]));
    const timestamp = Date.now() + "";
    const time = new Date();
    const year = time.getFullYear();
    let mounth = time.getMonth();
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    const msecond = time.getMilliseconds() + "";

    if (mounth < 10) {
      mounth++;
      mounth = "0" + mounth;
    } else {
      mounth + ""
    }
    if (date < 10) {
      // date++;
      date = "0" + date;
    } else {
      date + ""
    }
    if (hour < 10) {
      hour + ""
      hour = "0" + hour;
    } else {
      hour + ""
    }
    if (minute < 10) {
      minute++
      minute = "0" + minute;
    } else {
      minute + ""
    }
    if (second < 10) {
      second + ""
      second = "0" + second;
    } else {
      second + ""
    }

    return year + mounth + date + hour + minute + second + msecond + timestamp;
  }


  
}
