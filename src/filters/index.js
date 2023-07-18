// 数字千位符
export function toThousands(num) {
  if (isNaN(num)) {
    return num
  }

  const reg = /\B(?=(\d{3})+(?!\d))/g; // 逢3位,
  if (Number.isInteger(num)) {
    return num.toString().replace(reg, ','); // 整数
  } else {
    return num.toFixed(2).replace(reg, ','); // 小数
  }
}