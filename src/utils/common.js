// 中国标准时间转为yyyy-mm-dd格式
export function transformDate(dates) {
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
}
// 调用：let times = transformDate(["2Sun Jul 19 2023 08:00:00 GMT+0800 (中国标准时间)","Mon Jul 20 2023 08:00:00 GMT+0800 (中国标准时间)"]);  
// 输出：["2023-6-19" "2023-6-20"]








// 获取指定日期前几/后几天的日期
export function getNearDate(timing, number) {
  let time = new Date(timing);
  time.setDate(time.getDate() + number);
  let year = time.getFullYear();
  let month =
    time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  return year + "-" + month + "-" + date;
}
// 调用：let times = getNearDate(new Date(), -5);
// 输出：前五天








// 获取指定月前几/后几月
export function getNearMonth(timing, number) {
  let time = new Date(timing);
  time.setMonth(time.getMonth() + number);
  let year = time.getFullYear();
  let month =
    time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  return year + "-" + month;
}
// 调用：let times = getNearMonth(new Date(), -5);
// 输出：前五月



// 计算时间差
export function differTime(startTime, endTime) {
  // const startTime = '2015-05-01 00:00:00'; //开始时间
  // const endTime = '2015-08-01 00:00:00'; //结束时间
  const date3 = new Date(endTime).getTime() - new Date(startTime).getTime(); //时间差的毫秒数      

  //计算出相差天数
  const days = Math.floor(date3 / (24 * 3600 * 1000))
  //计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  const leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数	
  const seconds = Math.round(leave3 / 1000)

  // console.log("时间差：", days, hours, minutes, seconds);
  let text = days > 0 ? days + "天 " : "";
  text += hours > 0 ? hours + "小时" : "";
  text += minutes > 0 ? minutes + "分钟" : "";
  text += seconds > 0 ? seconds + "秒" : "";
  return text;
}



// 创建唯一标识
export function createID() {
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
