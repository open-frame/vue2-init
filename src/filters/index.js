// 文本化数据
// https://quanyi.blog.csdn.net/article/details/124142095
export function transfortext(value, dictionaries = [], config = { name: "code_name", value: "code_value" }) {
  // console.log(value, dictionaries, config);
  if (!value) {
    // console.log("没有字典值");
    return value;
  }
  if (dictionaries.length === 0) {
    // console.log("没有字典集");
    return value
  }
  // 字典没有code_name，但取key还是code_name
  if (!Object.hasOwn(dictionaries[0], "code_name") && config.name === "code_name") {
    console.log(value, "没有对应的字典name");
    return value;
  }




  value = value.toString()
  // 如果是,隔开的字符串多值转义
  if (value.includes(",")) {
    let data = [];
    for (let item of value.split(",")) {
      data.push(dictionaries.find(it => {
        return it[config.value] === item
      }));
    }
    return data.map(item => {
      return item[config.name]
    }).join(",")
  } else {
    // 如果是单值转义
    const data = dictionaries.find(item => {
      return item[config.value] === value
    });
    return data ? data[config.name] : value;
  }
}

// 数字千位符
export function toThousands(num) {
  if (isNaN(num)) {
    return num
  }

  num = parseFloat(num);
  num = num.toFixed(2);
  const reg = /\B(?=(\d{3})+(?!\d))/g; // 逢3位,
  return num.replace(reg, ',');
}

